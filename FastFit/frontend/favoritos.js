const api = "http://localhost:3000/favoritos";

async function carregarFavoritos() {

    const resposta = await fetch(api);
    const favoritos = await resposta.json();

    const lista =
        document.getElementById("listaFavoritos");

    lista.innerHTML = "";

    favoritos.forEach(favorito => {

        lista.innerHTML += `

            <div class="card">

                <h3>
                    ⭐ ${favorito.nome_receita}
                </h3>

                <button
                    onclick="removerFavorito(${favorito.id_favorito})"
                >
                    Remover
                </button>

            </div>

        `;
    });

}

async function removerFavorito(id) {

    await fetch(
        `http://localhost:3000/favoritos/${id}`,
        {
            method: "DELETE"
        }
    );

    carregarFavoritos();

}

carregarFavoritos();