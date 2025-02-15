"use client";

import React, { Suspense, memo } from "react";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

/**
 * Component to load and display a GLB model.
 */
const Model = memo(({ modelPath }) =>
{
    const { scene } = useGLTF(modelPath);

    return <primitive object={scene} dispose={null} />;
});

Model.propTypes = {
    modelPath: PropTypes.string.isRequired,
};

/**
 * Props interface for the ModelViewer component.
 */
const ModelViewer = ({ modelPath, height = "300px", width = "100%", position = [0, 0, 5], fov = 60 }) =>
{
    return (
        <ErrorBoundary fallback={<div>Error loading model</div>}>
            <Canvas
                style={{ height, width }}
                camera={{ position, fov }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Suspense fallback={<span>Loading...</span>}>
                    <Model modelPath={modelPath} />
                </Suspense>
                <OrbitControls enableZoom={false} enableRotate />
            </Canvas>
        </ErrorBoundary>
    );
};

ModelViewer.propTypes = {
    modelPath: PropTypes.string.isRequired,
    height: PropTypes.string,
    width: PropTypes.string,
    position: PropTypes.arrayOf(PropTypes.number),
    fov: PropTypes.number,
};

export default memo(ModelViewer);
