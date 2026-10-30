const express = require("express");
const router = express.Router();

const connection = require("../database/connection");

// Listar todas as receitas
router.get("/", (req, res) => {

    const sql = "SELECT * FROM receitas";

    connection.query(sql, (erro, resultados) => {

        if (erro) {
            console.error(erro);
            return res.status(500).json({
                mensagem: "Erro ao buscar receitas."
            });
        }

        res.status(200).json(resultados);
    });

});

// Buscar receita por ID
router.get("/:id", (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM receitas WHERE id_receita = ?";

    connection.query(sql, [id], (erro, resultados) => {

        if (erro) {
            console.error(erro);
            return res.status(500).json({
                mensagem: "Erro ao buscar receita."
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensagem: "Receita não encontrada."
            });
        }

        res.status(200).json(resultados[0]);
    });

});

// Cadastrar receita
router.post("/", (req, res) => {

    const {
        nome_receita,
        descricao,
        ingredientes,
        modo_preparo,
        tempo_preparo,
        calorias,
        custo_estimado,
        id_categoria
    } = req.body;

    const sql = `
        INSERT INTO receitas
        (
            nome_receita,
            descricao,
            ingredientes,
            modo_preparo,
            tempo_preparo,
            calorias,
            custo_estimado,
            id_categoria
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        sql,
        [
            nome_receita,
            descricao,
            ingredientes,
            modo_preparo,
            tempo_preparo,
            calorias,
            custo_estimado,
            id_categoria
        ],
        (erro, resultado) => {

            if (erro) {
                console.error(erro);
                return res.status(500).json({
                    mensagem: "Erro ao cadastrar receita."
                });
            }

            res.status(201).json({
                mensagem: "Receita cadastrada com sucesso!",
                id_receita: resultado.insertId
            });
        }
    );
});

// Atualizar receita
router.put("/:id", (req, res) => {

    const { id } = req.params;

    const {
        nome_receita,
        descricao,
        ingredientes,
        modo_preparo,
        tempo_preparo,
        calorias,
        custo_estimado,
        id_categoria
    } = req.body;

    const sql = `
        UPDATE receitas
        SET
            nome_receita = ?,
            descricao = ?,
            ingredientes = ?,
            modo_preparo = ?,
            tempo_preparo = ?,
            calorias = ?,
            custo_estimado = ?,
            id_categoria = ?
        WHERE id_receita = ?
    `;

    connection.query(
        sql,
        [
            nome_receita,
            descricao,
            ingredientes,
            modo_preparo,
            tempo_preparo,
            calorias,
            custo_estimado,
            id_categoria,
            id
        ],
        (erro) => {

            if (erro) {
                console.error(erro);
                return res.status(500).json({
                    mensagem: "Erro ao atualizar receita."
                });
            }

            res.status(200).json({
                mensagem: "Receita atualizada com sucesso!"
            });
        }
    );
});

// Excluir receita
router.delete("/:id", (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM receitas WHERE id_receita = ?";

    connection.query(sql, [id], (erro) => {

        if (erro) {
            console.error(erro);
            return res.status(500).json({
                mensagem: "Erro ao excluir receita."
            });
        }

        res.status(200).json({
            mensagem: "Receita removida com sucesso!"
        });
    });

});

module.exports = router;