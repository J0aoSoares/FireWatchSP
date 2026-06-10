# 🛰️🔥 FireWatch SP — Monitoramento Orbital de Queimadas

**Global Solution 2026 — Exploração Espacial e Soluções para a Terra**
**Disciplina:** Mobile Development e IoT · **Curso:** Engenharia de Software (3º ano) — FIAP

---

## 📌 Descrição da solução

O **FireWatch SP** conecta a **exploração espacial** a um problema real aqui na Terra: as **queimadas na Grande São Paulo**.

Satélites de observação terrestre (Suomi NPP, NOAA-20, Aqua e Terra) carregam os sensores **VIIRS** e **MODIS**, que detectam focos de calor na superfície e disponibilizam essas detecções por meio do programa **NASA FIRMS**. O aplicativo apresenta esses dados ao cidadão de forma acessível e permite que ele **contribua com relatos locais** (ciência cidadã), ajudando a validar as detecções orbitais.

A solução está alinhada à **ODS 13 (Ação Contra a Mudança Global do Clima)** e se integra ao projeto de **Big Data (BDDI)** do mesmo grupo, que implementa o pipeline de ingestão (NASA FIRMS + OpenWeather), transformação (Pandas), armazenamento (esquema estrela em Oracle/SQLite) e orquestração (Apache Airflow). O app mobile é a **camada de visualização e participação cidadã** dessa mesma arquitetura — nesta entrega, os dados de detecção são simulados localmente seguindo fielmente o formato dos campos reais da API FIRMS (`latitude`, `longitude`, `brightness`, `frp`, `confidence`, `satellite`, `instrument`, `acq_date`, `acq_time`).

### Funcionalidades

| Tela | Função |
|---|---|
| **Login** | Autenticação com credenciais de teste; sessão persistida em AsyncStorage |
| **Painel orbital** | Estatísticas agregadas das detecções (focos ativos, FRP médio, última passagem) |
| **Focos de calor** | Lista de detecções com filtro por status (ativo, monitoramento, controlado, extinto) |
| **Detalhe do foco** | Telemetria completa do satélite + botão "Acompanhar" (favorito persistido) |
| **Relatar queimada** | Formulário de ciência cidadã com criação, listagem e exclusão de relatos (AsyncStorage) |
| **Perfil & Sobre** | Dados da sessão, contexto do projeto e logout |

**Total: 6 telas navegáveis** (React Navigation — stack raiz + bottom tabs + stack aninhada).

---

## 👥 Integrantes

| Nome completo | RM |
|---|---|
| NOME DO INTEGRANTE 1 | RM000000 |
| NOME DO INTEGRANTE 2 | RM000000 |
| NOME DO INTEGRANTE 3 | RM000000 |
| NOME DO INTEGRANTE 4 | RM000000 |
| NOME DO INTEGRANTE 5 | RM000000 |

> ⚠️ Substituir pelos nomes e RMs reais do grupo antes da entrega.

---

## ▶️ Instruções para rodar o projeto

Pré-requisitos: **Node.js LTS** e o app **Expo Go** no celular (ou um emulador Android/iOS).

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o projeto
npx expo start
```

Depois, escaneie o QR Code com o **Expo Go** (Android) ou com a câmera (iOS), ou pressione `a`/`i` no terminal para abrir no emulador.

---

## 🔑 Usuário e senha de teste para avaliação

| Campo | Valor |
|---|---|
| **Login** | `fiap@teste.com` |
| **Senha** | `123456` |

---

## 🧱 Requisitos técnicos atendidos

- ✅ **Mínimo de 5 telas navegáveis** — 6 telas com **React Navigation** (native-stack + bottom-tabs)
- ✅ **Persistência com AsyncStorage** — sessão de login, relatos do cidadão (criar/listar/excluir) e focos favoritados
- ✅ **Estilização personalizada** — identidade visual própria com tema "observação orbital noturna": fundo azul-espaço, laranja-brasa para fogo/ações e ciano para telemetria de satélite (tokens centralizados em `src/theme/theme.js`)
- ✅ **Organização clara** — separação por responsabilidade: `screens/`, `components/`, `services/`, `data/`, `theme/`

---

## 📂 Estrutura de arquivos

```
firewatch-sp/
├── App.js                          # Navegação (stack raiz + tabs) e restauração de sessão
├── index.js                        # Ponto de entrada Expo
├── app.json                        # Configuração do Expo
├── babel.config.js
├── package.json
└── src/
    ├── components/
    │   └── ui.js                   # FocoCard, StatCard, StatusBadge, PrimaryButton, DetailRow
    ├── data/
    │   └── focos.js                # Detecções simuladas no formato NASA FIRMS
    ├── screens/
    │   ├── LoginScreen.js          # Tela 1 — Login
    │   ├── HomeScreen.js           # Tela 2 — Painel orbital
    │   ├── FocosScreen.js          # Tela 3 — Lista de focos
    │   ├── FocoDetalheScreen.js    # Tela 4 — Detalhe do foco
    │   ├── RelatarScreen.js        # Tela 5 — Relatar queimada
    │   └── PerfilScreen.js         # Tela 6 — Perfil & Sobre
    ├── services/
    │   └── storage.js              # Camada de persistência (AsyncStorage)
    └── theme/
        └── theme.js                # Tokens de design (cores, espaçamento, tipografia)
```

---

## 🌎 Conexão com o tema espacial (Global Solution 2026)

A solução utiliza **infraestrutura espacial real** (constelações de satélites de observação da Terra) como fonte primária de dados para enfrentar um problema ambiental concreto — exatamente a proposta do desafio: *transformar conhecimento espacial em algo aplicável, relevante e inovador para a Terra*.
