# MoVaa - A mudança que você quer ver no mundo

Plataforma de Petições e Causas Sociais desenvolvida com React, TypeScript e Vite.

## 🚀 Funcionalidades

### 1. Sistema de Petições
- ✅ Listagem de petições em destaque
- ✅ Grid responsivo com cards
- ✅ Filtros por categoria
- ✅ Ordenação (popularidade, data, assinaturas)
- ✅ Busca por palavras-chave
- ✅ Página de detalhes completa
- ✅ Formulário de assinatura
- ✅ Assinatura anônima
- ✅ Login rápido com Google OAuth
- ✅ Página de agradecimento

### 2. Sistema de Doações
- ✅ Integração com múltiplos métodos de pagamento
- ✅ PIX (Brasil)
- ✅ Boleto (Brasil)
- ✅ Cartão de crédito (Brasil)
- ✅ PayPal (Internacional)
- ✅ Stripe (Internacional)
- ✅ Confirmação por email
- ✅ Recibo para doador

### 3. Compartilhamento Social
- ✅ Facebook
- ✅ Twitter/X
- ✅ WhatsApp
- ✅ Link copiável
- ✅ Preview otimizado (Open Graph)
- ✅ Tracking de compartilhamentos

### 4. Internacionalização (i18n)
- ✅ Português (Brasil) - Padrão
- ✅ Inglês
- ✅ Espanhol
- ✅ Detecção automática de idioma
- ✅ Seletor de idioma no header
- ✅ Persistência da preferência
- ✅ Formatação localizada (datas, números, moedas)

### 5. Serviços e Produtos
- ✅ Página de serviços
- ✅ Página de produtos
- ✅ Formulários de contato

### 6. Analytics e Tracking
- ✅ Google Tag Manager (GTM)
- ✅ Google Analytics
- ✅ Custom events
- ✅ Dashboard interno (arquivo JSON)
- ✅ Tracking de visualizações
- ✅ Tracking de cliques
- ✅ Taxa de conversão
- ✅ Origem de tráfego

### 7. Páginas Institucionais
- ✅ Sobre Nós
- ✅ Trabalhe Conosco
- ✅ Imprensa
- ✅ Central de Ajuda (FAQ)
- ✅ Fale Conosco
- ✅ Envie Feedback
- ✅ Política de Privacidade (LGPD/GDPR)
- ✅ Termos de Uso

## 🛠️ Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **i18next** - Internacionalização
- **Zustand** - Gerenciamento de estado
- **Tailwind CSS** - Estilização
- **React Hot Toast** - Notificações
- **React Share** - Compartilhamento social
- **Google OAuth** - Autenticação
- **Axios** - Cliente HTTP

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_API_URL=http://localhost:3001/api
VITE_GOOGLE_CLIENT_ID=seu-google-client-id
VITE_GTM_ID=seu-gtm-id
VITE_GA_ID=seu-ga-id
VITE_ASAAS_API_KEY=sua-asaas-api-key
VITE_STRIPE_PUBLISHABLE_KEY=sua-stripe-key
VITE_PAYPAL_CLIENT_ID=seu-paypal-client-id
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── common/         # Componentes comuns (Button, LanguageSelector, etc.)
│   ├── layout/         # Layout (Header, Footer, Layout)
│   └── petitions/      # Componentes específicos de petições
├── pages/              # Páginas da aplicação
├── hooks/              # Custom hooks
├── services/           # Serviços e APIs
├── store/              # Estado global (Zustand)
├── types/              # Tipos TypeScript
├── utils/              # Funções utilitárias
├── i18n/               # Configuração e traduções
├── styles/             # Estilos globais
├── config/             # Configurações da aplicação
├── App.tsx             # Componente principal
└── main.tsx            # Entry point
```

## 🎨 Design System

O projeto utiliza Tailwind CSS com um sistema de design customizado:

- **Cores Primárias**: Azul (primary)
- **Cores Secundárias**: Roxo (secondary)
- **Componentes**: Cards, Buttons, Inputs padronizados
- **Responsividade**: Mobile-first approach

## 🌐 Internacionalização

O projeto suporta 3 idiomas:
- Português (Brasil) - `pt-BR`
- Inglês - `en`
- Espanhol - `es`

As traduções estão em `src/i18n/locales/`.

## 📊 Analytics

O projeto inclui:
- Google Tag Manager para gerenciamento de tags
- Google Analytics para tracking
- Dashboard interno que exporta dados em JSON
- Eventos customizados para ações específicas

## 🔒 Segurança

- Validação de formulários
- Sanitização de inputs
- Conformidade com LGPD/GDPR
- Política de privacidade completa

## 📝 Licença

Este projeto é propriedade da Equipe MoVaa.

## 👥 Equipe

Desenvolvido pela Equipe MoVaa.

---

**Versão**: 1.0.0  
**Framework**: Vite + React  
**Autor**: Equipe MoVaa
