// app/utils/isTouch.ts

export function isTouch() {
    if ('standalone' in navigator) {
      return true // iOS devices
    }
    const hasCoarse = window.matchMedia('(pointer: coarse)').matches
    if (hasCoarse) {
      return true
    }
    const hasPointer = window.matchMedia('(pointer: fine)').matches
    if (hasPointer) {
      return false
    }
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }