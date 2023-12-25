// Função para adicionar animação e remover
function adicionarAnimacaoERemover(elementoPaiId) {
    const elementoPai = document.getElementById(elementoPaiId);

    // Adicionar classes de animação
    elementoPai.classList.add('animate__animated', 'animate__fadeOut');

    // Aguardar a conclusão da animação (1 segundo)
    setTimeout(() => {
        // Remover o elemento pai
        elementoPai.remove();

    }, 1000);
}