const express = require("express");

const router = express.Router();

const favoritosController =
require("../controllers/favoritosController");

router.get(
    "/",
    favoritosController.listar
);

router.post(
    "/",
    favoritosController.adicionar
);

router.delete(
    "/:id",
    favoritosController.remover
);

module.exports = router;