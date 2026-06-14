import { useClock } from '../hooks/useClock.js'
import { formatTime } from '../utils/helpers.js'

export default function TimeWidget() {
  const now = useClock()

  return (
    <div className="text-center">
      <p className="font-display text-3xl md:text-4xl font-bold text-gradient tracking-widest">
        {formatTime(now)}
      </p>
      <p className="text-[10px] md:text-xs text-white/40 tracking-[0.3em] uppercase mt-1">
        Ship Time
      </p>
    </div>
  )
}
