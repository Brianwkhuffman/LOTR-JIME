import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';

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
      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
      'keyword-spacing': ['warn', { before: true, after: true }],
      'comma-spacing': ['warn', { before: false, after: true }],
      'object-curly-spacing': ['warn', 'always'],
      'space-before-blocks': ['warn', 'always'],
      'eqeqeq': ['warn', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
      'no-debugger': 'error',
      // End file with newline
      'eol-last': ['warn', 'always']
    }
  },
  pluginVue.configs['flat/essential'],
  {
    rules: {
      'vue/html-indent': ['warn', 2],
      'vue/html-self-closing': ['warn', { html: { void: 'never', normal: 'always' } }],
      'vue/attribute-hyphenation': ['warn', 'always'],
      'object-curly-spacing': ['warn', 'always'],
      'vue/object-curly-spacing': ['warn', 'always']
    }
  },
  { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  { files: ['**/*.md'], plugins: { markdown }, language: 'markdown/commonmark', extends: ['markdown/recommended'] },
  { files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'] }
]);
