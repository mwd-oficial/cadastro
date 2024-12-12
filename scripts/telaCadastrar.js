// Tela cadastrar
var username, imagem;

formCadastrar.addEventListener("submit", async function (event) {
    event.preventDefault();
    telaCarregamento.style.display = "flex";

    const usernameCadastrar = document.querySelector("#username-cadastrar").value;
    const emailCadastrar = document.querySelector("#email-cadastrar").value;
    const passwordCadastrar = document.querySelector("#password-cadastrar").value;
    const imagemCadastrar = document.querySelector("#imagem-cadastrar").files[0];
    console.log("imagemCadastrar: " + imagemCadastrar)

    const formData = new FormData();
    formData.append("username", usernameCadastrar);
    formData.append("email", emailCadastrar);
    formData.append("password", passwordCadastrar);
    formData.append("imagem", imagemCadastrar);
    formData.append("semFoto", semFoto);

    try {
        const res = await axios.post(`${API_URL}/cadastrar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(res.data);
        telaCarregamento.style.display = "none";
        setTimeout(() => { alert(res.data.msg); }, 100);
        if (res.data.resultado) {
            username = usernameCadastrar;
            imagem = res.data.resultado.imagem;
            console.log("res.data.resultado.imagem: " + res.data.resultado.imagem)
            localStorage.setItem("email", JSON.stringify(emailCadastrar));
            localStorage.setItem("password", JSON.stringify(passwordCadastrar));
            setTimeout(userEntrado, 100);
        }
    } catch (erro) {
        console.error('Erro ao enviar os dados:', erro);
        telaCarregamento.style.display = "none";
        setTimeout(() => { alert("Erro ao enviar os dados."); }, 100);
    }
})