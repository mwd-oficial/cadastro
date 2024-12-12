// Telas
const telas = document.querySelectorAll(".telas");
const telaCarregamento = document.querySelector("#tela-carregamento");
const telaPrincipal = document.querySelector("#tela-principal");
const telaEntrar = document.querySelector("#tela-entrar");
const telaCadastrar = document.querySelector("#tela-cadastrar");
const telaEditar = document.querySelector("#tela-editar");


// botões
const entrarBtn = document.querySelectorAll(".entrar-btn");
const cadastrarBtn = document.querySelectorAll(".cadastrar-btn");
const sairBtn = document.querySelector("#sair-btn");
const editarBtn = document.querySelector("#editar-btn");
const excluirBtn = document.querySelector("#excluir-btn");
const voltarBtn = document.querySelectorAll(".voltar-btn");

// Nav
const navComConta = document.querySelector("#nav-com-conta");
const navSemConta = document.querySelector("#nav-sem-conta");

// Formulários
const forms = document.querySelectorAll("form");
const formCadastrar = document.querySelector("#form-cadastrar");
const formEntrar = document.querySelector("#form-entrar");
const formEditar = document.querySelector("#form-editar");

// Inputs
const passwordInputs = document.querySelectorAll(".password-inputs");
const olhos = document.querySelectorAll(".olhos");

alert("Esse site é apenas de teste. Não coloque suas informações pessoais verdadeiras.")

entrarBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        telaPrincipal.style.display = "none";
        telaEntrar.style.display = "block";
        telaCadastrar.style.display = "none";
        resetarInputs();
    });
});

cadastrarBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        telaPrincipal.style.display = "none";
        telaEntrar.style.display = "none";
        telaCadastrar.style.display = "block";
        semFoto = true
        resetarInputs();
    });
});

sairBtn.addEventListener("click", () => {
    sairConta()
    alert("Você saiu.");
});

editarBtn.addEventListener("click", async () => {
    telaPrincipal.style.display = "none";
    telaEditar.style.display = "block";
    telaCarregamento.style.display = "flex"
    resetarInputs();

    const usernameEditar = document.querySelector("#username-editar");
    const emailEditar = document.querySelector("#email-editar");
    const passwordEditar = document.querySelector("#password-editar");

    try {
        const res = await axios.post(`${API_URL}/pegarUserInfo`, { username: username })
        if (res.status === 200) {
            usernameCadastrado = res.data.username;
            emailCadastrado = res.data.email;
            imagemCadastrada = res.data.imagem !== "" ? res.data.imagem : "avatar.png"
            imagemCadastrada = `${imagemCadastrada}?${new Date().getTime()}`

            usernameEditar.value = usernameCadastrado;
            emailEditar.value = emailCadastrado;
            passwordEditar.value = JSON.parse(localStorage.getItem("password"));
            imagensCarregadas.forEach(img =>  img.src = imagemCadastrada);
            

            telaCarregamento.style.display = "none"
        }
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
        telaCarregamento.style.display = "none";
        setTimeout(() => { alert("Ocorreu um erro inesperado."); }, 100);
    }
});

excluirBtn.addEventListener("click", () => {
    if (confirm("Tem certeza? Você perderá todos os seus dados salvos.")) excluirConta()
});

voltarBtn.forEach(btn => btn.addEventListener("click", irTelaPrincipal));
function irTelaPrincipal() {
    exibirUsers();
    telas.forEach(tela => tela.style.display = "none");
    telaPrincipal.style.display = "block";
}


function resetarInputs() {
    forms.forEach(form => form.reset());
    passwordInputs.forEach(input => input.type = "password");
    olhos.forEach(olho => olho.innerHTML = "visibility");
}


olhos.forEach((olho, i) => {
    olho.addEventListener("click", function () {
        olho.innerHTML = olho.innerHTML == "visibility" ? "visibility_off" : "visibility";
        passwordInputs[i].type = olho.innerHTML == "visibility" ? "password" : "text";
    });
});


