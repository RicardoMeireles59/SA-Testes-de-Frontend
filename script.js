// ============================================================
// 1) CONSUMO DA API E EXIBIÇÃO DOS DADOS DA POKÉDEX
// ============================================================

window.addEventListener('load', () => {
    const gridContainer = document.getElementById('pokemonGrid');
    const loadingIndicator = document.getElementById('loading');

    if (!gridContainer || !loadingIndicator) return;

    consumeManipulaDadosAPI(gridContainer, loadingIndicator);
});

async function consumeManipulaDadosAPI(gridContainer, loadingIndicator) {
    try {
        loadingIndicator.style.display = 'block';
        gridContainer.style.display = 'none';

        const resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');

        if (!resposta.ok) throw new Error(`Erro HTTP: ${resposta.status}`);

        const dados = await resposta.json();
        const promessasDeDetalhes = dados.results.map(pokemon =>
            fetch(pokemon.url).then(res => res.json())
        );

        const pokemonsComDetalhes = await Promise.all(promessasDeDetalhes);
        gridContainer.innerHTML = '';

        pokemonsComDetalhes.forEach(pokemon => criarCardPokemon(pokemon, gridContainer));

    } catch (erro) {
        console.error("Erro ao consumir a API: ", erro);
        if (loadingIndicator) loadingIndicator.textContent = "Não foi possível carregar os dados.";
    } finally {
        if (loadingIndicator) loadingIndicator.style.display = 'none';
        if (gridContainer) gridContainer.style.display = 'grid';
    }
}

function criarCardPokemon(pokemon, container) {
    const card = document.createElement('div');
    card.classList.add('poke-card');

    const imagem = document.createElement('img');
    imagem.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    imagem.alt = `Imagem do ${pokemon.name}`;

    const nome = document.createElement('h2');
    nome.classList.add('poke-name');
    nome.textContent = pokemon.name;

    const typesContainer = document.createElement('div');
    typesContainer.classList.add('types');

    pokemon.types.forEach(tipoInfo => {
        const tipoElemento = document.createElement('span');
        tipoElemento.classList.add('type', `type-${tipoInfo.type.name}`);
        tipoElemento.textContent = tipoInfo.type.name;
        typesContainer.appendChild(tipoElemento);
    });

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('pokemon-info');

    const altura = document.createElement('p');
    altura.textContent = `Altura: ${(pokemon.height / 10).toFixed(1)} m`;

    const peso = document.createElement('p');
    peso.textContent = `Peso: ${(pokemon.weight / 10).toFixed(1)} kg`;

    infoContainer.appendChild(altura);
    infoContainer.appendChild(peso);

    card.appendChild(imagem);
    card.appendChild(nome);
    card.appendChild(typesContainer);
    card.appendChild(infoContainer);

    container.appendChild(card);
}

// ============================================================
// 2) SISTEMA DE VALIDAÇÃO DO FORMULÁRIO DE CADASTRO
// ============================================================

const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {

    const mensagem = document.getElementById("mensagem");
    const senhaEL = document.getElementById("senha");
    const confirmarSenhaEL = document.getElementById("confirmarSenha");


    // -----------------------------
    //  FUNÇÕES UNITÁRIAS DE SENHA
    // -----------------------------

    function senhaTemTamanhoMinimo(senha) {
        return senha.length >= 8;
    }

    function senhaTemMaiuscula(senha) {
        return /[A-Z]/.test(senha);
    }

    function senhaTemMinuscula(senha) {
        return /[a-z]/.test(senha);
    }

    function senhaTemNumero(senha) {
        return /[0-9]/.test(senha);
    }

    function senhaTemCaractereEspecial(senha) {
        return /[!@#$%^&*(),.?":{}|<>]/.test(senha);
    }

    // -----------------------------
    //  VALIDAR EMAIL
    // -----------------------------

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }


    // -----------------------------
    //  FUNÇÃO QUE RETORNA *APENAS* ERROS
    // -----------------------------

    function validarSenhaComMensagem(senha) {

        if (!senhaTemTamanhoMinimo(senha)) {
            return "Erro: A senha deve ter pelo menos 8 dígitos.";
        }

        if (!senhaTemMaiuscula(senha)) {
            return "Erro: A senha deve conter pelo menos uma letra maiúscula.";
        }

        if (!senhaTemMinuscula(senha)) {
            return "Erro: A senha deve conter pelo menos uma letra minúscula.";
        }

        if (!senhaTemNumero(senha)) {
            return "Erro: A senha deve conter pelo menos um número.";
        }

        if (!senhaTemCaractereEspecial(senha)) {
            return "Erro: A senha deve conter pelo menos um caractere especial (!@#$%...).";
        }

        return null; // <-- SENHA VÁLIDA
    }


    // -----------------------------
    //   EVENTO DE SUBMIT DO FORM
    // -----------------------------

    formCadastro.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = senhaEL.value.trim();
        const confirmarSenha = confirmarSenhaEL.value.trim();

        // VALIDAR CAMPOS VAZIOS
        if (!nome || !email || !senha || !confirmarSenha) {
            mensagem.classList.remove("sucesso-ativo");
            mensagem.classList.add("erro-ativo");
            mensagem.style.display = "block"; // FORÇA A EXIBIÇÃO
            mensagem.textContent = "Erro: Por favor, preencha todos os campos.";
            return;
        }

        // VALIDAR EMAIL
        if (!validarEmail(email)) {
            mensagem.classList.remove("sucesso-ativo");
            mensagem.classList.add("erro-ativo");
            mensagem.style.display = "block"; // FORÇA A EXIBIÇÃO
            mensagem.textContent = "Erro: Insira um e-mail válido.";
            return;
        }

        // VALIDAR SENHAS DIFERENTES
        if (senha !== confirmarSenha) {
            mensagem.classList.remove("sucesso-ativo");
            mensagem.classList.add("erro-ativo");
            mensagem.style.display = "block"; // FORÇA A EXIBIÇÃO
            mensagem.textContent = "As senhas não coincidem!";
            return;
        }

        // VALIDAR CADA REQUISITO DA SENHA
        const erroSenha = validarSenhaComMensagem(senha);
        if (erroSenha) {
            mensagem.classList.remove("sucesso-ativo");
            mensagem.classList.add("erro-ativo");
            mensagem.style.display = "block"; // FORÇA A EXIBIÇÃO
            mensagem.textContent = erroSenha;
            return;
        }

        // -----------------------------
        //          SUCESSO
        // -----------------------------
        mensagem.classList.remove("erro-ativo");
        mensagem.classList.add("sucesso-ativo");
        mensagem.textContent = "Cadastro efetuado com sucesso!";

        // OPCIONAL: Limpar o formulário após sucesso
        formCadastro.reset();
    });
}

// ============================================================
// 3) VALIDAÇÃO DO LOGIN
// ============================================================

const formLogin = document.querySelector("form");

if (formLogin && document.getElementById("emailLogin")) {

    formLogin.addEventListener("submit", (event) => {
        event.preventDefault();

        const user = document.getElementById("emailLogin").value.trim();
        const password = document.getElementById("passwordLogin").value.trim();

        if (user === "user@email.com.br" && password === "Senai2025!") {
            alert("Login realizado com sucesso!");
            window.location.href = "pokedex.html";
        } else {
            alert("Usuário ou senha incorretos!");
        }
    });
}
