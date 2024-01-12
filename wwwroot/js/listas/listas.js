// Função para obter e exibir as listas
async function obterListas() {
    try {
    
        const response = await fetch('http://24.199.100.244:8002/api/Listas/RetornarTodasListas', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const listas = await response.json();

        console.log('Listas:', listas);

        // Chamando a função para criar a tabela com as listas
        criarCardsDeListas(listas);

    } catch (error) {
        console.error('Erro ao obter listas:', error.message);
    }
}


// Função para criar cards de listas
function criarCardsDeListas(listas) {

    const cardListas = document.getElementById('cardListas');
    
    cardListas.innerHTML = ''; // Limpa o conteúdo atual

    listas.forEach((lista, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3', 'lista-card', 'animate__animated', 'animate__fadeIn','pergunta-card');


        //adicionar um event listener para quando o card for clicado, chamar adicionarAnimacaoERemover(elementoPaiId)

         // Adicionar um event listener para quando o card for clicado
         card.addEventListener('click', () => {
            // Chamar a função adicionarAnimacaoERemover e, ao finalizar, chamar a responderLista
            adicionarAnimacaoERemoverCallBack('cardListas', () => responderLista(lista.perguntas));
        });

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        cardBody.id = "cardLista";

        

        const numeroLista = document.createElement('h5');
        numeroLista.classList.add('card-title');
        numeroLista.textContent = `Lista ${index + 1}`;


        const nomeLista = document.createElement('p');
        nomeLista.classList.add('card-text');
        nomeLista.textContent = `Nome: ${lista.nome}`;

        const descricaoLista = document.createElement('p');
        descricaoLista.classList.add('card-text');
        descricaoLista.textContent = `Descrição: ${lista.descricao}`;

        const tagsUnicas = obterTagsUnicas(lista.perguntas);

        const tagsLista = document.createElement('ul');
        tagsLista.classList.add('list-inline', 'tag-ul');

        tagsUnicas.forEach(tag => {
            const tagItem = document.createElement('li');
            tagItem.classList.add('list-inline-item', 'tag-pergunta');
            tagItem.textContent = tag;
            tagsLista.appendChild(tagItem);
        });

        cardBody.appendChild(numeroLista);
        cardBody.appendChild(nomeLista);
        cardBody.appendChild(descricaoLista);
        cardBody.appendChild(tagsLista);

        card.appendChild(cardBody);
        cardListas.appendChild(card);
    });
}

// Função para obter tags únicas de uma lista de perguntas
function obterTagsUnicas(perguntas) {
    const tagsUnicas = new Set();

    perguntas.forEach(pergunta => {
        pergunta.taGs.forEach(tag => {
            tagsUnicas.add(tag.texto);
        });
    });

    return Array.from(tagsUnicas);
}


function criarListaPerguntas(perguntas) {
    const listaPerguntas = document.getElementById('listaDePerguntas');
    const listaPerguntasSelecionadas = document.getElementById('listaPerguntasSelecionadas');

    // Limpa o conteúdo atual das listas
    listaPerguntas.innerHTML = '';
    listaPerguntasSelecionadas.innerHTML = '';

    perguntas.forEach((pergunta) => {
        const itemLista = document.createElement('li');

        // Cria um checkbox para cada pergunta
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = pergunta.id;
        checkbox.addEventListener('change', () => handleCheckboxChange(checkbox));

        // Adiciona o texto da pergunta ao lado do checkbox
        const label = document.createElement('label');
        label.textContent = pergunta.conteudo;

        // Adiciona o checkbox e o texto ao item da lista
        itemLista.appendChild(checkbox);
        itemLista.appendChild(label);

        // Adiciona o item da lista à lista de perguntas
        listaPerguntas.appendChild(itemLista);
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