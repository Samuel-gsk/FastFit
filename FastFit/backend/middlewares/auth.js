const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    const token =
        req.headers.authorization;

    if (!token) {

        return res
        .status(401)
        .json({

            mensagem:
            "Token obrigatório"

        });

    }

    try {

        const decodificado =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        req.usuario =
            decodificado;

        next();

    }

    catch {

        return res
        .status(401)
        .json({

            mensagem:
            "Token inválido"

        });

    }

};

module.exports = auth;