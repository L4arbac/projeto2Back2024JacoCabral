# Sistema de Vendas de Cafés

Este é um sistema de gestão de vendas de cafés que permite gerenciar os produtos (cafés e ingredientes), os usuários e as vendas realizadas. O sistema oferece funcionalidades básicas de CRUD (Create, Read, Update, Delete) para cada uma das entidades principais, além de algumas funções especiais para análises e operações específicas.

## Funcionalidades

### Gestão de Cafés
As rotas para a gestão de cafés permitem a criação, visualização, atualização e exclusão de registros de cafés:

- **POST `/cafe`**: Cria um novo café.
- **GET `/cafe`**: Lista todos os cafés.
- **GET `/cafe/:id`**: Recupera os detalhes de um café específico.
- **PUT `/cafe/:id`**: Atualiza as informações de um café existente.
- **DELETE `/cafe/:id`**: Exclui um café pelo seu ID.

### Gestão de Ingredientes
As rotas de ingredientes permitem a criação e manipulação dos ingredientes usados nos cafés:

- **POST `/ingrediente`**: Cria um novo ingrediente.
- **PUT `/ingrediente/:id`**: Atualiza um ingrediente existente.
- **GET `/ingrediente`**: Lista todos os ingredientes.
- **GET `/ingrediente/:id`**: Recupera os detalhes de um ingrediente específico.
- **DELETE `/ingrediente/:id`**: Exclui um ingrediente pelo seu ID.

### Gestão de Usuários
As rotas para usuários incluem tanto o gerenciamento de usuários quanto a autenticação:

- **POST `/login`**: Realiza o login de um usuário, gerando um token de autenticação.
- **POST `/users`**: Cria um novo usuário.
- **PUT `/users/:id`**: Atualiza as informações de um usuário existente.
- **GET `/users`**: Lista todos os usuários.
- **GET `/users/:id`**: Recupera os detalhes de um usuário específico.
- **DELETE `/users/:id`**: Exclui um usuário pelo seu ID.
- **PUT `/makeAdm/:id`**: Promove um usuário a administrador.

### Gestão de Vendas
As rotas de vendas permitem o controle das transações realizadas no sistema:

- **POST `/venda`**: Cria uma nova venda associando cafés e quantidades a um usuário.
- **GET `/venda`**: Lista todas as vendas realizadas.
- **GET `/venda/:id`**: Recupera os detalhes de uma venda específica.
- **PUT `/venda/:id`**: Atualiza uma venda existente.
- **DELETE `/venda/:id`**: Exclui uma venda pelo seu ID.

### Funções Especiais
Além das operações CRUD padrão, o sistema possui funções especiais para gerar relatórios e análises:

- **GET `/balanco`**: Gera um balanço financeiro das vendas.
- **GET `/rank`**: Gera um ranking dos cafés mais vendidos.

### Instalação
Para executar o sistema, uma rota especial foi criada:

- **GET `/install`**: Executa o script de instalação/configuração inicial do sistema.

## Como Executar

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/seu-repositorio.git
    cd seu-repositorio
    ```

2. **Instale as dependências**:
    ```bash
    npm install
    ```

3. **Configure o banco de dados**: Altere as configurações de banco de dados no arquivo `.env`.

4. **Execute o sistema**:
    ```bash
    npm start
    ```

5. **Instale o sistema** (opcional, se aplicável):
    - Acesse a rota `/install` para executar o script de instalação, se necessário.

## Licença

Este projeto é licenciado sob os termos da [MIT License](LICENSE).
