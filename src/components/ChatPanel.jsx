import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Trash2, MessageSquare } from 'lucide-react'
import MessageBubble from './MessageBubble.jsx'
import TypingIndicator from './TypingIndicator.jsx'
import { AI_STATES } from '../utils/constants.js'

export default function ChatPanel({ messages, onSend, onClear, aiState, inputValue, onInputChange }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, aiState])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    onSend(inputValue.trim())
  }

  return (
    <div className="glass-panel flex flex-col h-full p-3 md:p-4">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-electric/20">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-neon-cyan" />
          <h3 className="font-display text-xs tracking-widest uppercase text-neon-cyan/80">
            Communications
          </h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={onClear}
          aria-label="Clear chat"
          className="flex items-center gap-1 text-xs text-white/50 hover:text-neon-pink transition-colors px-2 py-1 rounded-md hover:bg-white/5"
        >
          <Trash2 size={14} />
          <span className="hidden md:inline">Clear</span>
        </motion.button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-thin space-y-3 pr-1 min-h-[140px] max-h-[40vh] md:max-h-none"
      >
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-center text-white/30 text-sm px-6">
            No transmissions yet. Say "hello" or type a message to begin.
          </div>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {aiState === AI_STATES.THINKING && (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-neon-cyan to-electric flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-space-black" />
            </div>
            <div className="glass-panel border-neon-cyan/20 rounded-2xl rounded-bl-sm">
              <TypingIndicator />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Transmit a message to NOVA..."
          aria-label="Message input"
          className="flex-1 bg-space-panel/70 border border-electric/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/60 transition-all"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(34,211,238,0.6)' }}
          whileTap={{ scale: 0.92 }}
          aria-label="Send message"
          className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-neon-cyan flex items-center justify-center text-space-black shadow-glow-blue"
        >
          <Send size={16} />
        </motion.button>
      </form>
    </div>
  )
}
