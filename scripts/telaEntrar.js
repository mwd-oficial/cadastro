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
                username = res.data.userData.username;
                imagem = res.data.userData.imagem;
                semFoto = imagem === ""
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
    <span class="img-bem-vindo">
        <img src="${imagem !== "" ? imagem : "avatar.png"}">
    </span>
    @${username}
    `;
    irTelaPrincipal();
    navComConta.style.display = "block";
    navSemConta.style.display = "none";
};