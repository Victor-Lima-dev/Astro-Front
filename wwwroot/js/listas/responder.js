// Função para responder a uma lista de perguntas
function responderLista(lista) {
    // Limpa o conteúdo atual do elemento "responderLista"
    const responderListaElement = document.getElementById('responderLista');
    if (responderListaElement) {
        responderListaElement.innerHTML = '';
    } else {
        console.error('Elemento "responderLista" não encontrado.');
        return;
    }

    // Adiciona a estrutura HTML para exibir as perguntas da lista
    const listaHTML = document.createElement('div');
    listaHTML.classList.add('lista-perguntas');

    // Itera sobre as perguntas na lista
    lista.forEach((pergunta, index) => {
        const perguntaItem = document.createElement('div');
        perguntaItem.classList.add('pergunta-item','btn' ,'btn-primary');

        // Adiciona o conteúdo da pergunta
        perguntaItem.textContent = pergunta.conteudo;

        // Adiciona um evento de clique para carregar a pergunta no centro do local ao ser clicada
        perguntaItem.addEventListener('click', function () {
            // Chama a função para gerar a pergunta no centro do local
            gerarElementosPergunta(pergunta);
        });

        // Adiciona a pergunta à lista HTML
        listaHTML.appendChild(perguntaItem);
        gerarElementosPergunta(pergunta);
    });

    // Adiciona a lista HTML ao local para responder a lista
    responderListaElement.appendChild(listaHTML);
}