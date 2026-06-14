import { motion } from 'framer-motion'
import { Activity as ActivityIcon, Settings as SettingsIcon, Mic, Wifi, HeartPulse, X } from 'lucide-react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import AICoreOrb from './AICoreOrb.jsx'
import VoiceVisualizer from './VoiceVisualizer.jsx'
import GlassPanel from './GlassPanel.jsx'
import StatusCard from './StatusCard.jsx'
import TimeWidget from './TimeWidget.jsx'
import DateWidget from './DateWidget.jsx'
import SystemInfo from './SystemInfo.jsx'
import ActivityFeed from './ActivityFeed.jsx'
import ChatPanel from './ChatPanel.jsx'
import ControlPanel from './ControlPanel.jsx'
import { AI_STATES, QUICK_COMMANDS } from '../utils/constants.js'

export default function CommandCenter({
  aiState,
  messages,
  inputValue,
  onInputChange,
  onSend,
  onClear,
  activities,
  controls,
  settings,
  showSettings,
  onCloseSettings,
  onUpdateSettings,
  voiceSupported,
  synthSupported,
  liveTranscript,
}) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col p-3 md:p-5 max-w-7xl mx-auto w-full">
      <Header />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-4">
        {/* Left Sidebar */}
        <div className="order-2 lg:order-1 space-y-4">
          <GlassPanel title="AI Status" icon={<HeartPulse size={14} className="text-neon-cyan" />} delay={0.1}>
            <StatusCard label="Core State" value={aiState.toUpperCase()} active />
            <StatusCard label="Personality" value="NOVA-1" active />
          </GlassPanel>

          <GlassPanel title="Voice Status" icon={<Mic size={14} className="text-neon-cyan" />} delay={0.15}>
            <StatusCard
              label="Microphone"
              value={controls.isListening ? 'ACTIVE' : 'STANDBY'}
              active={controls.isListening}
            />
            <StatusCard
              label="Synthesis"
              value={settings.voiceEnabled ? 'ENABLED' : 'MUTED'}
              active={settings.voiceEnabled}
            />
            {liveTranscript && (
              <p className="mt-2 text-xs text-neon-cyan/80 italic break-words">"{liveTranscript}"</p>
            )}
          </GlassPanel>

          <GlassPanel title="Connection" icon={<Wifi size={14} className="text-neon-cyan" />} delay={0.2}>
            <StatusCard label="Network Link" value="STABLE" active />
            <StatusCard label="Latency" value="12ms" active />
          </GlassPanel>

          <GlassPanel title="System Health" icon={<ActivityIcon size={14} className="text-neon-cyan" />} delay={0.25}>
            <SystemInfo voiceSupported={voiceSupported} synthSupported={synthSupported} />
          </GlassPanel>
        </div>

        {/* Center */}
        <div className="order-1 lg:order-2 flex flex-col items-center justify-center gap-6 py-6 lg:py-0">
          <AICoreOrb state={aiState} size={260} />
          <div className="w-full max-w-md">
            <VoiceVisualizer state={aiState} />
          </div>

          <div className="w-full max-w-2xl">
            <ControlPanel
              isListening={controls.isListening}
              onToggleListening={controls.onToggleListening}
              voiceEnabled={settings.voiceEnabled}
              onToggleVoice={controls.onToggleVoice}
              continuousMode={settings.continuousListening}
              onToggleContinuous={controls.onToggleContinuous}
              onClearChat={onClear}
              onOpenSettings={controls.onOpenSettings}
              voiceSupported={voiceSupported}
            />
          </div>

          <div className="w-full max-w-2xl flex flex-wrap gap-2 justify-center">
            {QUICK_COMMANDS.map((cmd) => (
              <motion.button
                key={cmd}
                whileHover={{ scale: 1.05, borderColor: 'rgba(34,211,238,0.6)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSend(cmd)}
                className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-neon-cyan transition-colors"
              >
                {cmd}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="order-3 space-y-4 flex flex-col">
          <GlassPanel delay={0.1}>
            <TimeWidget />
            <DateWidget />
          </GlassPanel>

          <GlassPanel title="Activity Feed" icon={<ActivityIcon size={14} className="text-neon-cyan" />} delay={0.2} className="flex-1 flex flex-col">
            <ActivityFeed activities={activities} />
          </GlassPanel>
        </div>
      </main>

      {/* Chat */}
      <div className="mt-4 h-[55vh] md:h-[40vh]">
        <ChatPanel
          messages={messages}
          onSend={onSend}
          onClear={onClear}
          aiState={aiState}
          inputValue={inputValue}
          onInputChange={onInputChange}
        />
      </div>

      <Footer />

      {/* Settings Modal */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center p-4"
          onClick={onCloseSettings}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-sm tracking-widest uppercase text-neon-cyan flex items-center gap-2">
                <SettingsIcon size={16} /> Settings
              </h2>
              <button onClick={onCloseSettings} aria-label="Close settings">
                <X size={18} className="text-white/50 hover:text-white" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-white/60 mb-1">Voice Rate: {settings.rate.toFixed(1)}</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.rate}
                  onChange={(e) => onUpdateSettings({ rate: parseFloat(e.target.value) })}
                  className="w-full accent-neon-cyan"
                />
              </div>
              <div>
                <label className="block text-white/60 mb-1">Voice Pitch: {settings.pitch.toFixed(1)}</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={settings.pitch}
                  onChange={(e) => onUpdateSettings({ pitch: parseFloat(e.target.value) })}
                  className="w-full accent-neon-purple"
                />
              </div>
              <div>
                <label className="block text-white/60 mb-1">Voice Volume: {settings.volume.toFixed(1)}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.volume}
                  onChange={(e) => onUpdateSettings({ volume: parseFloat(e.target.value) })}
                  className="w-full accent-electric"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
