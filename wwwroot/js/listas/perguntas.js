// Array para armazenar IDs das perguntas selecionadas
let perguntasSelecionadas = [];

function criarListaPerguntas(perguntas) {

    const listaPerguntas = document.getElementById('listaDePerguntas');
    const listaPerguntasSelecionadas = document.getElementById('listaPerguntasSelecionadas');



    // Limpa o conteúdo atual das listas
    listaPerguntas.innerHTML = '';

    //listaPerguntasSelecionadas.innerHTML = '';

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



function pesquisarComDebounceListas() {
    // Limpar o temporizador anterior, se existir
    clearTimeout(debounceTimer);

    // Configurar um novo temporizador
    debounceTimer = setTimeout(function () {
        // Função a ser chamada após um atraso
        pesquisarQuestoesListas();
    }, 500); // Ajuste o valor do atraso conforme necessário
}


async function pesquisarQuestoesListas() {
    try {
        const inputElement = document.getElementById('pesquisaQuestoesLista');
        const searchTerm = inputElement.value;

        //limpar o campo de pesquisa


         if (searchTerm === '') {
        
            consultarPerguntasComCallback(criarListaPerguntas);

           return;
         }
   
        const response = await fetch(`http://24.199.100.244:8002/api/Requisicoes/ProcurarQuestao?texto=${searchTerm}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const questoes = await response.json();


    console.log(questoes);
    console.log(searchTerm);

    criarListaPerguntas(questoes);
    


    } catch (error) {
        console.error('Erro ao pesquisar Questoes:', error.message);
    }
}
