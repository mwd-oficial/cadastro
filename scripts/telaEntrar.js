// Tela entrar
var peloLocalStorage = false
var emailEntrar = localStorage.getItem("email") ? JSON.parse(localStorage.getItem("email")) : "";
var passwordEntrar = localStorage.getItem("password") ? JSON.parse(localStorage.getItem("password")) : "";
if (emailEntrar !== "" && passwordEntrar !== "") {
    peloLocalStorage = true
    entrarUser();
}

formEntrar.addEventListener("submit", function (event) {
    event.preventDefault();
    telaCarregamento.style.display = "flex";

    emailEntrar = document.querySelector("#email-entrar").value;
    passwordEntrar = document.querySelector("#password-entrar").value;

    entrarUser();
})

async function entrarUser() {
    try {
        const res = await axios.post(`${API_URL}/validarSenha`, {
            email: emailEntrar,
            password: passwordEntrar
        });

        if (res.data.emailEncontrado) {
            if (res.data.senhaCorreta) {
                usernameVar = res.data.userData.username;
                imagemVar = res.data.userData.imagem;
                semFoto = imagemVar === ""
                localStorage.setItem("email", JSON.stringify(emailEntrar));
                localStorage.setItem("password", JSON.stringify(passwordEntrar));

                telaCarregamento.style.display = "none";
                setTimeout(() => {
                    alert(res.data.msg);
                    peloLocalStorage = false
                    userEntrado();
                }, 100);
            } else {
                telaCarregamento.style.display = "none"
                setTimeout(() => {
                    if (!peloLocalStorage) alert(res.data.msg);
                    peloLocalStorage = false
                }, 100);
            }
        } else {
            telaCarregamento.style.display = "none";
            setTimeout(() => {
                if (!peloLocalStorage) alert(res.data.msg);
                peloLocalStorage = false
            }, 100);
        }
    } catch (erro) {
        console.error('Erro ao validar a senha: ', erro);
        telaCarregamento.style.display = "none";
        setTimeout(() => { alert("Erro ao validar a senha"); }, 100);
    }
}

function userEntrado() {
    document.querySelector("#seja-bem-vindo").innerHTML = `
    Seja bem-vindo,
    <span id="img-user-bem-vindo">
        <span id="loader-bem-vindo"></span>
        <img src="${imagemVar !== "" ? imagemVar : "avatar.png"}">
    </span>
    @${usernameVar}
    `;

    const loaderBemVindo = document.querySelector("#loader-bem-vindo")
    const imgBemVindo = document.querySelector("#img-user-bem-vindo > img");
    loaderBemVindo.style.opacity = 1;
    imgBemVindo.style.opacity = 0; 
    imgBemVindo.addEventListener("load", () => {
        loaderBemVindo.style.opacity = 0;
        imgBemVindo.style.opacity = 1;
    });
    irTelaPrincipal();
    navComConta.style.display = "block";
    navSemConta.style.display = "none";
}