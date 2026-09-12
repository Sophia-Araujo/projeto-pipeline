const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');

function build() {
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  fs.mkdirSync(distDir, { recursive: true });

  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    fs.copyFileSync(path.join(srcDir, file), path.join(distDir, file));
  }

  const buildInfo = `Build gerado em: ${new Date().toISOString()}\n`;
  fs.writeFileSync(path.join(distDir, 'build-info.txt'), buildInfo);

  console.log('Build concluído com sucesso. Artefato disponível em /dist');
}

build();
