# API de Usuários

API REST para gerenciamento de usuários, desenvolvida para uso em aplicativos mobile.

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize
- SQLite
- JWT para autenticação
- Swagger para documentação

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Inicie o servidor:
```bash
npm run dev
```

## Documentação

A documentação da API está disponível em `/api-docs` quando o servidor estiver rodando.

## Endpoints

- `POST /api/register` - Registro de usuário
- `POST /api/login` - Login
- `GET /api/me` - Obter dados do usuário
- `PUT /api/me` - Atualizar dados do usuário
- `DELETE /api/users/:id` - Deletar usuário
- `POST /api/logout` - Logout

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
PORT=3000
NODE_ENV=development
```

## Deploy

Esta API está configurada para deploy no Render.com. Para fazer o deploy:

1. Crie uma conta no [Render](https://render.com)
2. Crie um novo Web Service
3. Conecte com seu repositório GitHub
4. Configure as variáveis de ambiente necessárias
5. Deploy! 