import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import {defineConfig} from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      semi: ['warn', 'always'],
      quotes: ['warn', 'single', { avoidEscape: true }],
      indent: ['warn', 2],
      'no-trailing-spaces': 'warn',
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
      'keyword-spacing': ['warn', { before: true, after: true }],
      'comma-spacing': ['warn', { before: false, after: true }],
      'comma-dangle': ['warn', 'never'],
      'object-curly-spacing': ['warn', 'always'],
      'array-bracket-spacing': ['warn', 'never'],
      'space-before-blocks': ['warn', 'always'],
      'space-in-parens': ['warn', 'never'],
      'eqeqeq': ['warn', 'always'],
      "no-console": ["warn", { allow: ["warn", "error", "log"] }],
      'no-debugger': 'error',
      'curly': ['warn', 'all'],
      'no-duplicate-imports': 'warn',

      // End file with newline
      'eol-last': ['warn', 'always']
    }
  },
  pluginVue.configs['flat/essential'],
  { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  {
    files: ['**/*.vue'],
    rules: {
      // Vue template & script style
      'vue/html-indent': ['warn', 2],
      'vue/max-attributes-per-line': ['warn', { singleline: 3, multiline: 1 }],
      'vue/multiline-html-element-content-newline': 'warn',
      'vue/html-self-closing': ['warn', { html: { void: 'never', normal: 'always' } }],
      'vue/attribute-hyphenation': ['warn', 'always'],
      'vue/prop-name-casing': ['warn', 'camelCase']
    }
  },
  { files: ['**/*.md'], plugins: { markdown }, language: 'markdown/commonmark', extends: ['markdown/recommended'] },
  { files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'] }
]);
