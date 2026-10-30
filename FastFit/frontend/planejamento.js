async function carregarReceitas() {

    const resposta =
        await fetch(
            "http://localhost:3000/receitas"
        );

    const receitas =
        await resposta.json();

    const dias = [
        "Segunda",
        "Terca",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sabado",
        "Domingo"
    ];

    dias.forEach(dia => {

        const select =
        document.getElementById(dia);

        receitas.forEach(receita => {

            select.innerHTML += `

                <option
                value="${receita.id_receita}">

                    ${receita.nome_receita}

                </option>

            `;
        });
    });
}

carregarReceitas();