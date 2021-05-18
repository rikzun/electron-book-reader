export function clamp(number: number, min: number, max: number): number {
  return Math.min(Math.max(number, min), max)
}

export function wait(ms: number): Promise<Function> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}