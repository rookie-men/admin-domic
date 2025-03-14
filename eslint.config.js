import globals from 'globals'
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginRouter from '@tanstack/eslint-plugin-router'
import gitignore from 'eslint-config-flat-gitignore'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import pluginPromise from 'eslint-plugin-promise'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  gitignore(),
  { ignores: ['src/routeTree.gen.ts'] },
  {
    extends: [
      {
        languageOptions: {
          parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
          },
          ecmaVersion: 'latest',
          sourceType: 'module',
          globals: {
            ...globals.builtin,
            ...globals.browser,
          },
        },
      },
      ...tseslint.configs.strictTypeChecked,
      ...pluginQuery.configs['flat/recommended'],
      pluginPromise.configs['flat/recommended'],
      pluginRouter.configs['flat/recommended'],
      eslintPluginUnicorn.configs.recommended,
      eslintPluginPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-console': 'error',
      'unicorn/prevent-abbreviations': 'off',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  }
)
