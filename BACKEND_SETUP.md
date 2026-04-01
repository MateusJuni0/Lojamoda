# Backend Setup — Noir Élite

Guia para configurar os serviços de backend do Noir Élite.

---

## 1. Stripe (Pagamentos)

### Criar conta
1. Regista-te em [stripe.com](https://stripe.com)
2. Vai a **Developers > API keys**
3. Copia a **Publishable key** (pk_test_...) e a **Secret key** (sk_test_...)

### Configurar webhook
1. Vai a **Developers > Webhooks**
2. Clica em **Add endpoint**
3. URL: `https://teu-dominio.com/api/webhooks/stripe`
4. Eventos: `checkout.session.completed`, `payment_intent.payment_failed`
5. Copia o **Signing secret** (whsec_...)

### Variáveis de ambiente
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Testar localmente
```bash
# Instalar Stripe CLI: https://stripe.com/docs/stripe-cli
stripe listen --forward-to localhost:3001/api/webhooks/stripe
```

---

## 2. Supabase (Base de Dados)

### Criar projeto
1. Regista-te em [supabase.com](https://supabase.com)
2. Cria um novo projeto
3. Vai a **Settings > API** e copia URL + anon key + service role key

### Criar schema
1. Vai ao **SQL Editor** no dashboard do Supabase
2. Cola e executa o conteúdo de `supabase/schema.sql`
3. Para dados iniciais, executa `supabase/seed.sql`

### Activar Realtime
1. Vai a **Database > Replication**
2. Activa replication para a tabela `products` (para stock em tempo real)

### Variáveis de ambiente
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

## 3. Resend (Email Transacional)

### Configurar
1. Regista-te em [resend.com](https://resend.com)
2. Verifica o teu domínio (DNS records)
3. Cria uma API key

### Variáveis de ambiente
```env
RESEND_API_KEY=re_...
FROM_EMAIL=noir@teu-dominio.com
```

---

## 4. Admin Dashboard

O painel admin está protegido por password simples.

### Variáveis de ambiente
```env
ADMIN_PASSWORD=a-tua-senha-segura
```

### Aceder
- URL: `/admin/login`
- Insere a password definida na variável `ADMIN_PASSWORD`

---

## 5. Deploy (Vercel)

### Variáveis de ambiente no Vercel
Adiciona todas as variáveis listadas acima em **Settings > Environment Variables** no dashboard do Vercel.

### Domínio
Configura o domínio customizado e actualiza:
```env
NEXT_PUBLIC_APP_URL=https://teu-dominio.com
```

---

## Ficheiros de referência

| Ficheiro | Descrição |
|----------|-----------|
| `.env.example` | Template com todas as variáveis necessárias |
| `supabase/schema.sql` | Schema da base de dados (tabelas, RLS, índices) |
| `supabase/seed.sql` | Dados iniciais (45 produtos) |
| `src/lib/stripe.ts` | Client-side Stripe |
| `src/lib/stripe-server.ts` | Server-side Stripe |
| `src/lib/supabase.ts` | Supabase client + admin |
| `src/lib/db.ts` | Database helpers (CRUD) |
| `src/lib/email.ts` | Email templates (Resend) |
| `src/lib/shipping.ts` | Lógica de portes de envio |

---

## Fallback Mode

O site funciona sem Supabase/Stripe configurados — usa dados mock do `src/data/products.ts`. Configura os serviços quando estiveres pronto para ir live.
