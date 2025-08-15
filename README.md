# ⚽ Champions League API

API REST desenvolvida em **Node.js** com **Express** para gerenciar e consultar dados de jogadores e clubes participantes da Champions League.  
O projeto possui endpoints para **listar, buscar, cadastrar, atualizar e excluir jogadores**, além de **listar clubes**.

---

## 📋 Funcionalidades

- **Jogadores**
  - Listar todos os jogadores
  - Buscar jogador por ID
  - Cadastrar novo jogador
  - Atualizar dados de um jogador
  - Excluir jogador
- **Clubes**
  - Listar todos os clubes cadastrados

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** + **TypeScript**
- **Express.js**
- **Banco de dados em JSON** (arquivos locais simulando persistência)

---

## 📂 Estrutura de Pastas

├── src <br>
│   ├── application.ts        # Configuração principal do Express<br>
│   ├── server.ts              # Inicialização do servidor<br>
│   ├── routes<br>
│   │   └── index.ts           # Definição das rotas da API<br>
│   ├── controllers<br>
│   │   ├── players-controller.ts<br>
│   │   └── clubs-controller.ts<br>
│   ├── database<br>
│   │   ├── players.json       # Banco de dados de jogadores<br>
│   │   └── clubs.json         # Banco de dados de clubes<br>

---

## 🚀 Como Executar o Projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seu-usuario/champions-league-api.git
cd champions-league-api
````

### 2️⃣ Instalar as dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
```

### 4️⃣ Executar o servidor

```bash
npm run dev
```

> O servidor estará disponível em: `http://localhost:3000`

---

## 📌 Endpoints da API

### **Jogadores**

#### 🔹 Listar todos os jogadores

```http
GET /players
```

**Exemplo de resposta:**

```json
[
  {
    "id": 1,
    "name": "Lionel Messi",
    "club": "Paris Saint-Germain",
    "nationality": "Argentina",
    "position": "Forward",
    "statistics": {
      "Overall": 93,
      "Pace": 85,
      "Shooting": 94,
      "Passing": 91,
      "Dribbling": 95,
      "Defending": 38,
      "Physical": 65
    }
  }
]
```

#### 🔹 Buscar jogador por ID

```http
GET /players/:id
```

#### 🔹 Cadastrar novo jogador

```http
POST /players
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Cristiano Ronaldo",
  "club": "Al Nassr",
  "nationality": "Portugal",
  "position": "Forward",
  "statistics": {
    "Overall": 91,
    "Pace": 84,
    "Shooting": 93,
    "Passing": 82,
    "Dribbling": 88,
    "Defending": 35,
    "Physical": 77
  }
}
```

#### 🔹 Atualizar jogador

```http
PATCH /players/:id
```

**Body:**

```json
{
  "club": "Manchester United"
}
```

#### 🔹 Excluir jogador

```http
DELETE /players/:id
```

---

### **Clubes**

#### 🔹 Listar todos os clubes

```http
GET /clubs
```

**Exemplo de resposta:**

```json
[
  { "id": 1, "name": "Real Madrid" },
  { "id": 2, "name": "Paris Saint-Germain" }
]
```

---

## 📜 Licença

Este projeto está sob a licença **MIT**.
Você é livre para usá-lo e modificá-lo.

---
