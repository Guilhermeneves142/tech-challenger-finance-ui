import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: false,
  treeshake: true,
  // react / react-dom vêm das peerDependencies; o resto (base-ui, lucide, etc.)
  // o tsup externaliza automaticamente por estar em "dependencies".
  external: ["react", "react-dom", "react/jsx-runtime"],
  // O esbuild remove a diretiva "use client" ao fazer o bundle, então a
  // injetamos de volta no topo dos arquivos finais (necessária no App Router).
  onSuccess: "node ./scripts/add-use-client.mjs",
})
