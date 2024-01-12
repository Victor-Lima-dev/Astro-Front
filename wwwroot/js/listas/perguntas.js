// Array para armazenar IDs das perguntas selecionadas
let perguntasSelecionadas = [];

function criarListaPerguntas(perguntas) {

    const listaPerguntas = document.getElementById('listaDePerguntas');
    const listaPerguntasSelecionadas = document.getElementById('listaPerguntasSelecionadas');

    console.log("executou a função criarListaPerguntas()");

    // Limpa o conteúdo atual das listas
    listaPerguntas.innerHTML = '';
    listaPerguntasSelecionadas.innerHTML = '';

    perguntas.forEach((pergunta) => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3', 'pergunta-card', 'animate__animated', 'animate__fadeIn');

  
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const numeroPergunta = document.createElement('h5');
        numeroPergunta.classList.add('card-title');
        numeroPergunta.textContent = `Pergunta ${pergunta.conteudo}`;

        const conteudoPergunta = document.createElement('p');
        conteudoPergunta.classList.add('card-text');
        conteudoPergunta.textContent = pergunta.conteudo;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = pergunta.id;
        checkbox.addEventListener('change', () => handleCheckboxChange(checkbox));

        const label = document.createElement('label');
        label.textContent = 'Selecionar';

        // Adiciona os elementos ao card
        cardBody.appendChild(numeroPergunta);
        cardBody.appendChild(conteudoPergunta);
        cardBody.appendChild(checkbox);
        cardBody.appendChild(label);

        card.appendChild(cardBody);

        // Adiciona o card à lista de perguntas
        listaPerguntas.appendChild(card);
    });

    // Exibe as perguntas selecionadas na lista separada
    perguntasSelecionadas.forEach((perguntaSelecionada) => {
        const itemSelecionado = document.createElement('li');
        itemSelecionado.textContent = `${perguntaSelecionada.texto} (ID: ${perguntaSelecionada.id})`;
        listaPerguntasSelecionadas.appendChild(itemSelecionado);
    });
}


// Função para atualizar as listas na página
function atualizarListas() {
    // Limpar a lista de perguntas selecionadas no HTML
    const listaPerguntasSelecionadas = document.getElementById('listaPerguntasSelecionadas');
    listaPerguntasSelecionadas.innerHTML = '';

    // Desmarcar todos os checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Limpar o array de perguntas selecionadas
    perguntasSelecionadas = [];
}

// Função para lidar com a alteração do estado do checkbox
function handleCheckboxChange(checkbox) {
    const idPergunta = checkbox.value;
    const textoPergunta = checkbox.nextSibling.textContent;

    // Verifica se o checkbox foi marcado ou desmarcado
    if (checkbox.checked) {
        // Se marcado, adiciona o ID e o texto à lista de perguntas selecionadas
        perguntasSelecionadas.push({ id: idPergunta, texto: textoPergunta });
    } else {
        // Se desmarcado, remove o item da lista de perguntas selecionadas
        perguntasSelecionadas = perguntasSelecionadas.filter(item => item.id !== idPergunta);
    }

    // Atualiza a exibição das perguntas selecionadas na lista separada
    const listaPerguntasSelecionadas = document.getElementById('listaPerguntasSelecionadas');
    listaPerguntasSelecionadas.innerHTML = '';

    perguntasSelecionadas.forEach((perguntaSelecionada) => {
        const itemSelecionado = document.createElement('li');
        itemSelecionado.textContent = `${perguntaSelecionada.texto} (ID: ${perguntaSelecionada.id})`;
        listaPerguntasSelecionadas.appendChild(itemSelecionado);
    });

    // Exibe os IDs e textos das perguntas selecionadas no console (pode ser removido após testes)
    console.log('Perguntas Selecionadas:', perguntasSelecionadas);
}