// ============================================================
// PRODUCT TYPE SYSTEM — "O DIRETOR"
// ============================================================

export type ProductType = 'APPAREL' | 'WATCH' | 'ACCESSORY'
export type ProductTier = 'premium' | 'standard'
export type Gender = 'masculine' | 'feminine' | 'unisex'
export type Fit = 'slim' | 'regular' | 'relaxed' | 'oversized'

export interface ColorVariant {
  name: string
  hex: string
  images: string[]
  inStock: boolean
  price?: number
}

export interface SizeVariant {
  label: string
  inStock: boolean
}

export interface SizeGuide {
  unit: 'BR' | 'EU' | 'US'
  sizes: Array<{
    label: string
    chest?: number
    waist?: number
    hip?: number
  }>
}

// ============================================================
// BASE PRODUCT
// ============================================================
export interface BaseProduct {
  id: string
  slug: string
  name: string
  price: number
  comparePrice?: number
  images: string[]
  description: string
  shortDesc: string
  tags: string[]
  inStock: boolean
  stock: number
  featured: boolean
  isNew?: boolean
  isSale?: boolean
  category: string
}

// ============================================================
// APPAREL PRODUCT
// ============================================================
export interface ApparelProduct extends BaseProduct {
  type: 'APPAREL'
  fabric: string
  care: string[]
  sizeGuide: SizeGuide
  colorVariants: ColorVariant[]
  sizes: SizeVariant[]
  fit: Fit
  gender: Gender
}

// ============================================================
// WATCH PRODUCT
// ============================================================
export interface WatchProduct extends BaseProduct {
  type: 'WATCH'
  movement: string
  caseMaterial: string
  caseDiameter: string
  caseThickness: string
  waterResistance: string
  dialColor: string
  strapMaterial: string
  crystalType: string
  powerReserve?: string
  story: string
  colorVariants: ColorVariant[]
  reference: string
}

// ============================================================
// ACCESSORY PRODUCT
// ============================================================
export interface AccessoryProduct extends BaseProduct {
  type: 'ACCESSORY'
  tier: ProductTier
  material: string
  colorVariants: ColorVariant[]
  dimensions?: string
  weight?: string
  closure?: string
  warranty?: string
  gender: Gender
}

// Union type
export type Product = ApparelProduct | WatchProduct | AccessoryProduct
