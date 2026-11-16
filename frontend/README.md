# RotaApta — Frontend

React + Vite, com páginas, componentes reutilizáveis, estilos e chamadas HTTP organizadas.
O frontend lê os registros do Oracle **pela API Java existente**. Nenhuma senha ou conexão direta com o Oracle fica no navegador. Não há dados fictícios na aplicação.

## Instalação

1. Extraia este ZIP. Ele contém somente uma pasta `frontend`.
2. Se houver uma pasta `frontend` anterior, renomeie-a para `frontend-anterior` para guardar uma cópia. Coloque a nova pasta `frontend` ao lado do `pom.xml` do projeto Java. Use a pasta completa, incluindo `package.json`, `vite.config.js`, `.env` e `src`.
3. Inicie seu backend Java normalmente na sua IDE e aguarde a inicialização terminar com sucesso.
4. Abra um terminal **dentro de `frontend`** e execute:

```bash
npm install
npm run dev
```

Abra o endereço mostrado pelo Vite. Use Node.js 22.12 ou superior.

## Endereço do Java

O arquivo `.env` já contém:

```dotenv
BACKEND_URL=http://localhost:8080
```

Se o seu Java usar outra porta, altere esse valor e reinicie `npm run dev`. Se houver um caminho de contexto, inclua-o, por exemplo `http://localhost:8080/rotaapta`. Não coloque credenciais do banco neste arquivo.

O React chama `/api/pontos`, por exemplo, e o proxy do Vite encaminha para `http://localhost:8080/pontos`. Ele também funciona no preview local. A configuração de produção precisa de um encaminhamento equivalente de `/api` para o Java e de fallback para `index.html` nas URLs do React.

Para verificar o endereço e as seis consultas sem alterar o Java ou o banco:

```bash
npm run check:api
```

Um erro 502 significa que o encaminhamento não conseguiu completar a chamada ao Java. A interface não consegue iniciar o Java nem corrigir sua conexão com o Oracle; o backend precisa estar executando com sucesso. O comando acima identifica quais endpoints respondem e quantos registros retornam, sem imprimir os dados pessoais dos usuários.

## Telas

| Página | Dados e operações |
|---|---|
| Rotas | Consulta `/rotas` e `/pontos`; filtra os percursos cadastrados por origem e destino. |
| Detalhes da rota | Exibe distância, acessibilidade e status salvos, além dos trechos em `/rotas-trechos` e `/trechos`. |
| Registrar obstáculo | Seleciona usuário e trecho existentes; envia `POST /obstaculos`. |
| Meus relatos | Filtra `/obstaculos` pelo usuário selecionado; atualiza o status com `PUT /obstaculos/{id}`. |

O mapa usa as coordenadas de `/pontos`, Leaflet e OpenStreetMap. O traçado é esquemático: o backend fornece os extremos dos trechos, não a geometria completa das ruas. Obstáculos são representados aproximadamente no meio do trecho associado. A base cartográfica precisa de internet, mas a consulta dos registros depende da API Java.

As rotas exibidas vêm de `/rotas`; a interface não inventa nem calcula novos percursos. A ausência de registros gera um estado vazio. Falhas de conexão exibem a rota da API e o erro, preservando o layout e os formulários. Consultas independentes não bloqueiam umas às outras.

O backend não tem autenticação: o seletor de usuário identifica o autor do relato, mas não é login nem controle de acesso. Use os usuários cadastrados na sua base. Não foi adicionada uma tela de cadastro de usuário porque a API atual recebe `senhaHash` e não oferece um fluxo de autenticação.

O cadastro de obstáculo envia os oito campos exigidos pelo DTO e só mostra sucesso após a resposta da API. O Java exige ID informado pelo cliente; esta interface usa um inteiro positivo aleatório de 31 bits. Se houver colisão, o erro é exibido e um novo envio gera outro ID. O banco pode ter regras adicionais não incluídas no ZIP. Para concorrência em produção, geração de IDs e autorização devem ser responsabilidades do backend.

## Estrutura

| Pasta/arquivo | Responsabilidade |
|---|---|
| `src/pages/` | As quatro páginas |
| `src/components/` | Cabeçalho, layout, mapa, título, relato e aviso de dados |
| `src/context/DadosContext.jsx` | Carregamento dos recursos e usuário selecionado |
| `src/services/api.js` | Requisições e tratamento de JSON, texto e erros |
| `src/utils/` | Formatação e montagem dos trechos salvos |
| `src/styles/` | Tema e layout responsivo |
| `src/assets/` | Logo |
| `src/App.jsx` | Rotas da interface |
| `src/main.jsx` | Inicialização e importação dos estilos |

## Verificação

```bash
npm test
npm run build
```

Os testes de interface usam respostas de teste separadas do código da aplicação, compatíveis com os controllers e DTOs do ZIP. Eles verificam consultas, filtros, falha 502, cadastro e atualização. O build verifica os imports e gera `dist`. A conexão com o seu Java e Oracle deve ser confirmada localmente com `npm run check:api`.

Nenhum arquivo Java, `pom.xml` ou `application.properties` acompanha esta entrega ou foi modificado.
