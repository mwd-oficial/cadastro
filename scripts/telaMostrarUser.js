async function mostrarUser(usernamep) {
    telaCarregamento.style.display = "flex";
    try {
        const res = await axios.post(`${API_URL}/pegarUserInfo`, { username: usernamep });
        document.querySelector("#img-div img").src = res.data.imagem !== "" ? res.data.imagem : "avatar.png";
        document.querySelector("#username-p").innerHTML = `@${res.data.username}`
        telaCarregamento.style.display = "none";
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
        telaCarregamento.style.display = "none";
        setTimeout(() => { alert("Erro ao exibir os dados"); }, 100);
    }
}