let perguntasSelecionadasEditar = [];
let perguntasTeste = [];

function editarListaHTML(perguntas, listaId) {
    //limpar os elementos que estao em cardListas
    const listas = document.getElementById('cardListas');
    listas.innerHTML = '';

    //criar um botao salvar
    const btnSalvar = document.createElement('button');
    btnSalvar.classList.add('btn', 'btn-success', 'mr-2');
    btnSalvar.textContent = 'Salvar';
    btnSalvar.addEventListener('click', (event) => {
        event.stopPropagation(); // Impedir a propagação do evento de clique para o card
        editarListaPerguntas(listaId);
    });

    const elementoEditar = document.getElementsByClassName('editarLista')[0];
    //limpar o elemento
    elementoEditar.innerHTML = '';

    const listaPerguntasUl = document.createElement('ul');
    listaPerguntasUl.classList.add('list-group', 'perguntasElemento', 'listaElemento');
    listaPerguntasUl.id = 'listaPerguntasUl';

    const divPerguntasUl = document.createElement('div');
    divPerguntasUl.classList.add('perguntas', 'perguntasElemento', 'listaElemento');
    divPerguntasUl.id = 'divPerguntasUl';

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

    if (document.getElementById('pesquisaTags') != null) {
        document.getElementById('pesquisaTags').remove();
    }

    const inputTags = document.createElement('input');
    inputTags.type = 'text';
    inputTags.id = 'pesquisaTags';
    inputTags.setAttribute('oninput', 'pesquisarTagsCallBack(criarListaDeTagsListaEditar,carregarTagsPaginacaoListaEditar)');

    const botaoLimpar = document.createElement('button');
    botaoLimpar.classList.add('home-botao', 'botao', 'btn', 'btn-primary');
    botaoLimpar.textContent = 'Limpar';
    botaoLimpar.setAttribute('onclick', 'resetarQuantidadeTAGsEditar(), consultarPerguntasComCallback(criarListaPerguntasParaEditar)');

    const botaoMais = document.createElement('button');
    botaoMais.classList.add('home-botao', 'botao', 'btn', 'btn-primary');
    botaoMais.textContent = 'Mais';
    botaoMais.setAttribute('onclick', 'aumentarQuantidadeTAGsEditar()');

    const divListaPerguntas = document.createElement('div');
    divListaPerguntas.id = 'divPerguntas';

    const divListaPerguntasSelecionadas = document.createElement('div');
    divListaPerguntasSelecionadas.id = 'divPerguntasSelecionadas';

    divPesquisa.appendChild(divListaPerguntas);

    divPesquisa.appendChild(labelQuestoes);
    divPesquisa.appendChild(inputQuestoes);
    divPesquisa.appendChild(labelTags);
    divPesquisa.appendChild(inputTags);
    divPesquisa.appendChild(botaoLimpar);
    divPesquisa.appendChild(botaoMais);

    const listaTags = document.createElement('ul');
    listaTags.id = 'listaDeTagsListaEditar';
    listaTags.classList.add('perguntasElemento', 'listaElemento');

    divPerguntas.appendChild(divPesquisa);
    divPerguntas.appendChild(listaTags);
    divPerguntas.appendChild(btnSalvar);
    elementoEditar.appendChild(divPerguntas);

    divPerguntasUl.appendChild(listaPerguntasUl);
    divPerguntasUl.appendChild(divListaPerguntasSelecionadas); 

    
    elementoEditar.appendChild(divPerguntasUl);
    perguntasPresentesNaLista(perguntas);
    carregarTagsPaginacaoListaEditar();

    perguntasTeste = perguntas;
};

