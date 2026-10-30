require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Conexão com o banco
require("./database/connection");

// Rotas
const receitasRoutes = require("./routes/receitas");
const favoritosRoutes = require("./routes/favoritos");

app.use("/receitas", receitasRoutes);
app.use("/favoritos", favoritosRoutes);

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos do frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Rotas da API
app.use("/receitas", receitasRoutes);

// Porta do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`);
});