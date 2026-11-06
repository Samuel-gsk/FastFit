const express = require("express");

const router = express.Router();

const receitasController =
require("../controllers/receitasController");

router.get(
    "/",
    receitasController.listarReceitas
);

router.get(
    "/:id",
    receitasController.buscarReceitaPorId
);

router.post(
    "/",
    receitasController.cadastrarReceita
);

router.put(
    "/:id",
    receitasController.atualizarReceita
);

router.delete(
    "/:id",
    receitasController.excluirReceita
);

module.exports = router;