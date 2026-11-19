const api = "http://localhost:3000/receitas";

let receitasGlobais = [];
let receitaEditando = null;

document.addEventListener("DOMContentLoaded", () => {

    const tipoUsuario =
        localStorage.getItem("tipo_usuario");

    if (tipoUsuario !== "administrador") {

        const areaAdmin =
            document.getElementById("areaAdmin");

        if (areaAdmin) {

            areaAdmin.style.display = "none";

        }

    }

    const btnMostrar =
        document.getElementById("btnMostrar");

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

    }

}

function renderizarReceitas(receitas) {

    const tbody =
        document.getElementById(
            "tbodyReceitas"
        );

    if (!tbody) return;

    tbody.innerHTML = "";

    const tipoUsuario =
        localStorage.getItem(
            "tipo_usuario"
        );

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
                    onclick="mostrarDetalhes(${receita.id_receita})">
                        Ver
                    </button>

                    <button
                    onclick="favoritar(${receita.id_receita})">
                        ⭐
                    </button>

                    ${

                    tipoUsuario === "administrador"

                    ?

                    `

                    <button
                    onclick="editarReceita(${receita.id_receita})">

                        ✏ Editar

                    </button>

                    <button
                    class="btn-excluir"
                    onclick="excluirReceita(${receita.id_receita})">

                        🗑 Excluir

                    </button>

                    `

                    :

                    ""

                    }

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
${receita.tempo_preparo} min

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

    renderizarReceitas(resultado);

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

        alert(
            "Receita adicionada aos favoritos!"
        );

    }

    catch (erro) {

        console.error(erro);

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
    `${api}/${id}`,
    {

        method: "DELETE",

        headers: {

            Authorization:
            localStorage.getItem(
                "token"
            )

        }

    }
);

        carregarReceitas();

    }

    catch (erro) {

        console.error(erro);

    }

}

function abrirFormulario() {

    receitaEditando = null;

    document.getElementById(
        "formReceita"
    ).style.display = "block";

}

async function salvarReceita() {

    try {

        const dados = {

            nome_receita:
            document.getElementById(
                "nomeReceita"
            ).value,

            descricao:
            document.getElementById(
                "descricaoReceita"
            ).value,

            ingredientes:
            document.getElementById(
                "ingredientesReceita"
            ).value,

            modo_preparo:
            document.getElementById(
                "modoReceita"
            ).value,

            tempo_preparo:
            document.getElementById(
                "tempoReceita"
            ).value,

            calorias:
            document.getElementById(
                "caloriasReceita"
            ).value,

            custo_estimado:
            document.getElementById(
                "custoReceita"
            ).value,

            id_categoria: 1

        };

        let url = api;
        let metodo = "POST";

        if (receitaEditando !== null) {

            url =
            `${api}/${receitaEditando}`;

            metodo = "PUT";

        }

        const resposta =
            await fetch(
                url,
                {

                    method: metodo,

                  headers: {

                        "Content-Type":
                    "application/json",

                    Authorization:
                    localStorage.getItem(
                    "token"
                        )

                    },

                    body:
                    JSON.stringify(
                        dados
                    )

                }
            );

        const resultado =
            await resposta.json();

        alert(
            resultado.mensagem
        );

        receitaEditando = null;

        document.getElementById(
            "formReceita"
        ).style.display =
        "none";

        carregarReceitas();

    }

    catch (erro) {

        console.error(erro);

        alert(
            "Erro ao salvar receita."
        );

    }

}

async function atualizarReceita(id) {

    try {

        const resposta =

        await fetch(

            `http://localhost:3000/receitas/${id}`,

            {

                method: "PUT",

            headers: {

                "Content-Type":
                "application/json",

                Authorization:
                localStorage.getItem(
                    "token"
                    )

                    },

                body: JSON.stringify({

                    nome_receita:
                    document.getElementById(
                        "nomeReceita"
                    ).value,

                    descricao:
                    document.getElementById(
                        "descricaoReceita"
                    ).value,

                    ingredientes:
                    document.getElementById(
                        "ingredientesReceita"
                    ).value,

                    modo_preparo:
                    document.getElementById(
                        "modoReceita"
                    ).value,

                    tempo_preparo:
                    document.getElementById(
                        "tempoReceita"
                    ).value,

                    calorias:
                    document.getElementById(
                        "caloriasReceita"
                    ).value,

                    custo_estimado:
                    document.getElementById(
                        "custoReceita"
                    ).value,

                    id_categoria: 1

                })

            }

        );

        const dados =
        await resposta.json();

        alert(
            dados.mensagem
        );

        carregarReceitas();

        document.getElementById(
            "formReceita"
        ).style.display =
        "none";

    }

    catch (erro) {

        console.error(erro);

    }

}

function editarReceita(id) {

    const receita =
        receitasGlobais.find(
            r => r.id_receita == id
        );

    if (!receita) return;

    receitaEditando = id;

    document.getElementById(
        "formReceita"
    ).style.display =
    "block";

    document.getElementById(
        "nomeReceita"
    ).value =
    receita.nome_receita;

    document.getElementById(
        "descricaoReceita"
    ).value =
    receita.descricao;

    document.getElementById(
        "ingredientesReceita"
    ).value =
    receita.ingredientes;

    document.getElementById(
        "modoReceita"
    ).value =
    receita.modo_preparo;

    document.getElementById(
        "tempoReceita"
    ).value =
    receita.tempo_preparo;

    document.getElementById(
        "caloriasReceita"
    ).value =
    receita.calorias;

    document.getElementById(
        "custoReceita"
    ).value =
    receita.custo_estimado;

}