function criarListaPerguntasParaEditar(perguntas) {

    const listaPerguntas = document.getElementById('listaPerguntasUl');

    // Limpa a lista de perguntas
    listaPerguntas.innerHTML = '';

    const listaPerguntasSelecionadas = document.getElementById('divPerguntasSelecionadas');

    listaPerguntasSelecionadas.innerHTML = '';
    
    perguntas.forEach((pergunta) => {
        // Cria um item de lista usando Bootstrap
        const itemLista = document.createElement('li');
        itemLista.classList.add('list-group-item' );

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

  

    criarListaPerguntasSelecionadas();

    marcarCheckBoxEditar();

   
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
   
        const response = await fetch(urlAPI + `Requisicoes/ProcurarQuestao?texto=${searchTerm}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const questoes = await response.json();


        console.log(perguntasSelecionadasEditar);
        criarListaPerguntasParaEditar(questoes);


         
        //marcarCheckBoxEditar();



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
        perguntasSelecionadasEditar.push({ id: idPergunta, conteudo: textoPergunta });
        


    } else {
        // Se desmarcado, remove o item da lista de perguntas selecionadas
        perguntasSelecionadasEditar = perguntasSelecionadasEditar.filter(item => item.id !== idPergunta);
        
    }

    criarListaPerguntasSelecionadas();
}

function ApagarElementosParaEditar() {
    const elementoPesquisaLista = document.getElementsByClassName('container-pesquisarListas')[0];
    const caixaResponderLista = document.getElementsByClassName('caixaResponderLista')[0];
    const selecionarPerguntas = document.getElementsByClassName('selecionarPerguntas')[0];
    const caixaLista = document.getElementById('cardListas');

    caixaLista.remove();
    elementoPesquisaLista.remove();
    caixaResponderLista.remove();
    selecionarPerguntas.remove();
}


function apagarElementosParaResponder()
{
    const editarLista = document.getElementsByClassName('editarLista')[0];
    const selecionarPerguntas = document.getElementsByClassName('selecionarPerguntas')[0];
    const perguntas = document.getElementsByClassName('perguntas')[0];
    const elementoPesquisaLista = document.getElementsByClassName('container-pesquisarListas')[0];



    selecionarPerguntas.remove();
    editarLista.remove();
    perguntas.remove();
    elementoPesquisaLista.remove();

}

function apagarElementosParaCriarLista()
{
    const editarLista = document.getElementsByClassName('editarLista')[0];
    const caixaResponderLista = document.getElementsByClassName('caixaResponderLista')[0];
    const elementoPesquisaLista = document.getElementsByClassName('container-pesquisarListas')[0];

    editarLista.remove();
    caixaResponderLista.remove();
    elementoPesquisaLista.remove();

}

function marcarCheckBoxEditar()
{

    console.log(perguntasSelecionadasEditar);
        perguntasSelecionadasEditar.forEach((perguntaSelecionada) => {
            console.log(perguntaSelecionada.id);

            //verificar se existe um checkbox com esse id

            if(document.getElementById(perguntaSelecionada.id) == null)
            {
                return;
            }

            const checkbox = document.getElementById(perguntaSelecionada.id);
            checkbox.checked = true;


        });

        //contar quantos checkboxs estao marcados
        const checkboxs = document.querySelectorAll('input[type="checkbox"]');
        const quantidadeCheckboxs = checkboxs.length;
        let quantidadeMarcados = 0;

        checkboxs.forEach((checkbox) => {
            if(checkbox.checked)
            {
                quantidadeMarcados++;
            }
        });

        console.log(quantidadeMarcados);
    
}

function criarListaPerguntasSelecionadas()
{
    const divPerguntasCaixa = document.getElementById('divPerguntasUl');

    //verificar se existe uma div com esse id divPerguntasSelecionadas

    if(document.getElementById('divPerguntasSelecionadas') != null)
    {
        document.getElementById('divPerguntasSelecionadas').remove();
    }



    const divListaPerguntasSelecionadas = document.createElement('div');
    divListaPerguntasSelecionadas.id = 'divPerguntasSelecionadas';

    console.log(perguntasSelecionadasEditar);


    perguntasSelecionadasEditar.forEach((perguntaSelecionada) => {
        const itemSelecionado = document.createElement('li');
        itemSelecionado.textContent = `${perguntaSelecionada.conteudo}`;

        // Adicionar um botão "Remover" com as classes do Bootstrap
        const btnRemover = document.createElement('button');
        btnRemover.classList.add('btn', 'btn-danger', 'ml-auto', 'mt-2'); // Adiciona 'ml-auto' para alinhar à direita e 'mt-2' para dar margem superior
        btnRemover.textContent = 'Remover';
        btnRemover.addEventListener('click', (event) => {
            event.stopPropagation(); // Impedir a propagação do evento de clique para o card

            removerPerguntaDaListaEditar(perguntaSelecionada.id);
            desmarcarCheckboxEditar(perguntaSelecionada.id);
        });

        itemSelecionado.appendChild(btnRemover);

        divListaPerguntasSelecionadas.appendChild(itemSelecionado);
    });

    divPerguntasCaixa.appendChild(divListaPerguntasSelecionadas);

}
  
function removerPerguntaDaListaEditar(idPergunta) {
    perguntasSelecionadasEditar = perguntasSelecionadasEditar.filter(item => item.id !== idPergunta);
    criarListaPerguntasSelecionadas();
}

function desmarcarCheckboxEditar(idPergunta) {
    const checkbox = document.getElementById(idPergunta);
    checkbox.checked = false;
}



// Função para criar a lista de TAGs no HTML
function criarListaDeTagsListaEditar(tags) {
    const listaDeTags = document.getElementById('listaDeTagsListaEditar');

    // Limpa o conteúdo atual da lista
    listaDeTags.innerHTML = '';

    // Itera sobre as TAGs e adiciona itens à lista
    tags.forEach(tag => {
        const itemDaLista = document.createElement('li');
        itemDaLista.textContent = tag.texto; // Substitua 'texto' pelo nome da propriedade da TAG

         // Adiciona as classes do Bootstrap
         itemDaLista.classList.add('btn', 'btn-primary', 'animate__animated', 'animate__fadeIn'); // Adicione as classes conforme necessário


        // Adiciona o evento de clique
        itemDaLista.addEventListener('click', function () {
            // Chama a função para fazer o POST no endpoint
            enviarTagParaPerguntasListaCallBack(tag.id, criarListaPerguntasParaEditar);
            obterEAtualizarTagsRelacionadasLista(tag.id);

            console.log(perguntasSelecionadasEditar);
            marcarCheckBoxEditar();

        });

        // Adiciona o item à lista
        listaDeTags.appendChild(itemDaLista);
    });

}


// Função para carregar as TAGs ao carregar a página
async function carregarTagsPaginacaoListaEditar() {
    try {
        
        const response = await fetch(urlAPI + `Requisicoes/RetornarTAGsPaginacao?quantidade=${quantidade}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const tags = await response.json();

        // Chama a função para criar a lista de TAGs com base nos dados
        criarListaDeTagsListaEditar(tags);

    } catch (error) {
        console.error('Erro ao carregar TAGs:', error);
    }
}


function aumentarQuantidadeTAGsEditar() {
    quantidade += 3;
    carregarTagsPaginacaoListaEditar();
}

//criar uma função que reseta a variavel quantidade e chama a função carregarTagsPaginacao

function resetarQuantidadeTAGsEditar() {
    quantidade = 3;
    carregarTagsPaginacaoListaEditar();
}


async function enviarTagParaPerguntasListaCallBack(tag, callback) {
    try {
        // Crie um objeto FormData para enviar dados como 'form-data'
        var formData = new FormData();

        formData.append('tagId', tag);

        const response = await fetch(urlAPI + 'Requisicoes/PerguntasPorTags', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const perguntas = await response.json();

        
        
        callback(perguntas);
     

    } catch (error) {
        console.error('Erro ao enviar TAG para PerguntasPorTags:', error.message);
    }
}

