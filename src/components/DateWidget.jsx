import { useClock } from '../hooks/useClock.js'
import { formatDate } from '../utils/helpers.js'

export default function DateWidget() {
  const now = useClock()

  return (
    <div className="text-center mt-3 pt-3 border-t border-white/5">
      <p className="font-display text-sm md:text-base text-white/80 tracking-wide">
        {formatDate(now)}
      </p>
      <p className="text-[10px] md:text-xs text-white/40 tracking-[0.3em] uppercase mt-1">
        Stardate Log
      </p>
    </div>
  )
}
