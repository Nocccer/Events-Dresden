interface PriceProps {
  vvk?: number
  ak?: number
}

interface TimeProps {
  door?: Date
  start?: Date
}

export interface EventProps {
  name?: string
  date?: Date
  time?: TimeProps
  description?: string
  links?: string[]
  price?: PriceProps
}
