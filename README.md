FastFit
Descrição do Problema

Atualmente, muitas pessoas possuem uma rotina corrida devido aos estudos, trabalho e outras atividades diárias. Como consequência, acabam consumindo refeições industrializadas, fast foods tradicionais e alimentos com baixo valor nutricional por acreditarem que preparar refeições saudáveis exige muito tempo e dinheiro.

Além disso, existe uma dificuldade em encontrar receitas rápidas, acessíveis e nutritivas que possam ser preparadas no dia a dia.

Público Afetado

O FastFit foi desenvolvido pensando principalmente em:

Estudantes;
Trabalhadores com rotina intensa;
Pessoas que desejam melhorar seus hábitos alimentares;
Pessoas em processo de emagrecimento;
Usuários que buscam refeições saudáveis com baixo custo;
Pessoas com pouco tempo disponível para cozinhar.
Proposta de Solução

O FastFit é uma plataforma web que permite aos usuários consultar receitas saudáveis, rápidas e econômicas.

O sistema oferece funcionalidades para pesquisa de receitas, organização de planejamentos semanais, gerenciamento de receitas favoritas e avaliações de pratos, promovendo uma alimentação mais saudável e organizada.

Principais Funcionalidades
Receitas
Listar receitas disponíveis;
Pesquisar receitas pelo nome;
Filtrar receitas por critérios;
Visualizar detalhes das receitas;
Cadastrar novas receitas;
Editar receitas existentes;
Excluir receitas.

Favoritos
Adicionar receitas aos favoritos;
Visualizar favoritos;
Remover receitas dos favoritos.

Planejamento Semanal
Selecionar receitas para cada dia da semana;
Visualizar planejamento semanal;
Atualizar planejamento;
Remover receitas do planejamento.

Avaliações
Avaliar receitas;
Registrar comentários sobre receitas.
Usuários
Cadastro de usuários;
Gerenciamento de dados pessoais;
Controle de acesso ao sistema.

Tipos de Usuários e Ações Previstas
Usuário Comum

O usuário comum poderá:

Visualizar receitas;
Pesquisar receitas;
Filtrar receitas;
Favoritar receitas;
Remover receitas dos favoritos;
Criar planejamento semanal;
Editar planejamento semanal;
Avaliar receitas;
Visualizar informações nutricionais.
Administrador

O administrador será responsável por:

Cadastrar receitas;
Editar receitas;
Remover receitas;
Gerenciar categorias;
Gerenciar avaliações;
Gerenciar informações do sistema.

Fluxo Básico de Funcionamento
Plain Text
INÍCIO
│
▼
Acesso ao FastFit
│
▼
Página Inicial
│
├────► Receitas
│ │
│ ├── Pesquisar receitas
│ ├── Filtrar receitas
│ ├── Visualizar detalhes
│ └── Favoritar receita
│
├────► Planejamento Semanal
│ │
│ ├── Selecionar receita
│ ├── Salvar planejamento
│ └── Atualizar planejamento
│
└────► Favoritos
│
├── Visualizar favoritos
└── Remover favoritos
 
Estrutura do Projeto
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
│ ├── receitas.html
│ ├── planejamento.html
│ ├── favoritos.html
│ ├── style.css
│ ├── script.js
│ ├── receitas.js
│ ├── planejamento.js
│ └── favoritos.js
│
├── sql
│ └── fastfit.sql
│
├── README.md

Tecnologias Utilizadas
Front-end
HTML5
CSS3
JavaScript
Back-end
Node.js
Express.js
Banco de Dados
MySQL
Integração
API REST
Fetch API
Modelo de Banco de Dados

O sistema utiliza um banco de dados relacional composto pelas seguintes tabelas:

usuarios
categorias
receitas
favoritos
planejamento_semanal
avaliacoes

Os relacionamentos são realizados por meio de chaves estrangeiras (Foreign Keys), garantindo integridade dos dados.

Objetivo Final

O FastFit tem como objetivo incentivar hábitos alimentares mais saudáveis por meio de uma plataforma prática e acessível, oferecendo receitas rápidas, econômicas e nutritivas para pessoas com pouco tempo disponível no dia a dia.