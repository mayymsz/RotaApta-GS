
# RotaApta

O **RotaApta** é uma plataforma web desenvolvida para auxiliar pessoas com mobilidade reduzida, especialmente cadeirantes, a consultar trajetos urbanos e informações sobre acessibilidade.

A aplicação permite visualizar rotas, consultar informações dos percursos e registrar obstáculos urbanos, contribuindo para uma mobilidade mais acessível e inclusiva.

Projeto desenvolvido para a **Global Solution 2026 da FIAP**, com o tema **CitizenTech**.

## Funcionalidades

- Consulta de rotas por origem e destino.
- Visualização dos percursos em mapa interativo.
- Exibição de distância e indicadores de acessibilidade.
- Consulta de obstáculos associados aos trajetos.
- Registro de obstáculos urbanos.
- Visualização de relatos e atualização de seus status.
- Integração entre frontend, API RESTful e banco de dados Oracle.

> **Nota:** Os dados de rotas, obstáculos e acessibilidade utilizados na demonstração são simulados e não representam medições reais das condições urbanas.

## Tecnologias Utilizadas

| Camada | Tecnologias |
|---|---|
| Backend | Java 21, Spring Boot, Spring Data JPA |
| Frontend | React, JavaScript, Vite |
| Banco de dados | Oracle Database |
| Gerenciamento de dependências | Maven |
| Versionamento | Git e GitHub |
| Deploy | Docker e Render |

## Estrutura do Projeto

O RotaApta utiliza uma API RESTful desenvolvida com Spring Boot, organizada em:

- **Entity:** representação das entidades do banco de dados.
- **DTO:** transferência e validação dos dados.
- **Repository:** persistência utilizando JpaRepository.
- **Controller:** gerenciamento das requisições HTTP GET, POST, PUT e DELETE.

O frontend React está integrado ao Spring Boot, permitindo que toda a aplicação seja disponibilizada em um único serviço.

## Como Executar Localmente

### Pré-requisitos

- Java JDK 21
- IntelliJ IDEA
- Acesso ao Oracle Database da FIAP
- Maven (o projeto inclui Maven Wrapper)

### Passo 1 — Clonar o repositório

```bash
git clone https://github.com/mayymsz/RotaApta-GS.git
```

### Passo 2 — Abrir o projeto

Abra a pasta do projeto no IntelliJ IDEA e aguarde o carregamento das dependências Maven.

### Passo 3 — Configurar o Oracle

Configure as seguintes variáveis de ambiente:

| Variável | Descrição |
|---|---|
| `DB_URL` | URL de conexão com o Oracle |
| `DB_USERNAME` | Usuário do banco de dados |
| `DB_PASSWORD` | Senha de acesso ao banco |

As credenciais devem ser configuradas no ambiente de execução e não devem ser incluídas no código-fonte.

### Passo 4 — Executar a aplicação

No IntelliJ IDEA, execute a classe principal:

`src/main/java/br/com/fiap/RotaaptaApplication.java`

### Passo 5 — Acessar o sistema

Após a inicialização do Spring Boot, acesse:

http://localhost:8080/

O frontend compilado está integrado ao backend em `src/main/resources/static`, portanto não é necessário iniciar o React separadamente para utilizar a versão integrada.

## Deploy

O RotaApta está publicado no Render, utilizando Docker para executar o Spring Boot com o frontend React integrado.

**Acesse a aplicação:**

https://rotaapta-gs.onrender.com

## Equipe

| Integrante | RM |
|---|---|
| Arthur Canaverde da Cruz | 563029 |
| Isabella Jardim Marques | 566470 |
| Mayene Moura da Silva | 564624 |
| Murilo Canéstri dos Reis | 564053 |

---

**FIAP - Engenharia de Software | Global Solution 2026**
