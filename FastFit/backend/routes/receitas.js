const api = "http://localhost:3000/receitas";

let receitasGlobais = [];

document.addEventListener("DOMContentLoaded", () => {

    const btnMostrar = document.getElementById("btnMostrar");

    if (btnMostrar) {
        btnMostrar.addEventListener(
            "click",
            carregarReceitas
        );
    }

    const campoPesquisa =
        document.getElementById("pesquisa");

    if (campoPesquisa) {
        campoPesquisa.addEventListener(
            "input",
            pesquisar
        );
    }

    const filtro =
        document.getElementById("filtro");

    if (filtro) {
        filtro.addEventListener(
            "change",
            filtrar
        );
    }

});

async function carregarReceitas() {

    try {

        const resposta =
            await fetch(api);

        receitasGlobais =
            await resposta.json();

        renderizarReceitas(
            receitasGlobais
        );

    }

    catch (erro) {

        console.error(
            "Erro ao carregar receitas:",
            erro
        );

        alert(
            "Erro ao carregar receitas."
        );

    }

}

function renderizarReceitas(receitas) {

    const tbody =
        document.getElementById(
            "tbodyReceitas"
        );

    if (!tbody) return;

    tbody.innerHTML = "";

    receitas.forEach(receita => {

        tbody.innerHTML += `

            <tr>

                <td>
                    ${receita.nome_receita}
                </td>

                <td>
                    ${receita.calorias}
                </td>

                <td>
                    R$ ${receita.custo_estimado}
                </td>

                <td>

                    <button
                        onclick="mostrarDetalhes(${receita.id_receita})"
                    >
                        Ver
                    </button>

                    <button
                        onclick="favoritar(${receita.id_receita})"
                    >
                        ⭐
                    </button>

                    <button
                        onclick="excluirReceita(${receita.id_receita})"
                    >
                        🗑
                    </button>

                </td>

            </tr>

        `;

    });

}

function mostrarDetalhes(id) {

    const receita =
        receitasGlobais.find(
            r => r.id_receita == id
        );

    if (!receita) return;

    alert(

`Nome: ${receita.nome_receita}

Descrição:
${receita.descricao}

Ingredientes:
${receita.ingredientes}

Modo de preparo:
${receita.modo_preparo}

Tempo:
${receita.tempo_preparo} minutos

Calorias:
${receita.calorias}

Custo:
R$ ${receita.custo_estimado}`

    );

}

function pesquisar() {

    const texto =
        document
        .getElementById("pesquisa")
        .value
        .toLowerCase()
        .trim();

    if (texto === "") {

        renderizarReceitas(
            receitasGlobais
        );

        return;

    }

    const resultado =
        receitasGlobais.filter(
            receita =>
                receita.nome_receita
                .toLowerCase()
                .includes(texto)
        );

    renderizarReceitas(
        resultado
    );

}

function filtrar() {

    const valor =
        document
        .getElementById("filtro")
        .value;

    let lista =
        [...receitasGlobais];

    if (valor === "az") {

        lista.sort(
            (a, b) =>
                a.nome_receita.localeCompare(
                    b.nome_receita
                )
        );

    }

    if (valor === "calorias") {

        lista.sort(
            (a, b) =>
                a.calorias -
                b.calorias
        );

    }

    if (valor === "custo") {

        lista.sort(
            (a, b) =>
                a.custo_estimado -
                b.custo_estimado
        );

    }

    renderizarReceitas(lista);

}

async function favoritar(idReceita) {

    try {

        const resposta =
            await fetch(
                "http://localhost:3000/favoritos",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({

                        id_usuario: 1,
                        id_receita: idReceita

                    })

                }
            );

        const dados =
            await resposta.json();

        alert(
            dados.mensagem ||
            "Receita favoritada!"
        );

    }

    catch (erro) {

        console.error(erro);

        alert(
            "Erro ao favoritar receita."
        );

    }

}

async function excluirReceita(id) {

    const confirmar =
        confirm(
            "Deseja excluir esta receita?"
        );

    if (!confirmar) return;

    try {

        await fetch(
            `http://localhost:3000/receitas/${id}`,
            {
                method: "DELETE"
            }
        );

        carregarReceitas();

    }

    catch (erro) {

        console.error(erro);

        alert(
            "Erro ao excluir receita."
        );

    }

}