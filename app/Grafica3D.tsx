'use client'

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'

function BarraDeDato(props: any) {
    const meshRef = useRef<any>()
    const [hovered, setHover] = useState(false)

    useFrame((state, delta) => (meshRef.current.rotation.y += delta))

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={hovered ? 1.1 : 1}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}>
            <boxGeometry args={[1, props.valor, 1]} />
            <meshStandardMaterial
                color={hovered ? '#ff0055' : '#ff9966'}
                emissive={hovered ? '#ff0055' : '#ff4400'}
                emissiveIntensity={0.5}
                roughness={0.2}
                metalness={0.8}
            />
        </mesh>
    )
}

export default function Grafica3D() {
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <Canvas camera={{ position: [0, 1, 12], fov: 50 }}>
                <ambientLight intensity={0.8} />
                <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                {/* Textos */}
                <Text
                    position={[0, 4, 0]}
                    fontSize={1}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    JÓVENES 2025
                </Text>

                <Text
                    position={[0, 5, 0]}
                    fontSize={0.4}
                    color="#ffeebb"
                >
                    Perspectiva Eterna
                </Text>

                {/* Barras */}
                <BarraDeDato position={[-2.5, 0, 0]} valor={3} />
                <BarraDeDato position={[0, 0, 0]} valor={6} />
                <BarraDeDato position={[2.5, 0, 0]} valor={3} />

                <OrbitControls autoRotate={true} autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    )
}