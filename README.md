[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/IDEzcQ6G)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=23519976)
# :checkered_flag: NOME DO PROJETO

**Recicla Quixadá**
Plataforma web responsiva projetada como um ecossistema digital colaborativo para a otimização da gestão de resíduos sólidos, promovendo sustentabilidade, inclusão social e educação ambiental na comunidade de Quixadá.

## :technologist: Membros da equipe
- Fábio Rodrigues Borges Filho - 552274 - EC
- Ruanne Sousa Oliveira - 558314 - RC

## :bulb: Objetivo Geral
Desenvolver uma aplicação web com foco em extensão universitária voltada à comunidade de Quixadá, com o objetivo de melhorar a gestão de resíduos sólidos por meio da conexão entre cidadãos, catadores e pontos de coleta, promovendo educação ambiental e engajamento social.

## :eyes: Público-Alvo
- Moradores de Quixadá
- Catadores e cooperativas de reciclagem
- Pequenos comércios locais
- Escolas públicas e privadas
- Estudantes e servidores da UFC (como participantes e apoiadores)

## :star2: Impacto Esperado
O projeto visa fortalecer a cultura de sustentabilidade na comunidade, incentivando práticas corretas de descarte de resíduos e promovendo a inclusão de catadores no processo de coleta. Espera-se aumentar o engajamento da população e simplificar a comunicação para o recolhimento de materiais recicláveis.

## :people_holding_hands: Papéis ou tipos de usuário da aplicação
A aplicação contará com quatro tipos de usuários:

**Usuário não autenticado (público)**
* Visualizar mapa de pontos de coleta
* Acessar conteúdos educativos sobre reciclagem
* Consultar informações sobre descarte correto

**Usuário autenticado (comunidade)**
* Cadastro e login na plataforma
* Registrar descartes de resíduos
* Solicitar coleta de materiais recicláveis
* Acompanhar histórico de participação
* Interagir com conteúdos da plataforma

**Catador/coletor**
* Visualizar solicitações de coleta próximas
* Aceitar e gerenciar coletas
* Registrar materiais coletados
* Acompanhar histórico de coletas realizadas

**Administrador**
* Gerenciar usuários
* Gerenciar pontos de coleta
* Visualizar relatórios
* Monitorar volume e frequência de resíduos

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação
**Funcionalidades públicas**
* Visualização de pontos de coleta 
* Guias educativos sobre descarte correto
* Informações sobre reciclagem e sustentabilidade

**Funcionalidades autenticadas**
* Cadastro e login de usuários
* Registro de descarte de resíduos
* Histórico de participação do usuário
* Solicitação de coleta domiciliar

**Funcionalidades para catadores**
* Acesso a solicitações de coleta
* Gerenciamento de coletas realizadas
* Registro de materiais coletados

**Funcionalidades administrativas**
* Painel com dados em tempo real
* Relatórios de coleta
* Gerenciamento de usuários e pontos de coleta
* Monitoramento de indicadores ambientais

## :spiral_calendar: Entidades ou tabelas do sistema
O sistema será composto pelas seguintes entidades:
* Usuário
* Catador
* Ponto de Coleta
* Resíduo
* Solicitação de coleta
* Descarte (dependente de Usuário e Resíduo)
* Relatório

----

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:


----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

* HTML5
* CSS3
* JavaScript
* Bootstrap Icons
* Leaflet.js
* OpenStreetMap

**Backend:**

* Strapi
* Node.js
* API REST
* SQLite

## :shipit: Operações implementadas para cada entidade da aplicação

| Entidade              | Criação | Leitura | Atualização | Remoção |
| --------------------- | ------- | ------- | ----------- | ------- |
| Usuário               | X       | X       | X           |         |
| Catador               | X       | X       |             |         |
| Ponto de Coleta       | X       | X       |             |         |
| Resíduo               | X       | X       |             |         |
| Solicitação de Coleta | X       | X       |             |         |
| Descarte              | X       | X       |             |         |

> O CRUD mínimo exigido foi contemplado principalmente nas entidades Usuário e Solicitação de Coleta/Descarte. Algumas funcionalidades administrativas e integrações com dados reais de cooperativas/catadores ainda estão em processo de complementação, pois a equipe aguarda retorno institucional e reunião com representantes da área.

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL                           |
| ----------- | ----------------------------- |
| POST        | `/api/auth/local/register`    |
| POST        | `/api/auth/local`             |
| GET         | `/api/users/me`               |
| PUT         | `/api/users/:id`              |
| GET         | `/api/catadors`               |
| GET         | `/api/ponto-de-coletas`       |
| GET         | `/api/residuos`               |
| GET         | `/api/solicitacao-de-coletas` |
| POST        | `/api/solicitacao-de-coletas` |
| GET         | `/api/descartes`              |
| POST        | `/api/descartes`              |

## :pushpin: Observação sobre dados externos

Durante o desenvolvimento, a equipe tentou contato com cooperativas, catadores e órgãos responsáveis pela gestão de resíduos em Quixadá para obter dados reais sobre pontos de coleta, materiais aceitos, regiões atendidas e funcionamento das coletas.

No entanto, até a data de entrega do projeto, parte dessas informações ainda não havia sido recebida. Uma reunião foi marcada para terça-feira (30 de junho), às 9h, via Google Meet, com o objetivo de complementar os dados da aplicação e melhorar a aderência do sistema à realidade local.

Por esse motivo, algumas informações utilizadas na versão atual da aplicação são estruturais ou demonstrativas, enquanto a integração com dados reais será refinada após o retorno dos representantes contatados.

