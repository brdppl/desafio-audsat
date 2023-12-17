# Desafio Técnico - Frontend

### Instalação com Docker

Certifique-se que você tem o [Docker](https://www.docker.com/get-started/) instalado na sua máquina.

Para rodar o projeto basta clonar o repositório e executar os seguintes comandos no terminal:

```console
> cd desafio-audsat
> docker compose up -d
```

Acesse através da URL `http://localhost:4200` no seu navagador.

### Instalação sem Docker

Este projeto foi desenvolvido utilzando o [Angular CLI](https://angular.io/cli) 16.1.1

Caso não tenha instalado em sua máquina, execute o comando `npm install -g @angular/cli` no seu terminal.

Para rodar o projeto basta clonar o repositório e executar os seguintes comandos no terminal:

```console
> cd desafio-audsat
> yarn install
> yarn start
```

Acesse através da URL `http://localhost:4200` no seu navagador.

### Testes unitários

Para rodar os testes unitários do frontend, basta abrir o terminal e executar os seguintes comandos:

```console
> cd desafio-audsat
> yarn test
```

Ou para ver a cobertura

```console
> cd desafio-audsat
> yarn test:coverage
```

### Lint

Para rodar o lint no frontend, basta abrir o terminal e executar os seguintes comandos:

```console
> cd desafio-audsat
> yarn lint
```
