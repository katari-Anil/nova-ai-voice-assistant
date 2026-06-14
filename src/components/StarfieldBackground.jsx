import { useMemo } from 'react'
import { motion } from 'framer-motion'

function generateStars(count, layerSeed) {
  const stars = []
  for (let i = 0; i < count; i++) {
    stars.push({
      id: `${layerSeed}-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    })
  }
  return stars
}

export default function StarfieldBackground() {
  const layer1 = useMemo(() => generateStars(120, 'l1'), [])
  const layer2 = useMemo(() => generateStars(80, 'l2'), [])
  const layer3 = useMemo(() => generateStars(50, 'l3'), [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-space-black">
      {/* Nebula gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-space-midnight via-space-black to-[#1a0b33] opacity-90" />
      <motion.div
        className="absolute -top-1/3 -left-1/4 w-[80vw] h-[80vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(168,85,247,0.12) 45%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[70vw] h-[70vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(34,211,238,0.18) 0%, rgba(59,130,246,0.08) 45%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Star layers */}
      {[layer1, layer2, layer3].map((layer, layerIdx) => (
        <div key={layerIdx} className="absolute inset-0">
          {layer.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                boxShadow: '0 0 6px rgba(255,255,255,0.6)',
              }}
              animate={{ opacity: [0.15, 1, 0.15] }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      ))}

      {/* Data stream lines */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-1/3 bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent"
            style={{ top: `${10 + i * 15}%`, left: '-30%' }}
            animate={{ x: ['0vw', '160vw'] }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1.2,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-space-black/60" />
    </div>
  )
}
