const express = require("express");

const router = express.Router();

const receitasController =
require("../controllers/receitasController");

const auth =
require("../middlewares/auth");

const admin =
require("../middlewares/admin");

// Rotas públicas

router.get(
    "/",
    receitasController.listarReceitas
);

router.get(
    "/:id",
    receitasController.buscarReceitaPorId
);

// Rotas protegidas

router.post(
    "/",
    auth,
    admin,
    receitasController.cadastrarReceita
);

router.put(
    "/:id",
    auth,
    admin,
    receitasController.atualizarReceita
);

router.delete(
    "/:id",
    auth,
    admin,
    receitasController.excluirReceita
);

module.exports = router;