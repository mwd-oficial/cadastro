// Tela principal
const API_URL = "https://backend-delta-lake.vercel.app";
//const API_URL = "http://localhost:3000";
const loader = document.querySelector("#loader");
const usersDiv = document.querySelector("#users-div");
const telaMostrarUser = document.querySelector("#tela-mostrar-user");


async function exibirUsers() {
    usersDiv.innerHTML = ""
    loader.style.display = "block";
    try {
        const res = await axios.get(`${API_URL}/users`);
        res.data.forEach(user => user.imagem = user.imagem !== "" ? `${user.imagem}?${new Date().getTime()}` : "" );
        const usersHTML = res.data.map((user, i) => `
                <div class="users" data-index="${i}"> 
                    <p>
                        <span class="img-bem-vindo">
                            <img src="${user.imagem !== "" ? user.imagem : "avatar.png"}">
                        </span>
                        @${user.username}
                    </p> 
                </div> 
                `).join('');
        usersDiv.innerHTML = usersHTML;
        loader.style.display = "none";

        document.querySelectorAll(".users").forEach((user, i) => {
            user.addEventListener("click", () => {
                const index = user.getAttribute("data-index"); 
                telaPrincipal.style.display = "none"; 
                telaMostrarUser.style.display = "block"; 
                mostrarUser(res.data[index].username);
            });
        });
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
        loader.style.display = "none";
        setTimeout(() => { alert("Erro ao exibir os dados"); }, 100);
    }
}
exibirUsers();

function sairConta() {
    imagensCarregadas.forEach(img => img.src = "avatar.png");
    navComConta.style.display = "none";
    navSemConta.style.display = "block";
    localStorage.setItem("email", "")
    localStorage.setItem("password", "")
    username = ""
}