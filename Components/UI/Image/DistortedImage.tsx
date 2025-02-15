"use client";
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useTheme } from 'next-themes';

interface DistortedImageProps {
  src: string;
}

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;

  void main() {
    vUv = uv;
    
    vec3 pos = position;
    
    // Add time-based deformation
    pos.x += sin(pos.y * 10.0 + uTime * 2.0) * 0.02 * uProgress;
    pos.y += cos(pos.x * 8.0 + uTime * 1.5) * 0.02 * uProgress;
    
    // Mouse influence
    vec2 mouseDelta = uMouse - vec2(0.5);
    pos.xy += mouseDelta * 0.1 * uProgress;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uProgress;
  uniform float uBorderRadius;

  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    
    // Grain effect (corrected)
    float grain = fract(sin(dot(vUv, vec2(12.9898, 78.233)) * 43758.5453));
    grain = (grain - 0.5) * 0.1 * uProgress;
    
    // Distortion
    vec2 distortedUv = vUv + vec2(
      sin(vUv.y * 30.0 + uTime * 3.0) * 0.02 * uProgress,
      cos(vUv.x * 25.0 + uTime * 2.0) * 0.02 * uProgress
    );
    
    vec4 finalColor = texture2D(uTexture, distortedUv);
    finalColor.rgb += grain;
    
    // Border radius
    vec2 uv = vUv - 0.5;
    float radius = length(uv) * 2.0;
    float smoothness = 0.01;
    float alpha = smoothstep(uBorderRadius + smoothness, uBorderRadius - smoothness, radius);
    
    gl_FragColor = finalColor * alpha;
  }
`;

export default function DistortedImage({ src }: DistortedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const progress = useRef(0);
  const [textureLoaded, setTextureLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    // Texture loader
    const loader = new THREE.TextureLoader();
    const texture = loader.load(src, () => {
      setTextureLoaded(true);
      gsap.to(progress, {
        current: 1,
        duration: 1.5,
        ease: 'power3.out'
      });
    });

    // Geometry and material
    const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uBorderRadius: { value: theme === 'light' ? 0.8 : 0.5 }
      },
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.z = 1;

    // Handle resize
    const updateSize = () => {
      const parent = canvasRef.current?.parentElement;
      if (!parent) return;

      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      mousePos.current.x = (e.clientX - rect.left) / rect.width;
      mousePos.current.y = (e.clientY - rect.top) / rect.height;
    };

    canvasRef.current.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      material.uniforms.uTime.value = performance.now() / 1000;
      material.uniforms.uProgress.value = progress.current;
      material.uniforms.uMouse.value.set(
        THREE.MathUtils.lerp(material.uniforms.uMouse.value.x, mousePos.current.x, 0.1),
        THREE.MathUtils.lerp(material.uniforms.uMouse.value.y, mousePos.current.y, 0.1)
      );
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      canvasRef.current?.removeEventListener('mousemove', handleMouseMove);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [src, theme]);

  return (
    <div className="relative h-64 w-full rounded-lg overflow-hidden bg-gray-100/20">
      {!textureLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
    </div>
  );
}