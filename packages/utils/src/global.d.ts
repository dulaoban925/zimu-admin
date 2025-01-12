interface HTMLElement {
  webkitRequestFullScreen: (options?: FullscreenOptions) => Promise<void>
  msRequestFullscreen: (options?: FullscreenOptions) => Promise<void>
  mozRequestFullScreen: (options?: FullscreenOptions) => Promise<void>

  onwebkitfullscreenchange: ((this: Element, ev: Event) => any) | null
  onmozfullscreenchange: ((this: Element, ev: Event) => any) | null
  MSFullscreenChange: ((this: Element, ev: Event) => any) | null
}

interface Document {
  readonly webkitFullscreenElement: Element | null
  readonly msFullscreenElement: Element | null
  readonly mozFullScreenElement: Element | null

  webkitExitFullscreen: () => Promise<void>
  msExitFullscreen: () => Promise<void>
  mozCancelFullScreen: () => Promise<void>
}
