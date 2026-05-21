// @ts-nocheck

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'

function CharacterModel() {
  const { scene } = useGLTF('./models/black_solider_3.glb')

  return (
    <primitive
      object={scene}
      scale={2.2}
      position={[0, -2.2, 0]}
    />
  )
}

// optional preload (improves load stability)
useGLTF.preload('/models/character.glb')

const BoostAccountPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6 overflow-hidden">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE */}
        <div className="bg-zinc-900 rounded-[32px] border border-zinc-800 shadow-2xl overflow-hidden relative min-h-[750px]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center h-full p-8">
            <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent text-center">
              ПРОКАЧКА АККАУНТА
            </h1>

            <div className="w-full h-[620px] rounded-[28px] overflow-hidden border border-zinc-700 bg-gradient-to-b from-zinc-800 to-black relative shadow-inner">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                onCreated={({ gl }) => {
                  gl.setClearColor('#0a0a0a')
                }}
              >
                <ambientLight intensity={1.2} />
                <directionalLight position={[3, 2, 1]} intensity={1.5} />
                <spotLight position={[0, 5, 5]} intensity={1.5} angle={0.3} penumbra={1} />

                <Suspense fallback={null}>
                  <CharacterModel />
                  <Environment preset="city" />
                </Suspense>

                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={2}
                />
              </Canvas>

              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-xl px-5 py-3 rounded-full border border-zinc-700 text-zinc-300 text-sm">
                Крути персонажа мышкой
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-zinc-900 rounded-[32px] border border-zinc-800 shadow-2xl p-8 lg:p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-black">ОФОРМЛЕНИЕ</h2>
              <p className="text-zinc-400 mt-2">
                Заполните данные для начала прокачки
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-cyan-500 px-5 py-3 rounded-2xl shadow-lg">
              <span className="text-2xl font-black">$49</span>
            </div>
          </div>

          <div className="space-y-6">
            <input className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4" placeholder="Имя" />
            <input className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4" placeholder="ID аккаунта" />
            <input className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4" placeholder="Email" />
            <input className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4" placeholder="Пароль" type="password" />

            <label className="border-2 border-dashed border-zinc-700 rounded-3xl h-[180px] flex items-center justify-center cursor-pointer bg-zinc-800/40">
              Загрузить чек
              <input type="file" className="hidden" />
            </label>

            <button className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500 py-5 rounded-3xl text-xl font-black">
              ОПЛАТИТЬ
            </button>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-3xl p-6">
              <div className="flex justify-between mb-3">
                <span>Статус</span>
                <span className="text-yellow-400">Ожидание</span>
              </div>
              <div className="h-3 bg-zinc-700 rounded-full">
                <div className="h-full w-[45%] bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoostAccountPage