const imagensCarregadas = document.querySelectorAll(".imagens");
var imagemInputs = document.querySelectorAll(".imagem-inputs");
var urlImagem, semFoto = true

imagemInputs.forEach(input => {
    input.addEventListener('change', function (event) {
        telaCarregamento.style.display = "flex"
        const input = event.target;
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = function () {
            telaCarregamento.style.display = "none"
            imagensCarregadas.forEach(img => {
                urlImagem = reader.result;
                img.src = urlImagem;
                semFoto = false
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });
});

document.querySelectorAll(".remover-foto").forEach(btn => {
    btn.addEventListener("click", () => {
        imagensCarregadas.forEach(img => img.src = "avatar.png");
        imagemInputs.forEach(input => input.value = "");
        semFoto = true;
    })
})