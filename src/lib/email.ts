import { Resend } from 'resend'
import type { OrderItem } from '@/types/database'

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key || key === 're_placeholder') return null
  return new Resend(key)
}

function getFromEmail(): string {
  return process.env.FROM_EMAIL ?? 'noir@noire-elite.com'
}

// ============================================================
// ORDER CONFIRMATION
// ============================================================

interface OrderConfirmationData {
  customer_email: string
  customer_name: string
  order_id: string
  items: OrderItem[]
  total: number
  shipping_address?: {
    line1: string
    city: string
    postal_code: string
    country: string
  } | null
}

export async function sendOrderConfirmation(order: OrderConfirmationData): Promise<boolean> {
  const resend = getResend()
  if (!resend) return false

  const itemsHtml = order.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:12px;border-bottom:1px solid #eee;">${item.product_name}</td>
          <td style="padding:12px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
          <td style="padding:12px;border-bottom:1px solid #eee;text-align:right;">€${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`,
    )
    .join('')

  const addressHtml = order.shipping_address
    ? `<div style="margin-top:24px;padding:16px;background:#f9f9f9;border-radius:8px;">
        <h3 style="margin:0 0 8px;font-size:14px;color:#666;">Morada de Entrega</h3>
        <p style="margin:0;color:#333;">${order.shipping_address.line1}<br/>
        ${order.shipping_address.postal_code} ${order.shipping_address.city}<br/>
        ${order.shipping_address.country}</p>
      </div>`
    : ''

  const html = `
    <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif;color:#1a1a1a;">
      <div style="text-align:center;padding:32px 0;border-bottom:2px solid #1a1a1a;">
        <h1 style="font-size:28px;letter-spacing:4px;margin:0;">NOIR ÉLITE</h1>
      </div>
      <div style="padding:32px 24px;">
        <h2 style="font-size:22px;margin:0 0 8px;">Obrigado pela sua encomenda</h2>
        <p style="color:#666;margin:0 0 24px;">Olá ${order.customer_name}, a sua encomenda #${order.order_id.slice(0, 8)} foi confirmada.</p>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="border-bottom:2px solid #1a1a1a;">
              <th style="padding:12px;text-align:left;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Produto</th>
              <th style="padding:12px;text-align:center;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Qtd</th>
              <th style="padding:12px;text-align:right;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Total</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding:16px 12px;font-weight:bold;font-size:16px;">Total</td>
              <td style="padding:16px 12px;text-align:right;font-weight:bold;font-size:16px;">€${order.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        ${addressHtml}
      </div>
      <div style="text-align:center;padding:24px;border-top:1px solid #eee;color:#999;font-size:12px;">
        <p>Noir Élite — Moda de Luxo</p>
        <p>Dúvidas? Responda a este email.</p>
      </div>
    </div>
  `

  try {
    await resend.emails.send({
      from: `Noir Élite <${getFromEmail()}>`,
      to: order.customer_email,
      subject: `Encomenda Confirmada #${order.order_id.slice(0, 8)} — Noir Élite`,
      html,
    })
    return true
  } catch {
    return false
  }
}

// ============================================================
// ABANDONED CART
// ============================================================

interface AbandonedCartItem {
  name: string
  price: number
  image?: string
}

export async function sendAbandonedCart(
  email: string,
  items: AbandonedCartItem[],
): Promise<boolean> {
  const resend = getResend()
  if (!resend) return false

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://noirelite.pt'

  const itemsHtml = items
    .map(
      (item) =>
        `<div style="display:flex;align-items:center;gap:16px;padding:16px 0;border-bottom:1px solid #eee;">
          ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:80px;height:80px;object-fit:cover;border-radius:4px;" />` : ''}
          <div>
            <p style="margin:0;font-weight:bold;">${item.name}</p>
            <p style="margin:4px 0 0;color:#666;">€${item.price.toFixed(2)}</p>
          </div>
        </div>`,
    )
    .join('')

  const html = `
    <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif;color:#1a1a1a;">
      <div style="text-align:center;padding:32px 0;border-bottom:2px solid #1a1a1a;">
        <h1 style="font-size:28px;letter-spacing:4px;margin:0;">NOIR ÉLITE</h1>
      </div>
      <div style="padding:32px 24px;">
        <h2 style="font-size:22px;margin:0 0 8px;">A sua seleção exclusiva aguarda-o</h2>
        <p style="color:#666;margin:0 0 24px;">Reparámos que deixou peças excepcionais no seu carrinho. O stock é limitado — garanta as suas antes que se esgotem.</p>
        ${itemsHtml}
        <div style="text-align:center;margin-top:32px;">
          <a href="${appUrl}/carrinho" style="display:inline-block;padding:16px 48px;background:#1a1a1a;color:#fff;text-decoration:none;font-size:14px;letter-spacing:2px;text-transform:uppercase;border-radius:4px;">
            Completar Encomenda
          </a>
        </div>
      </div>
      <div style="text-align:center;padding:24px;border-top:1px solid #eee;color:#999;font-size:12px;">
        <p>Noir Élite — Moda de Luxo</p>
      </div>
    </div>
  `

  try {
    await resend.emails.send({
      from: `Noir Élite <${getFromEmail()}>`,
      to: email,
      subject: 'A sua seleção exclusiva aguarda-o — Noir Élite',
      html,
    })
    return true
  } catch {
    return false
  }
}
