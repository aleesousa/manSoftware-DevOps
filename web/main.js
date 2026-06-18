async function buscarGato() {
  const loader = document.getElementById("loader");
  const imagem = document.getElementById("catImage");

  try {
    loader.style.display = "block";
    imagem.classList.remove("show");

    const resposta = await fetch("https://api.thecatapi.com/v1/images/search");
    const dados = await resposta.json();

    const url = dados[0].url;

    imagem.src = url;

    // GARANTE que o evento sempre funcione
    imagem.onload = function () {
      loader.style.display = "none";
      imagem.classList.add("show");
    };

  } catch (erro) {
    loader.style.display = "none";
    alert("Erro ao carregar 😿");
    console.error(erro);
  }
}

window.onload = buscarGato;