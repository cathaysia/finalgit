import jsPlugin from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import storybookPlugin from 'eslint-plugin-storybook';
import globals from 'globals';
import tsEslintPlugin from 'typescript-eslint';

export default [
  {
    ignores: [
      'src/components/ui/*',
      'src-tauri/**',
      '**/dist/**',
      'tailwind.config.ts',
      'vite.config.ts',
      'src/parser/impl/**',
      'src/routeTree.gen.ts',
      '**/out/**',
      '**/node_modules/**',
      '**/.next/**',
      'src/lib/parser/*.ts',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.browser,
      },
    },
  },
  jsPlugin.configs.recommended,
  ...storybookPlugin.configs['flat/recommended'],
  ...tsEslintPlugin.configs.recommended,
  {
    files: ['src/*.{js,ts,tsx,jsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      '@next/next': nextPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...hooksPlugin.configs.recommended.rules,
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      // 'react/display-name': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
];
