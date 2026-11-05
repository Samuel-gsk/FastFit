const api =
"http://localhost:3000/favoritos";

async function carregarFavoritos(){

    const resposta =
    await fetch(api);

    const favoritos =
    await resposta.json();

    const lista =
    document.getElementById(
        "listaFavoritos"
    );

    lista.innerHTML = "";

    if(favoritos.length === 0){

        lista.innerHTML = `

            <div class="sem-favoritos">

                <h3>
                    Nenhuma receita favoritada
                </h3>

                <p>
                    Vá até a página de receitas
                    e adicione suas preferidas.
                </p>

            </div>

        `;

        return;
    }

    favoritos.forEach(
        favorito => {

            lista.innerHTML += `

                <div class="card">

                    <h3>
                        ⭐ ${favorito.nome_receita}
                    </h3>

                    <button
                        onclick="
                        removerFavorito(
                        ${favorito.id_favorito}
                        )">

                        Remover

                    </button>

                </div>

            `;
        }
    );
}

async function removerFavorito(id){

    await fetch(

        `http://localhost:3000/favoritos/${id}`,

        {
            method:"DELETE"
        }

    );

    carregarFavoritos();
}

carregarFavoritos();