# Garupa Bank

![GitHub](https://img.shields.io/github/license/seu-usuario/garupa-bank)
![Docker](https://img.shields.io/badge/Docker-✓-blue)
![Node.js](https://img.shields.io/badge/Node.js-✓-green)
![TypeScript](https://img.shields.io/badge/TypeScript-✓-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-✓-blue)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-✓-orange)
![Vue.js](https://img.shields.io/badge/Vue.js-✓-brightgreen)

**Garupa Bank**

## O projeto foi feito com a estrutura em containers Docker e é estruturado como um monorepo. Este projeto inclui vários serviços interconectados, como uma API, banco de dados, mock de uma API externa, fila de mensagens e um frontend. Abaixo estão as instruções para configurar e rodar o ambiente de desenvolvimento.

## Tecnologias Utilizadas

- **Node.js** e **TypeScript** para o desenvolvimento da API.
- **PostgreSQL** como banco de dados.
- **WireMock** para simulação de uma API externa.
- **RabbitMQ** para gerenciamento de filas de mensagens.
- **Vue.js** no frontend (WebApp).
- **Docker** e **Docker Compose** para facilitar a execução de todos os serviços em containers.
- **Monorepo** para organizar múltiplos serviços no mesmo repositório.

## Estrutura do Projeto

O projeto segue uma estrutura de monorepo, com cada serviço dentro de uma pasta separada. Abaixo está a lista de serviços incluídos:

- **server**: API backend utilizando Node.js, TypeScript, Design Patterns (Template Method, SOLID, Factory Functions).
- **wiremock**: Serviço para mockar uma API externa.
- **consumer-work**: Consumidor da fila RabbitMQ que interage com o serviço mock de API e retorna os resultados para a API.
- **webapp**: Frontend da aplicação.

Cada serviço possui seu próprio Dockerfile para construção da imagem individual e um script para gerar e rodar as imagens de forma independente.

## Requisitos

- **Docker** (com Docker Compose) instalado.
- **Node.js**

## Instalação e Execução

### 1. Clonar o Repositório

Primeiro, clone este repositório para sua máquina local:

```bash
git clone https://github.com/erikwtg/garupa-bank.git
cd garupa-bank
```

### 2. Construção e Execução em Modo Desenvolvimento

O projeto já possui um arquivo docker-compose.yml configurado para orquestrar os serviços.

### 3. Build e Start dos Containers

Para rodar os serviços em modo desenvolvimento, execute o seguinte comando:

```bash
./deployment.sh
```

ou

```bash
docker network create garupa-bank-network

docker-compose -f docker-compose.yml up -d --build
```

Esse comando irá:

Criar a rede garupa-bank-network.

Construir os containers necessários.

Rodar os serviços na porta configuradas no docker-compose.yml.

Criar o banco de dados PostgreSQL.

Inicializar os serviços WireMock, RabbitMQ e o consumo das filas.

### DESIGN PATTERNS E ARQUITETURA

- **Template Method**: Utilizado para definir o esqueleto de algoritmos, permitindo que subclasses forneçam implementações específicas.
- **SOLID**: O código foi estruturado com base nos princípios SOLID para garantir maior coesão e baixa acoplabilidade.
- **Factory Functions**: Para a criação de objetos, melhorando a extensibilidade do código.

## Acesso às Aplicações

Depois de executar o comando de inicialização, você pode acessar as aplicações através dos seguintes endereços:

- **WebApp**: http://localhost:5173å
- **API**: http://server:3000
- **RabbitMQ**: http://rabbitmq:15672
- **WireMock**: http://wiremock:8080
- **PostgreSQL**: http://postgres:5432

Documentação da API: http://localhost:3000/api-docs

## Melhorias (Coisas que gostaria de ter feito)

Embora o projeto tenha sido desenvolvido com as melhores práticas disponíveis dentro do tempo e dos requisitos do desafio, há algumas melhorias que gostaria de ter implementado:

1. Abstração dos Controllers: A arquitetura do código poderia ser melhorada ao abstrair os controllers de maneira mais eficaz, separando melhor as responsabilidades e tornando o código mais modular e fácil de manter.
2. Testes Unitários: Gostaria de implementar testes para melhorar a cobertura e a confiança na estabilidade do sistema.
3. Observabilidade: A inclusão de logs e métricas mais detalhadas ajudaria a entender melhor o comportamento da aplicação.
4. Tratamento de Erros e Validações no Frontend: Embora o tratamento de erros no backend tenha sido abordado, a validação e o tratamento de erros no frontend podem ser aprimorados. Gostaria de ter implementado uma validação de dados mais robusta e um sistema de feedback mais amigável para o usuário final.

## Tecnologias e Estruturas Utilizadas

A escolha das tecnologias e das estruturas foi feita com base no desafio proposto.

1. Node.js e TypeScript: foi escolhido pela sua performance e pela familiaridade com o ecossistema JavaScript. É uma tecnologia excelente suporte para APIs assíncronas e alto desempenho em sistemas que exigem escalabilidade.

2. PostgreSQL: foi escolhido por ser uma base de dados relacional, garantindo a consistência e a integridade dos dados.

3. WireMock: foi escolhido para simular uma API externa, permitindo que o projeto seja testado e desenvolvido de forma independente da API externa.

4. RabbitMQ: foi escolhido para gerenciar as filas de mensagens, permitindo que o projeto seja escalável e flexível de acordo com a característica do projeto.

5. Vue.js: foi escolhido para o frontend, pela sua familiaridade e pela sua performance.

6. Docker e Docker Compose: foi escolhido para facilitar a execução de todos os serviços em containers.

7. Monorepo: foi escolhido para organizar todos os serviços em um único repositório, facilitando.
