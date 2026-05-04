import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import * as importPlugins from "eslint-plugin-import";

export default tseslint.config(
  // 基本的な推奨設定を適用
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    plugins: {
      import: importPlugins,
    },
    settings: {
      "import/resolver": {
        typescript: {},
      },
    },
  },
);
