const admin = (req, res, next) => {

    if (
        req.usuario.tipo !==
        "administrador"
    ) {

        return res.status(403).json({

            mensagem:
            "Acesso permitido apenas para administradores."

        });

    }

    next();

};

module.exports = admin;