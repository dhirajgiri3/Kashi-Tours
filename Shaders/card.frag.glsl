precision highp float;
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uRadius;
uniform float uStrength;

varying vec2 vUv;

void main() {
  vec2 toCenter = vUv - uMouse;
  float dist = length(toCenter);
  float power = uStrength * smoothstep(uRadius, 0.0, dist);
  
  vec2 distortedUV = vUv + toCenter * power;
  vec4 color = texture2D(uTexture, distortedUV);
  
  gl_FragColor = color;
}