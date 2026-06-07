import { copyFile, mkdir } from "node:fs/promises"

// Copia os tokens "crus" (não compilados) para o dist, para consumidores que
// usam Tailwind v4 e querem que as próprias classes usem os design tokens.
await mkdir("dist", { recursive: true })
await copyFile("src/styles/tokens.css", "dist/tokens.css")
await copyFile("src/styles/typography.css", "dist/typography.css")

console.log("✓ tokens.css e typography.css copiados para dist/")
