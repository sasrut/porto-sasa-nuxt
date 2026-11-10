export function useImmersiveMode() {
  return useState('immersive-mode', () => null)
}

export function cycleImmersiveMode() {
  const mode = useImmersiveMode()
  if (mode.value) {
    mode.value = null
    return
  }
  const lastEffect = useState('immersive-last-effect', () => 'find')
  lastEffect.value = lastEffect.value === 'amaze' ? 'find' : 'amaze'
  mode.value = lastEffect.value
}
