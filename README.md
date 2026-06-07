# @vandrei/finance-ui

Design system do **FinanceApp** — design tokens (CSS variables), tipografia e
componentes React. Construído com **Tailwind CSS v4** + **Base UI**.

Funciona em **Next.js** (App Router) e **React/Vite**. Os tokens e a configuração
de tema já vêm embutidos — você não precisa recriar nada nos projetos consumidores.

## Instalação

```bash
npm install @vandrei/finance-ui
```

`react` e `react-dom` (>= 19) são peer dependencies — você já os tem no projeto.
Todo o resto (Base UI, lucide-react, @tanstack/react-table, react-day-picker,
class-variance-authority, clsx, tailwind-merge) vem junto com a lib.

## Como usar

A lib oferece **dois modos** de consumir os estilos. Escolha conforme o projeto.

### Modo A — App com Tailwind v4 (recomendado para os 3 projetos do FinanceApp)

O app mantém o próprio Tailwind. Você importa os **tokens crus** (para que as suas
próprias classes — `bg-primary`, `text-foreground` etc. — usem os tokens) e
manda o Tailwind escanear a lib (para gerar as classes usadas pelos componentes).

No CSS de entrada do app (ex.: `globals.css` / `index.css`):

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

/* tokens + tipografia do design system */
@import "@vandrei/finance-ui/tokens.css";
@import "@vandrei/finance-ui/typography.css";

/* faz o Tailwind gerar as utilities usadas pelos componentes da lib */
@source "../../node_modules/@vandrei/finance-ui/dist";
```

> O caminho do `@source` é relativo ao arquivo CSS. Ajuste o número de `../`
> conforme a localização do seu CSS (ex.: a partir de `src/styles/globals.css`
> normalmente são dois níveis até a raiz). Se preferir, use o caminho a partir
> da raiz do projeto.

### Modo B — App React puro / sem Tailwind

Importe a folha de estilo já compilada (auto-contida: reset + tokens +
tipografia + todas as classes dos componentes). Não precisa de Tailwind no app.

```ts
// no entrypoint do app (ex.: main.tsx ou layout.tsx)
import "@vandrei/finance-ui/styles.css"
```

### Usando os componentes

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from "@vandrei/finance-ui"

export function Exemplo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saldo</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Input placeholder="Buscar..." />
        <Button>Salvar</Button>
      </CardContent>
    </Card>
  )
}
```

## Dark mode

Os tokens definem variáveis para `:root` e `.dark`. Basta adicionar a classe
`dark` num ancestral (ex.: `<html class="dark">`).

## Componentes incluídos

`Button`, `Badge`, `Input`, `Label`, `Card`, `Textarea`, `Dialog`, `Calendar`,
`Popover`, `RadioGroup`, `Select`, `Tabs`, `Table`, `Pagination`, `DataTable`,
além do utilitário `cn`.

## Exports

| Import | Conteúdo |
|---|---|
| `@vandrei/finance-ui` | Componentes + `cn` (ESM e CJS, com tipos) |
| `@vandrei/finance-ui/tokens.css` | `@theme` + variáveis `:root`/`.dark` (modo A) |
| `@vandrei/finance-ui/typography.css` | Fonte Roboto + escala tipográfica |
| `@vandrei/finance-ui/styles.css` | CSS compilada, auto-contida (modo B) |

## Desenvolvimento

```bash
npm install      # instalar deps
npm run build    # gera dist/ (JS + tipos + CSS)
npm run dev      # tsup em watch mode
```

## Publicação (npm público)

```bash
npm login
npm run build
npm publish      # publishConfig.access já está como "public"
```

Para uma nova versão: atualize `version` no `package.json` (ou `npm version patch`)
e rode `npm publish` de novo.
