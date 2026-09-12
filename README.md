# Pipeline de Integração Contínua

Projeto acadêmico da disciplina de DevOps (Fatec — Prof. Me. Deivison S. Takatu),
cujo objetivo é aplicar **3 Actions do GitHub Marketplace** em uma pipeline de
CI/CD automatizada, organizada em **múltiplas pipelines independentes**, cada
uma com seus próprios processos (jobs).

O projeto é um pequeno site estático (HTML/CSS/JS) usado apenas como aplicação
de exemplo para demonstrar o funcionamento da pipeline.

## Arquitetura da pipeline

Em vez de um único workflow gigante, a pipeline foi dividida em **3 pipelines
(arquivos de workflow)**, cada uma responsável por um grupo de etapas do ciclo
de entrega — mesma lógica apresentada no material da disciplina (Build → Test
→ Quality → Security → Package → Deploy), porém separada em arquivos distintos:

```
.github/workflows/
├── build-test.yml          → Pipeline de Build e Testes
│     ├── job: build
│     └── job: test   (depende do build)
│
├── quality-security.yml    → Pipeline de Qualidade e Segurança
│     ├── job: quality
│     └── job: security
│
└── package-deploy.yml      → Pipeline de Artefatos e Deploy
      ├── job: package
      └── job: deploy (depende do package)
```

Todas as 3 pipelines são disparadas automaticamente a cada `push` na branch
`main` (as duas primeiras também em `pull_request`), assim como no exemplo do
repositório usado como referência (`Isadora-Correa/Pipeline-Devops`), em que
cada `push` dispara a execução completa e qualquer falha interrompe o fluxo.

## As 3 Actions do GitHub Marketplace utilizadas

| Action | Etapa (job) | Função | Como contribui para a automação |
|---|---|---|---|
| **actions/setup-node** | Build, Test, Quality, Package, Deploy | Instala e configura a versão do Node.js no runner, com cache de dependências | Garante que todos os jobs rodem no mesmo ambiente padronizado, sem precisar instalar o Node manualmente em cada etapa |
| **aquasecurity/trivy-action** | Security | Escaneia o código-fonte e as dependências em busca de vulnerabilidades conhecidas (CVEs) | Automatiza a verificação de segurança, identificando riscos antes que o artefato avance para o deploy |
| **peaceiris/actions-gh-pages** | Deploy | Publica automaticamente o conteúdo gerado (pasta `dist/`) no GitHub Pages | Automatiza a publicação do artefato validado em um ambiente real, acessível publicamente, sem intervenção manual |

Além dessas 3, o projeto também usa Actions oficiais e básicas do GitHub
(`actions/checkout`, `actions/upload-artifact`, `actions/download-artifact`)
para clonar o repositório e passar o artefato de build entre jobs — elas não
contam como as "3 Actions escolhidas", pois são utilitárias e usadas em
praticamente qualquer pipeline.

## Processos (jobs) de cada pipeline

1. **Build** — instala dependências e gera a pasta `dist/` (artefato).
2. **Test** — baixa o artefato do Build e roda os testes automatizados
   (`node --test`), validando se o `index.html` e o `style.css` foram gerados
   corretamente.
3. **Quality** — roda o ESLint sobre o código JavaScript, verificando padrões
   de qualidade.
4. **Security** — roda o Trivy para identificar vulnerabilidades no
   código/dependências.
5. **Package** — gera o build final e o empacota como artefato versionado.
6. **Deploy** — publica o artefato empacotado no GitHub Pages.

Se qualquer job falhar, os jobs seguintes que dependem dele (`needs:`) não são
executados — mesma regra de "falhou, para tudo" do material da disciplina.

## Como rodar localmente

```bash
npm install
npm run build   # gera a pasta dist/
npm test        # roda os testes
npm run lint    # roda o ESLint
```

## Referências

- HUMBLE, J.; PRIKLANDNICKI, R. **Entrega Contínua: Como Entregar Software de
  Forma Rápida e Confiável.** São Paulo: Bookman, 2013.
- MUNIZ, A. et al. **Jornada DevOps: Unindo Cultura Ágil, Lean e Tecnologia
  Para Entrega de Software Com Qualidade.** São Paulo: Brasport, 2019.
- SATO, D. **DevOps na Prática: Entrega de Software Confiável e
  Automatizada.** São Paulo: Casa do Código, 2014.
- SILVA, R. **Entrega Contínua em Android: Como Automatizar a Distribuição de
  Apps.** São Paulo: Casa do Código, 2016.
- ARUNDEL, J.; DOMINGUS, J. **DevOps Nativo de Nuvem com Kubernetes.** São
  Paulo: Novatec, 2019.
- MORAES, G. **Caixa de Ferramentas DevOps: Um Guia para Construção,
  Administração e Arquitetura de Sistemas Modernos.** São Paulo: Casa do
  Código, 2015.
- PIRES, A.; MILITÃO, J. **Integração Contínua com Jenkins.** São Paulo: Casa
  do Código, 2019.
- VITALINO, J. F. N.; CASTRO, M. A. N. **Descomplicando o Docker.** 2. ed.
  São Paulo: Brasport, 2018.
- SILVERMAN, R. E. **Git: Guia Prático.** São Paulo: Novatec, 2019.
- KIM, G.; HUMBLE, J.; DEBOIS, P.; WILLIS, J. **Manual de DevOps: Como Obter
  Agilidade, Confiabilidade e Segurança em Organizações Tecnológicas.** São
  Paulo: Starlin Alta Editora, 2018.
