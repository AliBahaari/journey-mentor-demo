export type CountryType = {
  data: {
    flags?: {
      png: string
    }
    name?: {
      common: string
      official: string
    }
    tld?: string[]
    population?: number
    currencies?: {
      [x: string]: {
        name: string
        symbol: string
      }
    }
    languages?: {
      [x: string]: string
    }
    region?: string
    subregion?: string
    capital?: string[]
    borders?: string[]
  }
  isLoading: boolean
}
