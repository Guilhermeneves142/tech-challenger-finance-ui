import { readFile, writeFile } from "node:fs/promises"

// O bundle inteiro é uma client boundary (todos os componentes são interativos
// via Base UI). O esbuild descarta a diretiva ao fazer o bundle, então a
// reinserimos no topo dos arquivos gerados.
const files = ["dist/index.js", "dist/index.cjs"]
const directive = '"use client";\n'

for (const file of files) {
  const content = await readFile(file, "utf8")
  if (content.startsWith('"use client"')) continue
  // No CJS, mantém o "use strict" como primeira linha se existir.
  if (content.startsWith("'use strict';")) {
    const rest = content.slice("'use strict';".length)
    await writeFile(file, `'use strict';\n${directive}${rest}`)
  } else {
    await writeFile(file, directive + content)
  }
}

console.log("✓ diretiva 'use client' adicionada ao dist/")
