const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

test('a pasta dist deve existir após o build', () => {
  assert.strictEqual(fs.existsSync(distDir), true);
});

test('o arquivo index.html deve existir no build', () => {
  const indexPath = path.join(distDir, 'index.html');
  assert.strictEqual(fs.existsSync(indexPath), true);
});

test('o index.html deve conter o título da pipeline', () => {
  const indexPath = path.join(distDir, 'index.html');
  const content = fs.readFileSync(indexPath, 'utf-8');
  assert.match(content, /Pipeline de Integração Contínua/);
});

test('o arquivo style.css deve existir no build', () => {
  const cssPath = path.join(distDir, 'style.css');
  assert.strictEqual(fs.existsSync(cssPath), true);
});
