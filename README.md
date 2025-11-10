# MoVaa - Plataforma de Petições e Causas Sociais

MoVaa é uma plataforma completa para criação, assinatura e promoção de petições e causas sociais, com sistema integrado de doações e compartilhamento social.

## 🚀 Funcionalidades

- ✅ Sistema completo de petições (criação, visualização, assinatura)
- ✅ Sistema de doações com múltiplas integrações de pagamento (PIX, Boleto, Cartão, PayPal, Stripe)
- ✅ Compartilhamento social (Facebook, Twitter, WhatsApp)
- ✅ Internacionalização (Português, Inglês, Espanhol)
- ✅ Analytics integrado (GTM, Google Analytics, Dashboard interno)
- ✅ Páginas institucionais completas
- ✅ Design responsivo e moderno
- ✅ Performance otimizada

## 🛠️ Tecnologias

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **i18n:** next-intl
- **Formulários:** React Hook Form + Zod
- **Ícones:** Lucide React
- **Animações:** Framer Motion
- **Compartilhamento:** react-share

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd movaa-platform
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

Edite `.env.local` e configure:
- `NEXT_PUBLIC_GTM_ID` - ID do Google Tag Manager (opcional)
- `NEXT_PUBLIC_GA_ID` - ID do Google Analytics (opcional)

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse [http://localhost:3000](http://localhost:3000)

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # Rotas e páginas (Next.js App Router)
│   ├── [locale]/          # Rotas internacionalizadas
│   └── api/               # API Routes
├── components/            # Componentes React
│   ├── layout/            # Header, Footer
│   ├── petitions/         # Componentes de petições
│   ├── donations/         # Componentes de doações
│   ├── social/            # Compartilhamento social
│   ├── ui/                # Componentes UI reutilizáveis
│   └── analytics/         # Analytics
├── hooks/                 # Custom hooks
├── lib/                   # Utilitários e configurações
│   └── i18n/             # Configuração i18n
├── locales/              # Traduções (pt, en, es)
├── services/             # Serviços de API
├── styles/               # Estilos globais
└── types/                # TypeScript types
```

## 🌍 Internacionalização

A plataforma suporta três idiomas:
- Português (pt) - Padrão
- Inglês (en)
- Espanhol (es)

As traduções estão em `src/locales/`. O idioma é detectado automaticamente pelo navegador ou pode ser selecionado manualmente no header.

## 💳 Integrações de Pagamento

### Brasil
- **PIX:** Via PixGG
- **Boleto:** Via Asaas
- **Cartão de Crédito:** Via Asaas

### Internacional
- **PayPal**
- **Stripe**

> **Nota:** As integrações de pagamento precisam ser configuradas com as credenciais reais dos provedores.

## 📊 Analytics

A plataforma inclui três sistemas de analytics:

1. **Google Tag Manager (GTM)** - Configurado via `NEXT_PUBLIC_GTM_ID`
2. **Google Analytics** - Configurado via `NEXT_PUBLIC_GA_ID`
3. **Dashboard Interno** - Dados salvos em `data/analytics.json`

## 🎨 Customização

### Cores
As cores podem ser customizadas em `tailwind.config.js`:
- Primary: Azul (primary-*)
- Secondary: Roxo (secondary-*)

### Tema
O tema suporta modo claro e escuro através do `next-themes`.

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa ESLint
- `npm run type-check` - Verifica tipos TypeScript

## 🔒 Segurança

- Validação de formulários com Zod
- Sanitização de inputs
- Proteção CSRF nas APIs
- Headers de segurança configurados

## 📄 Licença

Este projeto é proprietário da MoVaa.

## 🤝 Contribuindo

Para contribuir com o projeto, entre em contato através de contato@movaa.com.br

## 📞 Suporte

Para suporte, acesse a [Central de Ajuda](/help) ou entre em contato:
- E-mail: contato@movaa.com.br
- Telefone: +55 (11) 9999-9999

---

**MoVaa** - A mudança que você quer ver no mundo.
