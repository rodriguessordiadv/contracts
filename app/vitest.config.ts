import { defineConfig } from "vitest/config";

export default defineConfig({
  // Não processar PostCSS/Tailwind nos testes (são testes de lógica pura).
  css: { postcss: { plugins: [] } },
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
