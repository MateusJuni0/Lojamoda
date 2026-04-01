export interface ShippingRate {
  label: string
  price: number
  free_threshold: number
}

export const SHIPPING_RATES: Record<string, ShippingRate> = {
  PT_CONTINENTAL: { label: 'Portugal Continental', price: 4.99, free_threshold: 150 },
  PT_ISLANDS:     { label: 'Açores / Madeira', price: 9.99, free_threshold: 200 },
  ES:             { label: 'Espanha', price: 7.99, free_threshold: 200 },
  EU:             { label: 'Europa', price: 14.99, free_threshold: 300 },
  WORLD:          { label: 'Resto do Mundo', price: 24.99, free_threshold: 500 },
}

const COUNTRY_TO_ZONE: Record<string, string> = {
  PT: 'PT_CONTINENTAL',
  ES: 'ES',
  FR: 'EU', DE: 'EU', IT: 'EU', NL: 'EU', BE: 'EU', AT: 'EU',
  IE: 'EU', LU: 'EU', FI: 'EU', SE: 'EU', DK: 'EU', PL: 'EU',
  CZ: 'EU', GR: 'EU', HU: 'EU', RO: 'EU', BG: 'EU', HR: 'EU',
  SK: 'EU', SI: 'EU', EE: 'EU', LV: 'EU', LT: 'EU', MT: 'EU', CY: 'EU',
  GB: 'EU',
}

export function getShippingZone(countryCode: string): string {
  return COUNTRY_TO_ZONE[countryCode.toUpperCase()] ?? 'WORLD'
}

export interface ShippingResult {
  price: number
  label: string
  free: boolean
  zone: string
}

export function calculateShipping(countryCode: string, subtotal: number): ShippingResult {
  const zone = getShippingZone(countryCode)
  const rate = SHIPPING_RATES[zone] ?? SHIPPING_RATES.WORLD
  const free = subtotal >= rate.free_threshold

  return {
    price: free ? 0 : rate.price,
    label: rate.label,
    free,
    zone,
  }
}

export const SUPPORTED_COUNTRIES = [
  { code: 'PT', name: 'Portugal' },
  { code: 'ES', name: 'Espanha' },
  { code: 'FR', name: 'França' },
  { code: 'DE', name: 'Alemanha' },
  { code: 'GB', name: 'Reino Unido' },
  { code: 'IT', name: 'Itália' },
  { code: 'NL', name: 'Países Baixos' },
  { code: 'BE', name: 'Bélgica' },
  { code: 'AT', name: 'Áustria' },
  { code: 'IE', name: 'Irlanda' },
] as const
