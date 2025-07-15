# MB Web App - Sistema de Cadastro

## 📋 Visão Geral

Sistema de cadastro multi-etapas desenvolvido em Vue 3 com validação tanto no frontend quanto no backend. O projeto consiste em uma aplicação web moderna com formulário progressivo para registro de usuários (pessoa física ou jurídica).

## 🛠️ Setup do Desenvolvimento

1. Clone o projeto
2. Instale as dependências: `npm run install:all`, instalando as dependências do projeto WEB e Backend Server.

Para rodar o projeto completo (frontend + backend):

```bash
npm run project
```

Este comando irá:

1. Fazer o build da aplicação frontend
2. Navegar para a pasta do servidor
3. Iniciar o servidor backend

### Comandos Individuais

**Frontend:**

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

**Backend:**

```bash
cd server
npm run start    # Produção
npm run dev      # Desenvolvimento com watch
```

## 📦 Pacotes Utilizados

### Frontend (Vue 3)

| Pacote                 | Versão      | Propósito                                                |
| ---------------------- | ----------- | -------------------------------------------------------- |
| **vue**                | ^3.5.17     | Framework principal                                      |
| **vue-toastification** | ^2.0.0-rc.5 | Sistema de notificações toast                            |
| **vue-the-mask**       | ^0.11.1     | Máscaras para inputs (CPF, CNPJ, telefone)               |
| **formik**             | ^2.4.6      | Biblioteca de formulários (disponível mas não utilizada) |
| **yup**                | ^1.6.1      | Validação de esquemas (disponível mas não utilizada)     |

### DevDependencies

| Pacote                 | Versão  | Propósito               |
| ---------------------- | ------- | ----------------------- |
| **@vitejs/plugin-vue** | ^6.0.0  | Plugin Vue para Vite    |
| **vite**               | ^7.0.4  | Build tool e dev server |
| **sass**               | ^1.89.2 | Pré-processador CSS     |
| **prettier**           | ^3.6.2  | Formatação de código    |

### Backend (Node.js)

| Pacote      | Versão  | Propósito                  |
| ----------- | ------- | -------------------------- |
| **express** | ^4.18.2 | Framework web para Node.js |
| **cors**    | ^2.8.5  | Middleware para CORS       |

## 🏗️ Approaches de Tecnologia

### Arquitetura Frontend

- **Vue 3 Composition API**: Utilização da sintaxe `<script setup>` para maior performance e melhor experiência de desenvolvimento
- **Componentização DRY**: Componentes reutilizáveis seguindo o princípio "Don't Repeat Yourself"

### Metodologia CSS - BEM

O projeto utiliza a metodologia **BEM (Block Element Modifier)** para nomenclatura de classes CSS:

```scss
.registration-form {
  // Block
  &__title {
    // Element
    font-size: 24px;
  }
}
```

**Benefícios da abordagem BEM:**

- Código CSS mais organizado e legível
- Evita conflitos de nomenclatura
- Facilita manutenção e escalabilidade
- Melhora a colaboração em equipe

### Componentização DRY

**Componentes Reutilizáveis:**

- `MBInput`: Input personalizado com validação e máscaras
- `MBButton`: Botão com diferentes variantes (primary, secondary)
- `MBToastContainer`: Sistema de notificações centralizado

**Hooks Customizados:**

- `useRegistration`: Gerenciamento de estado do formulário de cadastro

## 🔍 Validação de Campos

### Frontend

**Características:**

- Máscaras automáticas para CPF, CNPJ e telefone
- Estados de botões baseados na validação

### Backend

O servidor implementa validação robusta:

- Validação de formato de email
- Verificação de CPF/CNPJ
- Validação de campos obrigatórios
- Retorno de erros estruturados

### Decisão de Implementação

**Bibliotecas Disponíveis vs. Implementação Customizada:**

O projeto tem **Formik** e **Yup** instalados, que são bibliotecas robustas para:

- Formik: Gerenciamento avançado de formulários
- Yup: Validação de esquemas com mensagens de erro personalizadas

**Por que optei pela implementação customizada:**

1. **Facilitar Testagem**: Implementação mais simples permite identificar facilmente problemas e comportamentos
2. **Demonstrar Conhecimento**: Mostra domínio dos conceitos fundamentais de validação
3. **Controle Total**: Permite ajustes específicos sem dependência externa
4. **Debugging Simplificado**: Erros são mais fáceis de rastrear e corrigir

**Para um projeto em produção, recomendo:**

```javascript
// Exemplo com Yup + Formik
const validationSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  cpf: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
    .required('CPF é obrigatório'),
});
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── forms/registration/         # Formulário de cadastro
│   ├── input/                      # Componentes de input reutilizáveis
│   ├── header/                     # Cabeçalho da aplicação
│   └── toast/                      # Sistema de notificações
├── hooks/                          # Hooks customizados
├── models/                         # Modelos de dados
├── style/                          # Estilos globais SCSS
└── assets/                         # Assets estáticos
│   └── main.scss      # Arquivo principal SASS
├── App.vue            # Componente raiz
└── main.js           # Ponto de entrada
```

## 🎨 Variáveis SASS

As variáveis SASS estão disponíveis globalmente em todos os componentes. Você pode usar variáveis como:

- `$primary-color`
- `$background-color`

## 🎯 Formatação Automática

O projeto está configurado com **Prettier** para formatação automática:

- **Formatar ao salvar**: Habilitado automaticamente no VS Code
- **Configuração**: `.prettierrc` na raiz do projeto
- **Extensões recomendadas**: Listadas em `.vscode/extensions.json`

### Configurações do Prettier

- Single quotes
- Semicolons
- 2 espaços de indentação
- Trailing commas em ES5
- Formatação automática para Vue, JS, SCSS, HTML, JSON

## 📋 Extensões Recomendadas do VS Code

- **Vue Language Features (Volar)**: Suporte completo ao Vue 3
- **Prettier**: Formatação automática de código

As extensões serão sugeridas automaticamente quando abrir o projeto no VS Code.
