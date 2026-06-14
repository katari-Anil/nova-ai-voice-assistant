import { motion } from 'framer-motion'
import { Bot, User } from 'lucide-react'

export default function MessageBubble({ message }) {
  const isUser = message.sender === 'user'
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.35 }}
      className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-neon-cyan to-electric flex items-center justify-center shadow-glow">
          <Bot size={14} className="text-space-black" />
        </div>
      )}
      <div
        className={`max-w-[78%] md:max-w-[65%] rounded-2xl px-4 py-2.5 text-sm md:text-base leading-snug ${
          isUser
            ? 'bg-gradient-to-br from-electric/30 to-neon-purple/20 border border-electric/40 rounded-br-sm'
            : 'glass-panel border-neon-cyan/20 rounded-bl-sm'
        }`}
      >
        <p className="text-white/90 whitespace-pre-wrap break-words">{message.text}</p>
        <span className="block mt-1 text-[10px] text-white/40 font-display tracking-wider">
          {time}
        </span>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-electric to-neon-purple flex items-center justify-center">
          <User size={14} className="text-white" />
        </div>
      )}
    </motion.div>
  )
}
