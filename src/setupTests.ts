import '@testing-library/jest-dom'

// jsdom does not implement PointerEvent (https://github.com/jsdom/jsdom/issues/2527).
// base-ui's Switch dispatches a real PointerEvent on click, so without this polyfill
// any test that clicks a Switch throws "PointerEvent is not a constructor".
if (typeof window.PointerEvent === 'undefined') {
  class PointerEventPolyfill extends MouseEvent implements PointerEvent {
    pointerId: number
    width: number
    height: number
    pressure: number
    tangentialPressure: number
    tiltX: number
    tiltY: number
    twist: number
    pointerType: string
    isPrimary: boolean
    altitudeAngle: number
    azimuthAngle: number
    persistentDeviceId: number

    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params)
      this.pointerId = params.pointerId ?? 0
      this.width = params.width ?? 1
      this.height = params.height ?? 1
      this.pressure = params.pressure ?? 0
      this.tangentialPressure = params.tangentialPressure ?? 0
      this.tiltX = params.tiltX ?? 0
      this.tiltY = params.tiltY ?? 0
      this.twist = params.twist ?? 0
      this.pointerType = params.pointerType ?? ''
      this.isPrimary = params.isPrimary ?? false
      this.altitudeAngle = params.altitudeAngle ?? 0
      this.azimuthAngle = params.azimuthAngle ?? 0
      this.persistentDeviceId = 0
    }

    getCoalescedEvents(): PointerEvent[] {
      return []
    }

    getPredictedEvents(): PointerEvent[] {
      return []
    }
  }

  window.PointerEvent = PointerEventPolyfill as unknown as typeof PointerEvent
}
