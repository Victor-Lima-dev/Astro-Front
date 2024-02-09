let perguntasSelecionadasEditar = [];

function editarListaHTML(perguntas) {

    
    const elementoEditar = document.getElementsByClassName('editarLista')[0];
    //limpar o elemento

    elementoEditar.innerHTML = '';

    const listaPerguntasUl = document.createElement('ul');
    listaPerguntasUl.classList.add('list-group', 'perguntasElemento', 'listaElemento');
    listaPerguntasUl.id = 'listaPerguntasUl';



    const divPerguntas = document.createElement('div');
    divPerguntas.classList.add('perguntas', 'perguntasElemento', 'listaElemento');
    divPerguntas.id = 'divPerguntasCaixa';

    const divPesquisa = document.createElement('div');
    divPesquisa.id = 'pesquisa';
    divPesquisa.classList.add('animate__animated', 'animate__fadeIn', 'tagsBox');

    const labelQuestoes = document.createElement('label');
    labelQuestoes.classList.add('titulo');
    labelQuestoes.setAttribute('for', 'pesquisaQuestoes');
    labelQuestoes.textContent = 'Pesquisar Questoes:';

    const inputQuestoes = document.createElement('input');
    inputQuestoes.type = 'text';
    inputQuestoes.id = 'pesquisaQuestoesListaEditar';
    inputQuestoes.setAttribute('oninput', 'pesquisarComDebounceListasEditar()');

    const labelTags = document.createElement('label');
    labelTags.classList.add('titulo');
    labelTags.setAttribute('for', 'pesquisaTags');
    labelTags.textContent = 'Pesquisar Tags:';

    const inputTags = document.createElement('input');
    inputTags.type = 'text';
    inputTags.id = 'pesquisaTags';
    inputTags.setAttribute('oninput', 'pesquisarTagsCallBack(criarListaDeTagsLista)');

    const botaoLimpar = document.createElement('button');
    botaoLimpar.classList.add('home-botao', 'botao', 'btn', 'btn-primary');
    botaoLimpar.textContent = 'Limpar';
    botaoLimpar.setAttribute('onclick', 'resetarQuantidadeTAGs(), consultarPerguntasComCallback(criarListaPerguntas)');

    const botaoMais = document.createElement('button');
    botaoMais.classList.add('home-botao', 'botao', 'btn', 'btn-primary');
    botaoMais.textContent = 'Mais';
    botaoMais.setAttribute('onclick', 'aumentarQuantidadeTAGs()');

    const divListaPerguntas = document.createElement('div');
    divListaPerguntas.id = 'divPerguntas';
    //divListaPerguntas.classList.add('perguntasElemento', 'listaElemento');

    const divListaPerguntasSelecionadas = document.createElement('div');
    divListaPerguntasSelecionadas.id = 'divPerguntasSelecionadas';

    divPesquisa.appendChild(divListaPerguntas);
    divPesquisa.appendChild(divListaPerguntasSelecionadas);

    

    divPesquisa.appendChild(labelQuestoes);
    divPesquisa.appendChild(inputQuestoes);
    divPesquisa.appendChild(labelTags);
    divPesquisa.appendChild(inputTags);
    divPesquisa.appendChild(botaoLimpar);
    divPesquisa.appendChild(botaoMais);

    const listaTags = document.createElement('ul');
    listaTags.id = 'listaDeTagsLista';
    listaTags.classList.add('d-none', 'perguntasElemento', 'listaElemento');

    divPerguntas.appendChild(divPesquisa);
    divPerguntas.appendChild(listaTags);

    elementoEditar.appendChild(divPerguntas);

    elementoEditar.appendChild(listaPerguntasUl);

    perguntasPresentesNaLista(perguntas);
}
;


function criarListaPerguntasParaEditar(perguntas) {

    const listaPerguntas = document.getElementById('listaPerguntasUl');

    // Limpa a lista de perguntas
    listaPerguntas.innerHTML = '';

    const listaPerguntasSelecionadas = document.getElementById('divPerguntasSelecionadas');

    listaPerguntasSelecionadas.innerHTML = '';
    
    perguntas.forEach((pergunta) => {
        // Cria um item de lista usando Bootstrap
        const itemLista = document.createElement('li');
        itemLista.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        // Cria um checkbox para cada pergunta
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = pergunta.id;

        // Usa o id da pergunta como id do checkbox
        checkbox.id = pergunta.id;

        checkbox.addEventListener('change', () => handleCheckboxChangeLogicEditar(checkbox));

        // Adiciona o texto da pergunta ao lado do checkbox
        const label = document.createElement('label');
        label.textContent = pergunta.conteudo;
        label.setAttribute('for', pergunta.id);

        // Adiciona o checkbox e o texto ao item da lista
        itemLista.appendChild(checkbox);
        itemLista.appendChild(label);

        // Adiciona o item da lista à lista de perguntas
        listaPerguntas.appendChild(itemLista);

        
    });

    //comparar os ids dos checkbox com os ids das perguntas selecionadas e marcar os checkboxs

    perguntasSelecionadasEditar.forEach((perguntaSelecionada) => {
        const checkbox = document.getElementById(perguntaSelecionada.id);
        checkbox.checked = true;
    });

   
}


function perguntasPresentesNaLista(perguntas) {
   //limpar o array de perguntas selecionadas
    perguntasSelecionadasEditar = [];
    perguntasSelecionadasEditar = perguntas;
}



function pesquisarComDebounceListasEditar() {
    // Limpar o temporizador anterior, se existir
    clearTimeout(debounceTimer);

    // Configurar um novo temporizador
    debounceTimer = setTimeout(function () {
        // Função a ser chamada após um atraso
        pesquisarQuestoesListasEditar();
    }, 500); // Ajuste o valor do atraso conforme necessário
}


async function pesquisarQuestoesListasEditar() {
    try {
        const inputElement = document.getElementById('pesquisaQuestoesListaEditar');
        const searchTerm = inputElement.value;

        //limpar o campo de pesquisa


         if (searchTerm === '') {
        
            consultarPerguntasComCallback(criarListaPerguntasParaEditar);

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


        criarListaPerguntasParaEditar(questoes);
    


    } catch (error) {
        console.error('Erro ao pesquisar Questoes:', error.message);
    }
}


// Função para lidar com a lógica de adição/remoção da pergunta selecionada
function handleCheckboxChangeLogicEditar(checkbox) {
    const idPergunta = checkbox.value;
    const textoPergunta = checkbox.nextSibling.textContent;

    // Verifica se o checkbox foi marcado ou desmarcado
    if (checkbox.checked) {
        // Se marcado, adiciona o ID e o texto à lista de perguntas selecionadas
        perguntasSelecionadasEditar.push({ id: idPergunta, texto: textoPergunta });
        console.log(perguntasSelecionadasEditar);
    } else {
        // Se desmarcado, remove o item da lista de perguntas selecionadas
        perguntasSelecionadasEditar = perguntasSelecionadasEditar.filter(item => item.id !== idPergunta);
        console.log(perguntasSelecionadasEditar);
    }
}