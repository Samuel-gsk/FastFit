document.addEventListener("DOMContentLoaded", () => {

    const botaoReceitas = document.querySelector(".hero button");
    const secaoReceitas = document.querySelector(".receitas");

    if (botaoReceitas && secaoReceitas) {
        botaoReceitas.addEventListener("click", () => {
            secaoReceitas.scrollIntoView({
                behavior: "smooth"
            });
        });
    }

});
