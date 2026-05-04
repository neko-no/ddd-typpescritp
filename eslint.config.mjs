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
    rules: {
      // アンダースコアで始まる変数を未使用エラーから除外する設定
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_", // アンダースコアで始まる変数を無視
          argsIgnorePattern: "^_", // アンダースコアで始まる引数を無視
          caughtErrorsIgnorePattern: "^_", // アンダースコアで始まるエラー変数を無視
        },
      ],

      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            // Domain層が依存してはいけない領域
            // ドメインのビジネスロジックの純粋性を保つため、外側の層への依存を禁止
            {
              from: "./src/Application/**/*",
              target: "./src/Domain/**/!(*.spec.ts|*.test.ts)",
              message:
                "Domain層でApplication層をimportしてはいけません。ドメインロジックはアプリケーションの詳細から独立している必要があります",
            },
          ],
        },
      ],
    },
  },
);
