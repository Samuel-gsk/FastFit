CREATE DATABASE fastfit;
USE fastfit;

CREATE DATABASE fastfit;
USE fastfit;

ALTER TABLE usuarios
ADD tipo_usuario VARCHAR(20)
DEFAULT 'usuario';


UPDATE usuarios
SET tipo_usuario = 'administrador'
WHERE email = 'samuel@gmail.com';


CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_usuario VARCHAR(20) DEFAULT 'usuario'
);

CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome_categoria VARCHAR(50) NOT NULL
);

INSERT INTO categorias (nome_categoria) VALUES
('Cafe da Manha'),
('Almoco'),
('Jantar'),
('Lanche Saudavel'),
('Sobremesa Fit');

CREATE TABLE receitas (
    id_receita INT AUTO_INCREMENT PRIMARY KEY,
    nome_receita VARCHAR(100) NOT NULL,
    descricao TEXT,
    ingredientes TEXT NOT NULL,
    modo_preparo TEXT NOT NULL,
    tempo_preparo INT NOT NULL,
    calorias INT,
    custo_estimado DECIMAL(6,2),
    id_categoria INT,

    FOREIGN KEY (id_categoria)
    REFERENCES categorias(id_categoria)
);

CREATE TABLE favoritos (
    id_favorito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_receita INT,

    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario),

    FOREIGN KEY (id_receita)
    REFERENCES receitas(id_receita)
);

CREATE TABLE planejamento_semanal (
    id_planejamento INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    dia_semana VARCHAR(20),
    id_receita INT,

    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario),

    FOREIGN KEY (id_receita)
    REFERENCES receitas(id_receita)
);

CREATE TABLE avaliacoes (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_receita INT,
    nota INT,
    comentario TEXT,

    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario),

    FOREIGN KEY (id_receita)
    REFERENCES receitas(id_receita)
);

INSERT INTO receitas
(nome_receita, descricao, ingredientes, modo_preparo, tempo_preparo, calorias, custo_estimado, id_categoria)
VALUES

('Omelete Fit','Rica em proteinas','2 ovos, tomate','Misture e asse',10,230,4.50,1),

('Vitamina de Banana','Energia para o dia','Banana, leite','Bater no liquidificador',5,200,3.50,1),

('Pao Integral com Queijo Branco','Cafe rapido','Pao integral e queijo branco','Montar e servir',5,180,3.00,1),

('Iogurte com Granola','Cafe nutritivo','Iogurte e granola','Misturar',3,210,4.00,1),

('Mingau de Aveia','Fonte de fibras','Aveia e leite','Cozinhar',8,220,2.50,1),

('Frango Grelhado','Almoco saudavel','Peito de frango','Grelhar',20,320,8.00,2),

('Arroz Integral com Legumes','Refeicao balanceada','Arroz integral e legumes','Cozinhar',30,280,6.00,2),

('Feijao Caseiro','Fonte de ferro','Feijao temperado','Cozinhar',40,250,5.00,2),

('Salada Colorida','Rica em vitaminas','Alface, tomate e cenoura','Misturar',10,120,4.50,2),

('Peixe Assado','Proteina magra','File de peixe','Assar',25,290,10.00,2),

('Carne Magra com Legumes','Almoco completo','Patinho e legumes','Refogar',30,350,12.00,2),

('Macarrao Integral','Massa saudavel','Macarrao integral','Cozinhar',15,310,5.50,2),

('Sopa de Legumes','Jantar leve','Batata, cenoura, chuchu','Cozinhar',35,180,6.00,3),

('Salada de Frango','Jantar proteico','Frango desfiado e verduras','Misturar',15,250,7.50,3),

('Ovos Mexidos','Jantar rapido','Ovos e temperos','Preparar na frigideira',10,220,3.50,3),

('Creme de Abobora','Rico em nutrientes','Abobora e cebola','Cozinhar e bater',25,170,4.00,3),

('Sanduiche Natural','Leve e pratico','Pao integral e frango','Montar',10,240,5.00,3),

('Panqueca Integral','Saudavel e leve','Farinha integral e ovo','Preparar massa',20,280,5.50,3),

('Mix de Frutas','Lanche natural','Frutas variadas','Cortar e servir',5,150,4.00,4),

('Barra de Cereais','Lanche rapido','Barra de cereal','Consumir',1,110,2.50,4),

('Banana com Canela','Doce saudavel','Banana e canela','Aquecer',3,130,1.50,4),

('Pipoca Sem Oleo','Lanche leve','Milho de pipoca','Estourar',5,100,1.00,4),

('Castanhas','Fonte de gorduras boas','Mix de castanhas','Consumir',1,160,3.00,4),

('Iogurte Natural','Lanche nutritivo','Iogurte','Consumir',1,120,2.00,4),

('Maca Assada','Sobremesa fit','Maca e canela','Assar',15,140,2.50,5),

('Gelatina Sem Acucar','Baixas calorias','Gelatina diet','Preparar',10,80,1.50,5),

('Salada de Frutas','Sobremesa natural','Frutas diversas','Misturar',10,150,4.50,5),

('Mousse de Maracuja Light','Sobremesa leve','Maracuja e iogurte','Misturar',15,180,5.00,5),

('Pera Cozida com Canela','Sobremesa simples','Pera e canela','Cozinhar',15,120,3.00,5),

('Sorvete de Banana','Sobremesa gelada','Banana congelada','Bater no liquidificador',5,160,2.50,5);