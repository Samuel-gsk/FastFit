const connection = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Cadastro
const cadastro = async (req, res) => {

    const {
        nome,
        email,
        senha
    } = req.body;

    try {

        const senhaCriptografada =
            await bcrypt.hash(senha, 10);

        const sql = `
            INSERT INTO usuarios
            (
                nome,
                email,
                senha,
                tipo_usuario
            )
            VALUES
            (
                 ?, ?, ?, ?
            )
        `;

        connection.query(
            sql,
            [
                nome,
                email,
                senhaCriptografada,
                "usuario"
            ],
            (erro, resultado) => {

                if (erro) {

                    return res
                    .status(500)
                    .json(erro);

                }

                res.status(201).json({

                    mensagem:
                    "Usuário cadastrado com sucesso!"

                });

            }
        );

    }

    catch (erro) {

        res.status(500).json(erro);

    }

};

// Login
const login = (req, res) => {

    const {
        email,
        senha
    } = req.body;

    const sql = `
        SELECT *
        FROM usuarios
        WHERE email = ?
    `;

    connection.query(
        sql,
        [email],
        async (erro, resultado) => {

            if (erro) {

                return res
                .status(500)
                .json(erro);

            }

            if (resultado.length === 0) {

                return res
                .status(401)
                .json({

                    mensagem:
                    "Usuário não encontrado"

                });

            }

            const usuario =
                resultado[0];

            const senhaCorreta =
                await bcrypt.compare(
                    senha,
                    usuario.senha
                );

            if (!senhaCorreta) {

                return res
                .status(401)
                .json({

                    mensagem:
                    "Senha incorreta"

                });

            }

            const token =
                jwt.sign(

                    {
                        id: usuario.id_usuario,
                        email: usuario.email,
                        tipo: usuario.tipo_usuario
                    },

                    process.env.JWT_SECRET,

                    {
                        expiresIn: "1h"
                    }

                );

            res.json({

                mensagem:
                "Login realizado",

                token,

                tipo:
                usuario.tipo_usuario

            });

        }
    );

};

module.exports = {

    cadastro,
    login

};
