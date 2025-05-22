# API de Usuários

Uma API REST para gerenciamento de usuários em aplicações móveis.

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize
- SQLite
- JWT para autenticação
- Swagger para documentação

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/user-api.git
cd user-api
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
PORT=3000
JWT_SECRET=sua_chave_secreta
```

4. Inicie o servidor:
```bash
npm run dev
```

## Documentação

A documentação da API está disponível em `/api-docs` quando o servidor estiver rodando.

## Endpoints

### Autenticação

- `POST /auth/register` - Registro de novo usuário
- `POST /auth/login` - Login de usuário
- `POST /auth/logout` - Logout de usuário

### Usuários

- `GET /users/me` - Obter dados do usuário logado
- `PUT /users/me` - Atualizar dados do usuário
- `DELETE /users/me` - Deletar usuário

## Variáveis de Ambiente

- `PORT` - Porta em que o servidor irá rodar (padrão: 3000)
- `JWT_SECRET` - Chave secreta para geração de tokens JWT

## Deploy

Esta API está configurada para ser facilmente deployada no Render.com:

1. Crie uma conta no [Render.com](https://render.com)
2. Crie um novo Web Service
3. Conecte com seu repositório GitHub
4. Configure as variáveis de ambiente
5. Deploy! 