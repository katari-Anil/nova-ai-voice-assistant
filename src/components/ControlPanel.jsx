import { motion } from 'framer-motion'
import { Mic, MicOff, Volume2, VolumeX, Trash2, Repeat, Settings } from 'lucide-react'

const ACTIVE_STYLES = {
  'neon-cyan': 'border-neon-cyan/60 bg-neon-cyan/10 text-neon-cyan',
  electric: 'border-electric/60 bg-electric/10 text-electric-light',
  'neon-purple': 'border-neon-purple/60 bg-neon-purple/10 text-neon-purple',
}

function ControlButton({ icon, label, active, onClick, activeColor = 'neon-cyan' }) {
  return (
    <motion.button
      whileHover={{ scale: 1.06, boxShadow: `0 0 20px rgba(34,211,238,0.5)` }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-2.5 md:px-4 md:py-3 border transition-all flex-1 min-w-[72px] ${
        active
          ? ACTIVE_STYLES[activeColor] || ACTIVE_STYLES['neon-cyan']
          : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30'
      }`}
    >
      {icon}
      <span className="text-[10px] md:text-xs font-display tracking-wider uppercase">{label}</span>
    </motion.button>
  )
}

export default function ControlPanel({
  isListening,
  onToggleListening,
  voiceEnabled,
  onToggleVoice,
  continuousMode,
  onToggleContinuous,
  onClearChat,
  onOpenSettings,
  voiceSupported,
}) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      <ControlButton
        icon={isListening ? <Mic size={20} /> : <MicOff size={20} />}
        label={isListening ? 'Listening' : 'Mic Off'}
        active={isListening}
        onClick={onToggleListening}
        activeColor="neon-cyan"
      />
      <ControlButton
        icon={voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        label={voiceEnabled ? 'Voice On' : 'Muted'}
        active={voiceEnabled}
        onClick={onToggleVoice}
        activeColor="electric"
      />
      <ControlButton
        icon={<Repeat size={20} />}
        label={continuousMode ? 'Continuous' : 'Push-to-Talk'}
        active={continuousMode}
        onClick={onToggleContinuous}
        activeColor="neon-purple"
      />
      <ControlButton
        icon={<Trash2 size={20} />}
        label="Clear Chat"
        active={false}
        onClick={onClearChat}
      />
      <ControlButton
        icon={<Settings size={20} />}
        label="Settings"
        active={false}
        onClick={onOpenSettings}
      />
      {!voiceSupported && (
        <p className="text-[10px] text-neon-pink/70 w-full text-center mt-1">
          Voice recognition isn't supported in this browser.
        </p>
      )}
    </div>
  )
}
