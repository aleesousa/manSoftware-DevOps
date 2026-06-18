# MAN Software DevOps

Projeto acadêmico desenvolvido para a disciplina de DevOps utilizando Docker.

## Pré-requisitos

* Docker
* Docker Compose
* Git

## Clonar o projeto

```bash
git clone https://github.com/aleesousa/manSoftware-DevOps.git
cd manSoftware-DevOps
```

## Iniciar o ambiente

```bash
docker compose up --build -d
```

## Acessar a aplicação

Após os containers iniciarem, acesse:

```text
http://localhost:8080
```

```text
http://localhost:3000
```

## Comandos úteis

### Ver containers em execução

```bash
docker compose ps
```


### Parar o ambiente

```bash
docker compose down
```

