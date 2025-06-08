import React from 'react';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { easing } from 'maath';

import state from '../store';

const Shirt = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/shirt_baked.glb');

    const logoTexture = useTexture(snap.logoDecal || '/default-logo.png');
    const fullTexture = useTexture(snap.fullDecal || '/default-full.png');

    // Smooth color animation
    useFrame((_, delta) => {
        easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    });

    // Key ensures re-render when state changes
    const stateString = JSON.stringify(snap);

    return (
        <group key={stateString}>
            <mesh
                castShadow
                geometry={nodes.T_Shirt_male.geometry}
                material={materials.lambert1}
                dispose={null}
            >
                {/* Full texture decal */}
                {snap.isFullTexture && fullTexture && (
                    <Decal
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={1}
                        map={fullTexture}
                    />
                )}

                {/* Logo decal */}
                {snap.isLogoTexture && logoTexture && (
                    <Decal
                        position={[0, 0.04, 0.15]}
                        rotation={[0, 0, 0]}
                        scale={0.15}
                        map={logoTexture}
                        anisotropy={16}
                        depthTest={false}
                        depthWrite={true}
                    />
                )}
            </mesh>
        </group>
    );
};

export default Shirt;
