export default interface Cycle {
  title: string
  id: string
  host: string
  price: number
  paused?: boolean
  features: string[]
  model: string
  image?: string
  gear: boolean
  rating: number
  timeAdded: number
}
