import { type Variants } from 'framer-motion'

// ============================================================
// EASINGS
// ============================================================
export const easing = {
  luxury:    [0.25, 0.46, 0.45, 0.94] as const,
  casual:    [0.4, 0, 0.2, 1]          as const,
  decelerate:[0, 0, 0.2, 1]            as const,
  accelerate:[0.4, 0, 1, 1]            as const,
}

export const spring = {
  default:  { type: 'spring' as const, stiffness: 300, damping: 30 },
  snappy:   { type: 'spring' as const, stiffness: 500, damping: 40 },
  bouncy:   { type: 'spring' as const, stiffness: 400, damping: 20 },
  drawer:   { type: 'spring' as const, stiffness: 350, damping: 35 },
}

// ============================================================
// FADE / REVEAL VARIANTS
// ============================================================
export const fadeUpVariant: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.6, ease: easing.luxury }
  },
}

export const fadeUpCasualVariant: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.4, ease: easing.casual }
  },
}

export const fadeInVariant: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: easing.casual } },
}

export const scaleInVariant: Variants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.4, ease: easing.luxury }
  },
}

export const slideFromRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.5, ease: easing.luxury }
  },
}

export const slideFromLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.5, ease: easing.luxury }
  },
}

// ============================================================
// STAGGER CONTAINERS
// ============================================================
export const staggerContainerCasual: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

export const staggerContainerLuxury: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

export const cardItemVariant: Variants = {
  hidden:  { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.45, ease: easing.luxury }
  },
}

// ============================================================
// MODAL / DRAWER VARIANTS
// ============================================================
export const modalVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.95, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.3, ease: easing.luxury }
  },
  exit:    { opacity: 0, scale: 0.97, y: 5,
    transition: { duration: 0.2 }
  },
}

export const backdropVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

export const cartDrawerVariants: Variants = {
  closed: { x: '100%', opacity: 0 },
  open:   { x: 0, opacity: 1, transition: spring.drawer },
}

export const mobileNavVariants: Variants = {
  closed: { x: '-100%' },
  open:   { x: 0, transition: spring.snappy },
}

export const filterPanelVariants: Variants = {
  hidden:  { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1,
    transition: { duration: 0.35, ease: easing.luxury }
  },
  exit:    { height: 0, opacity: 0, transition: { duration: 0.25 } },
}

// ============================================================
// TOAST VARIANTS
// ============================================================
export const toastVariants: Variants = {
  hidden:  { opacity: 0, y: -20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 500, damping: 35 }
  },
  exit:    { opacity: 0, y: -10, scale: 0.95,
    transition: { duration: 0.2 }
  },
}

// ============================================================
// PAGE TRANSITIONS
// ============================================================
export const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
}
