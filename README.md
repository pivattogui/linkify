# URL Shortener

Encurtador de URLs simples e eficaz que permite transformar links longos em versões curtas e fáceis de compartilhar. Ideal para redes sociais, mensagens de texto, e qualquer lugar onde o espaço é limitado.

## Funcionalidades

- **Encurtamento de Links**: Converta URLs longas em links curtos e gerenciáveis.
- **Acesso Rápido**: Links curtos que redirecionam rapidamente para a URL original.
- **Registro de URLs**: Armazena URLs originais e seus links encurtados para fácil recuperação.
- **Interface Simples**: Fácil de usar, tanto em aplicativos da web quanto em dispositivos móveis.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **TypeScript**: Linguagem de programação que traz tipagem estática ao JavaScript.
- **Express**: Framework para construir APIs em Node.js.
- **Prisma**: ORM (Object-Relational Mapping) para interagir com o banco de dados.
- **UUID**: Biblioteca para gerar identificadores únicos para links.

## Como Usar

### Pré-requisitos

- Node.js instalado na sua máquina.
- Um banco de dados (MySQL ou outro de sua escolha) configurado.

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/pivattogui/url-short.git
   cd url-short
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure seu banco de dados:

- Crie um arquivo .env na raiz do projeto e adicione a URL do banco de dados:


   ```env
    DATABASE_URL="mysql://user:password@localhost:3306/url-short"
   ```

4. Execute as migrações do Prisma:

   ```bash
   npx prisma migrate dev
   ```

5. Gere o cliente Prisma:
   ```bash
   npx prisma generate
   ```

### Execução

Para iniciar o servidor, use:

   ```bash
      npm run dev
   ```

O servidor estará rodando em `http://localhost:3000`.

### Endpoints

- **POST /shorten**: Encurta uma URL.
  Exemplo de requisição:

  ```json
  {
    "url": "https://www.google.com"
  }
  ```

  Exemplo de resposta:

  ```json
  {
    "originalUrl": "https://www.google.com",
    "shortUrl": "http://localhost:3000/abc123"
  }
  ```

- **GET /:shortUrl**: Redireciona para a URL original.
