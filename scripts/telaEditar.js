var usernameCadastrado, emailCadastrado

formEditar.addEventListener("submit", async function (event) {
    event.preventDefault();
    telaCarregamento.style.display = "flex";

    const usernameEditar = document.querySelector("#username-editar").value;
    const emailEditar = document.querySelector("#email-editar").value;
    const passwordEditar = document.querySelector("#password-editar").value;
    const imagemEditar = document.querySelector("#imagem-editar").files[0];

    const user = await axios.post(`${API_URL}/pegarUserInfo`, { username: usernameVar })
    const userId = user.data._id

    const formData = new FormData();
    formData.append("username", usernameEditar);
    formData.append("email", emailEditar);
    formData.append("password", passwordEditar);
    formData.append("imagem", imagemEditar);

    formData.append("usernameCadastrado", usernameCadastrado);
    formData.append("emailCadastrado", emailCadastrado);
    formData.append("semFoto", semFoto);

    try {
        const res = await axios.put(`${API_URL}/users/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log(res.data);
        telaCarregamento.style.display = "none";
        setTimeout(() => { alert(res.data.msg); }, 100);
        if (res.data.resultado) {
            usernameVar = usernameEditar;
            imagemVar = res.data.resultado.imagem !== "" ? `${res.data.resultado.imagem}?${new Date().getTime()}` : "";
            console.log("imagem: " + imagemVar)
            localStorage.setItem("email", JSON.stringify(emailEditar));
            localStorage.setItem("password", JSON.stringify(passwordEditar));
            setTimeout(userEntrado, 100);
        }
    } catch (erro) {
        console.error("Erro ao editar dados:", erro);
        telaCarregamento.style.display = "none";
        setTimeout(() => { alert("Erro ao editar dados"); }, 100);
    }
})


async function excluirConta() {
    telaCarregamento.style.display = "flex";
    try {
        const res = await axios.delete(`${API_URL}/excluir`, { data: { username: usernameVar } });
        console.log("username: " + usernameVar)
        console.log(res.data);
        telaCarregamento.style.display = "none";
        setTimeout(() => {
            alert("Conta excluida... Lamentamos ver você partir.");
            sairConta();
            irTelaPrincipal();
        }, 100);
    } catch (erro) {
        console.error('Erro ao excluir os dados:', erro);
        telaCarregamento.style.display = "none";
        setTimeout(() => { alert("Erro ao excluir os dados"); }, 100);
    };
};