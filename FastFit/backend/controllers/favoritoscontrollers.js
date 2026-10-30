const connection = require("../database/connection");

const listar = (req, res) => {

    const sql = `
        SELECT
            favoritos.id_favorito,
            receitas.nome_receita
        FROM favoritos
        INNER JOIN receitas
        ON favoritos.id_receita = receitas.id_receita
    `;

    connection.query(sql, (erro, resultados) => {

        if (erro) {
            return res.status(500).json(erro);
        }

        res.json(resultados);
    });
};

const adicionar = (req, res) => {

    const { id_usuario, id_receita } = req.body;

    const sql = `
        INSERT INTO favoritos
        (id_usuario, id_receita)
        VALUES (?, ?)
    `;

    connection.query(
        sql,
        [id_usuario, id_receita],
        (erro) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            res.json({
                mensagem: "Favorito adicionado!"
            });
        }
    );
};

const remover = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM favoritos
        WHERE id_favorito = ?
    `;

    connection.query(sql, [id], (erro) => {

        if (erro) {
            return res.status(500).json(erro);
        }

        res.json({
            mensagem: "Favorito removido!"
        });
    });
};

module.exports = {
    listar,
    adicionar,
    remover
};