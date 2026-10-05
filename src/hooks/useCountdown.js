import { useEffect, useState } from 'react'
const calc = (t) => {
  const d = Math.max(0, new Date(t) - Date.now())
  return { Days: Math.floor(d / 864e5), Hours: Math.floor(d / 36e5) % 24, Minutes: Math.floor(d / 6e4) % 60, Seconds: Math.floor(d / 1e3) % 60 }
}
export default function useCountdown(target) {
  const [v, setV] = useState(() => calc(target))
  useEffect(() => { const i = setInterval(() => setV(calc(target)), 1000); return () => clearInterval(i) }, [target])
  return v
}
