FastFit
📌 Sobre o Projeto

O FastFit é uma plataforma web desenvolvida para ajudar pessoas com rotinas corridas a manterem uma alimentação saudável de forma simples e acessível.

O sistema permite consultar receitas rápidas e nutritivas, organizar refeições da semana, salvar receitas favoritas e gerenciar conteúdos através de diferentes níveis de acesso.

🎯 Problema Identificado

Atualmente, muitas pessoas possuem uma rotina intensa devido aos estudos, trabalho e demais compromissos diários.

Como consequência, acabam recorrendo frequentemente a alimentos industrializados e refeições pouco saudáveis por acreditarem que preparar uma alimentação equilibrada exige muito tempo e dinheiro.

Além disso, existe dificuldade em encontrar receitas rápidas, econômicas e nutritivas para o dia a dia.

👥 Público-Alvo

O FastFit foi desenvolvido para:

Estudantes;
Trabalhadores com rotina intensa;
Pessoas que buscam alimentação saudável;
Pessoas em processo de emagrecimento;
Usuários com pouco tempo disponível para cozinhar;
Pessoas interessadas em refeições nutritivas e econômicas.

💡 Solução Proposta

O FastFit oferece uma plataforma centralizada onde os usuários podem:

Consultar receitas saudáveis;
Favoritar receitas;
Organizar seu planejamento alimentar semanal;
Avaliar receitas;
Buscar refeições rápidas e econômicas.

A proposta é incentivar hábitos alimentares mais saudáveis de forma prática e acessível.

🚀 Funcionalidades
Receitas
Listar receitas cadastradas;
Pesquisar receitas pelo nome;
Filtrar receitas;
Visualizar detalhes;
Cadastrar receitas;
Editar receitas;
Excluir receitas.
Favoritos
Adicionar receitas aos favoritos;
Visualizar favoritos;
Remover favoritos.
Planejamento Semanal
Selecionar receitas para os dias da semana;
Visualizar planejamento;
Atualizar planejamento.
Avaliações
Avaliar receitas;
Registrar comentários.
Usuários
Cadastro;
Login;
Controle de permissões;
Autenticação com JWT.

🔑 Tipos de Usuário
Usuário Comum

Pode:

Visualizar receitas;
Pesquisar receitas;
Filtrar receitas;
Favoritar receitas;
Gerenciar favoritos;
Criar planejamento semanal;
Visualizar informações nutricionais.
Administrador

Pode:

Cadastrar receitas;
Editar receitas;
Excluir receitas;
Gerenciar conteúdos do sistema;
Controlar informações disponíveis aos usuários.

🔒 Controle de Acesso

O sistema utiliza autenticação baseada em JWT (JSON Web Token).

As permissões são verificadas tanto no Front-End quanto na API.

Usuário comum

Não possui acesso às operações administrativas.

Administrador

Possui acesso às operações:

Plain Text
POST /receitas
PUT /receitas/:id
DELETE /receitas/:id

As permissões são verificadas através dos middlewares:

Plain Text
auth.js
admin.js

🔄 Fluxo de Funcionamento
Plain Text
Início
│
▼
Login / Cadastro
│
▼
Página Inicial
│
├── Receitas
│ ├── Visualizar
│ ├── Pesquisar
│ ├── Filtrar
│ ├── Favoritar
│ └── Avaliar
│
├── Favoritos
│ ├── Visualizar
│ └── Remover
│
└── Planejamento Semanal
├── Selecionar receitas
├── Salvar
└── Atualizar
 
🗄️ Banco de Dados

O sistema utiliza MySQL e possui as seguintes tabelas:

Plain Text
usuarios
categorias
receitas
favoritos
planejamento_semanal
avaliacoes
Principais Relacionamentos
Plain Text
usuarios
│
├── favoritos
│
├── planejamento_semanal
│
└── avaliacoes
 
receitas
│
├── favoritos
│
├── planejamento_semanal
│
└── avaliacoes

Todos os relacionamentos utilizam:

SQL
FOREIGN KEY

garantindo a integridade dos dados.

🛠️ Tecnologias Utilizadas
Front-End
HTML5
CSS3
JavaScript
Back-End
Node.js
Express.js
Banco de Dados
MySQL
Segurança
JWT (JSON Web Token)
Bcrypt
Integração
API REST
Fetch API

📁 Estrutura do Projeto
Plain Text
FastFit
│
├── backend
│ ├── controllers
│ ├── database
│ ├── middlewares
│ ├── routes
│ ├── server.js
│ └── .env
│
├── frontend
│ ├── index.html
│ ├── login.html
│ ├── cadastro.html
│ ├── receitas.html
│ ├── favoritos.html
│ ├── planejamento.html
│ ├── style.css
│ ├── login.js
│ ├── cadastro.js
│ ├── receitas.js
│ ├── favoritos.js
│ └── planejamento.js
│
├── sql
│ └── fastfit.sql
│
└── README.md

⚙️ Instalação

Clone o repositório:

Shell
git clone URL_DO_REPOSITORIO

Entre na pasta:

Shell
cd FastFit/backend

Instale as dependências:

Shell
npm install

▶️ Execução

Inicie o servidor:

Shell
node server.js

A aplicação estará disponível em:

Plain Text
http://localhost:3000

📡 Principais Rotas da API
Usuários
HTTP
POST /usuarios/cadastro
POST /usuarios/login
Receitas
HTTP
GET /receitas
GET /receitas/:id
POST /receitas
PUT /receitas/:id
DELETE /receitas/:id
Favoritos
HTTP
GET /favoritos
POST /favoritos
DELETE /favoritos/:id

🧪 Como Testar
Usuário Comum
Criar conta;
Fazer login;
Visualizar receitas;
Favoritar receitas;
Criar planejamento semanal.
Administrador
Fazer login como administrador;
Criar receitas;
Editar receitas;
Excluir receitas;
Gerenciar conteúdos do sistema.

✅ Objetivo Final

O FastFit busca incentivar hábitos alimentares mais saudáveis por meio de uma plataforma simples, moderna e acessível, permitindo que pessoas com pouco tempo disponível encontrem refeições práticas, econômicas e nutritivas para o dia a dia.