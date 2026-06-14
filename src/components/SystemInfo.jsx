import { Cpu, Wifi, Database, Mic } from 'lucide-react'
import StatusCard from './StatusCard.jsx'
import { getActiveProvider } from '../services/aiService.js'

export default function SystemInfo({ voiceSupported, synthSupported }) {
  const provider = getActiveProvider()

  return (
    <div>
      <StatusCard
        label="AI Core"
        value={provider === 'local' ? 'LOCAL' : provider.toUpperCase()}
        active
        icon={<Cpu size={14} className="text-electric-light" />}
      />
      <StatusCard
        label="Voice Input"
        value={voiceSupported ? 'READY' : 'N/A'}
        active={voiceSupported}
        icon={<Mic size={14} className="text-neon-cyan" />}
      />
      <StatusCard
        label="Voice Output"
        value={synthSupported ? 'READY' : 'N/A'}
        active={synthSupported}
        icon={<Wifi size={14} className="text-neon-purple" />}
      />
      <StatusCard
        label="Local Storage"
        value="ACTIVE"
        active
        icon={<Database size={14} className="text-neon-pink" />}
      />
    </div>
  )
}
