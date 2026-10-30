const connection = require("../database/connection");

// Listar receitas
const listarReceitas = (req, res) => {

    const sql = "SELECT * FROM receitas";

    connection.query(sql, (erro, resultados) => {

        if (erro) {
            return res.status(500).json({
                mensagem: "Erro ao buscar receitas."
            });
        }

        res.status(200).json(resultados);
    });
};

// Buscar receita por ID
const buscarReceitaPorId = (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM receitas WHERE id_receita = ?";

    connection.query(sql, [id], (erro, resultados) => {

        if (erro) {
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
};

// Cadastrar receita
const cadastrarReceita = (req, res) => {

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
        (nome_receita, descricao, ingredientes, modo_preparo,
        tempo_preparo, calorias, custo_estimado, id_categoria)
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
                return res.status(500).json({
                    mensagem: "Erro ao cadastrar receita."
                });
            }

            res.status(201).json({
                mensagem: "Receita cadastrada com sucesso!",
                id: resultado.insertId
            });
        }
    );
};

// Atualizar receita
const atualizarReceita = (req, res) => {

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
                return res.status(500).json({
                    mensagem: "Erro ao atualizar receita."
                });
            }

            res.status(200).json({
                mensagem: "Receita atualizada com sucesso!"
            });
        }
    );
};

// Excluir receita
const excluirReceita = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM receitas WHERE id_receita = ?";

    connection.query(sql, [id], (erro) => {

        if (erro) {
            return res.status(500).json({
                mensagem: "Erro ao excluir receita."
            });
        }

        res.status(200).json({
            mensagem: "Receita removida com sucesso!"
        });
    });
};

module.exports = {
    listarReceitas,
    buscarReceitaPorId,
    cadastrarReceita,
    atualizarReceita,
    excluirReceita
};