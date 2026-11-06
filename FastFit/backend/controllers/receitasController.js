const connection =
require("../database/connection");

// LISTAR
const listarReceitas = (req, res) => {

    const sql =
    "SELECT * FROM receitas";

    connection.query(
        sql,
        (erro, resultados) => {

            if (erro) {

                return res
                .status(500)
                .json(erro);

            }

            res.json(resultados);

        }
    );

};

// BUSCAR POR ID
const buscarReceitaPorId = (req, res) => {

    const { id } = req.params;

    const sql =
    "SELECT * FROM receitas WHERE id_receita = ?";

    connection.query(
        sql,
        [id],
        (erro, resultados) => {

            if (erro) {

                return res
                .status(500)
                .json(erro);

            }

            if (
                resultados.length === 0
            ) {

                return res
                .status(404)
                .json({

                    mensagem:
                    "Receita não encontrada"

                });

            }

            res.json(resultados[0]);

        }
    );

};

// CADASTRAR
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

    if (
        !nome_receita ||
        !ingredientes ||
        !modo_preparo
    ) {

        return res
        .status(400)
        .json({

            mensagem:
            "Preencha todos os campos obrigatórios."

        });

    }

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
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?)
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

                return res
                .status(500)
                .json(erro);

            }

            res.status(201).json({

                mensagem:
                "Receita cadastrada com sucesso!",

                id_receita:
                resultado.insertId

            });

        }
    );

};

// ATUALIZAR
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

                return res
                .status(500)
                .json(erro);

            }

            res.json({

                mensagem:
                "Receita atualizada!"

            });

        }
    );

};

// EXCLUIR
const excluirReceita = (req, res) => {

    const { id } = req.params;

    const sql =
    "DELETE FROM receitas WHERE id_receita = ?";

    connection.query(
        sql,
        [id],
        (erro) => {

            if (erro) {

                return res
                .status(500)
                .json(erro);

            }

            res.json({

                mensagem:
                "Receita removida!"

            });

        }
    );

};

module.exports = {

    listarReceitas,
    buscarReceitaPorId,
    cadastrarReceita,
    atualizarReceita,
    excluirReceita

};