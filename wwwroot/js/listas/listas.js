// Função para obter e exibir as listas
async function obterListas() {
    try {
    
        const response = await fetch(urlAPI + 'Listas/RetornarTodasListas', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const listas = await response.json();

        criarCardsDeListas1(listas);
        removerSpinner();

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
            togglePerguntasElemento();
            apagarElementosParaResponder();
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

        //limitar a quantidade de tags a serem exibidas

        const tagsUnicasLimitadas = tagsUnicas.slice(0, 3);

        tagsUnicasLimitadas.forEach(tag => {
            const tagItem = document.createElement('li');
            tagItem.classList.add('list-inline-item', 'tag-pergunta');
            tagItem.textContent = tag;
            tagsLista.appendChild(tagItem);
        });

          // Adicionar botão "Deletar" a cada card
          const btnDeletar = document.createElement('button');
          btnDeletar.classList.add('btn', 'btn-danger', 'mr-2');
          btnDeletar.textContent = 'Deletar';
          btnDeletar.addEventListener('click', (event) => {
              event.stopPropagation(); // Impedir a propagação do evento de clique para o card
              deletarLista(lista.id);
          });
          
          // Adicionar botão "Editar" a cada card
          const btnEditar = document.createElement('button');
          btnEditar.classList.add('btn', 'btn-warning', 'mr-2');
          btnEditar.textContent = 'Editar';
          btnEditar.addEventListener('click', (event) => {
              event.stopPropagation(); // Impedir a propagação do evento de clique para o card


              capturarPerguntasDaLista(lista.perguntas);
              
              mostrarPerguntasDaLista(lista.perguntas, lista.id);

              
              ApagarElementosParaEditar();
              consultarPerguntasComCallback(mostrarPerguntasDisponiveis);
              perguntasPresentesNaLista(lista.perguntas);
          });

        cardBody.appendChild(numeroLista);
        cardBody.appendChild(nomeLista);
        cardBody.appendChild(descricaoLista);
        cardBody.appendChild(tagsLista);

        // Adicionar botão "Deletar" a cada card

        cardBody.appendChild(btnDeletar);
        cardBody.appendChild(btnEditar);


        card.appendChild(cardBody);
        cardListas.appendChild(card);
    });
}

// Função para criar cards de listas
function criarCardsDeListas1(listas) {

    //verificar se existe o elemento selecionarPerguntas e remover

    if(document.querySelector('.selecionarPerguntas') !== null)
    {
        const selecionarPerguntas = document.querySelector('.selecionarPerguntas');
        selecionarPerguntas.remove();
    }


    const cardListas = document.getElementById('cardListas');
    
    cardListas.innerHTML = ''; 


    const containerPrincipal = document.createElement('div');
    containerPrincipal.classList.add('container', 'container-principal');


    const tituloNovaLista = document.createElement('div');
    tituloNovaLista.classList.add('tituloNovaLista');

    const parte2 = document.createElement('div');
    parte2.classList.add('parte2');

    //adicionar as classes de animação

    parte2.classList.add('animate__animated', 'animate__fadeIn');

    const parte21 = document.createElement('div');
    parte21.classList.add('parte21');

    const h2 = document.createElement('h2');
    h2.textContent = 'Study with Lists';

    const span = document.createElement('span');
    span.textContent = 'generated with IA';

    const button = document.createElement('button');

    button.textContent = 'Criar Lista';


    button.addEventListener('click', () => {
        toggleListaElemento();
        consultarPerguntasComCallback(criarListaPerguntas);
        adicionarAnimacaoERemover('cardListas');
        toggleElementEntrar('entrarElementos');
        togglePerguntasElemento();
        apagarElementosParaCriarLista();
    });
    const divImg = document.createElement('div');
    divImg.classList.add('divImg');

    const img = document.createElement('img');
    img.src = '/img/astronauta.svg';
    img.alt = 'Imagem de um astronauta';

    divImg.appendChild(img);

    parte21.appendChild(h2);
    parte21.appendChild(span);
    parte21.appendChild(button);


    parte2.appendChild(parte21);
    parte2.appendChild(divImg);

    const divParte3 = document.createElement('div');
    divParte3.classList.add('parte3');

    //adicionar as classes de animação

    divParte3.classList.add('animate__animated', 'animate__fadeIn');



    const tituloP3 = document.createElement('div');
    tituloP3.classList.add('titulo-p3');

    const h5 = document.createElement('h5');
    h5.textContent = 'Listas';

    //criar esse elemento
    //<input type="text" id="pesquisaQuestoesLista" oninput="pesquisarComDebounceListas()">

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'pesquisarListas';
    input.placeholder = 'Pesquisar Listas...';
    input.addEventListener('input', pesquisarComAtrasoListas);

    
    tituloP3.appendChild(h5);
    tituloP3.appendChild(input);

    divParte3.appendChild(tituloP3);

    const divListas = document.createElement('div');
    divListas.classList.add('listas');


    listas.forEach((lista, index) => {
        

        const divLista = document.createElement('div');
        divLista.classList.add('lista');
        const p = document.createElement('p');
        p.textContent = lista.nome;

        const divListaSVG = document.createElement('div');
        divListaSVG.classList.add('listaSVG');

        const img = document.createElement('img');
        img.src = '/img/tech.svg';
        img.alt = '';

        divListaSVG.appendChild(img);

        divLista.appendChild(p);
        divLista.appendChild(divListaSVG);

        // Adicionar um event listener para quando o card for clicado
        divLista.addEventListener('click', () => {
           togglePerguntasElemento();
           apagarElementosParaResponder();
           // Chamar a função adicionarAnimacaoERemover e, ao finalizar, chamar a responderLista
           adicionarAnimacaoERemoverCallBack('cardListas', () => responderLista(lista.perguntas));
       });

        divListas.appendChild(divLista);

        
    });

    containerPrincipal.appendChild(tituloNovaLista);
    containerPrincipal.appendChild(parte2);
    containerPrincipal.appendChild(divParte3);

    divParte3.appendChild(divListas);

    cardListas.appendChild(containerPrincipal);


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

let html = `
    <div class="selecionarPerguntas container mt-3">
        <ul id="listaDePerguntas" class=""></ul>
        <div class="formPerguntasSelecionadas">
            <form id="formPerguntaSelecionadas" class="perguntasElemento listaElemento">
                <h1>Lista</h1>
                <label for="inputNome">Nome:</label>
                <input type="text" id="inputNome" name="nome" class="form-control" placeholder="Digite o nome">
                <label for="inputDescricao">Descrição:</label>
                <input type="text" id="inputDescricao" name="descricao" class="form-control" placeholder="Digite a descrição">
                <button id="btnEnviarLista" class="btn btn-primary" onclick="enviarListaPerguntas()">Enviar Lista</button>
                <ul id="listaPerguntasSelecionadas" class="list-group"></ul>
            </form>
        </div>
    </div>
`;

document.querySelector('main').insertAdjacentHTML('beforeend', html);

    const listaPerguntas = document.getElementById('listaDePerguntas');

    const listaPerguntasSelecionadas = document.getElementById('listaPerguntasSelecionadas');

    // Limpa o conteúdo atual das listas
    listaPerguntas.innerHTML = '';
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

        checkbox.addEventListener('change', () => handleCheckboxChange(checkbox));

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

    perguntasSelecionadas.forEach((perguntaSelecionada) => {
        const checkbox = document.getElementById(perguntaSelecionada.id);
        checkbox.checked = true;
    });

    updateVisualRepresentation();
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
// Função para lidar com a lógica de adição/remoção da pergunta selecionada
function handleCheckboxChangeLogic(checkbox) {
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

    // Chama a função para atualizar a exibição visual
    updateVisualRepresentation();
}

// Função para criar a representação visual da lista de perguntas selecionadas
function updateVisualRepresentation() {
    
    const listaPerguntasSelecionadas = document.getElementById('listaPerguntasSelecionadas');
    listaPerguntasSelecionadas.innerHTML = '';

    perguntasSelecionadas.forEach((perguntaSelecionada) => {
        const itemSelecionado = document.createElement('li');
        itemSelecionado.textContent = `${perguntaSelecionada.texto}`;

        // Adicionar um botão "Remover" com as classes do Bootstrap
        const btnRemover = document.createElement('button');
        btnRemover.classList.add('btn', 'btn-danger', 'ml-auto', 'mt-2'); // Adiciona 'ml-auto' para alinhar à direita e 'mt-2' para dar margem superior
        btnRemover.textContent = 'Remover';
        btnRemover.addEventListener('click', (event) => {
            event.stopPropagation(); // Impedir a propagação do evento de clique para o card

            removerPerguntaDaLista(perguntaSelecionada.id);
            desmarcarCheckbox(perguntaSelecionada.id);
        });

        itemSelecionado.appendChild(btnRemover);

        listaPerguntasSelecionadas.appendChild(itemSelecionado);
    });
}


// Função para lidar com a alteração do estado do checkbox
function handleCheckboxChange(checkbox) {
    handleCheckboxChangeLogic(checkbox);
}

async function pesquisarListas() {
    try {
        const inputElement = document.getElementById('pesquisarListas');
        const searchTerm = inputElement.value;

        //limpar o campo de pesquisa


         if (searchTerm === '') {
        
            obterListas();

           return;
         }
   
        const response = await fetch(urlAPI + `Listas/ProcurarLista?nome=${searchTerm}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const listas = await response.json();


    criarCardsDeListas1(listas);
    


    } catch (error) {
        console.error('Erro ao pesquisar Questoes:', error.message);
    }
}

function pesquisarComAtrasoListas() {
    // Limpar o temporizador anterior, se existir
    clearTimeout(debounceTimer);

    // Configurar um novo temporizador
    debounceTimer = setTimeout(function () {
        // Função a ser chamada após um atraso
        pesquisarListas()
    }, 500); // Ajuste o valor do atraso conforme necessário
}


async function deletarLista(id) {
    try {
        const response = await fetch(urlAPI + `Listas/DeletarLista?id=${id}`, {
            method: 'DELETE', // Alterado para DELETE
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        alert("Lista deletada com sucesso!");

        // Atualizar a lista de listas

        location.reload();

    } catch (error) {
        console.error('Erro ao deletar Lista:', error.message);
    }
}

async function capturarPerguntasDaLista(lista)
{

        // Itera sobre as perguntas na lista e adiciona o id de cada pergunta ao array
        lista.forEach((pergunta) => {

            perguntasSelecionadas.push(pergunta);
            
        });
}


//função para mostrar as perguntas da lista selecionada

function mostrarPerguntasDaLista(perguntas, listaId)
{
    const listaPerguntasSelecionadas = document.getElementById('listaPerguntasSelecionadas');

    editarListaHTML(perguntas, listaId);

    //limpar o array de perguntas selecionadas

    perguntasSelecionadasEditar = [];

    // Limpa o conteúdo atual das listas
    listaPerguntasSelecionadas.innerHTML = '';

    updateVisualRepresentation();

}
//função para quando remover a pergunta da lista de perguntas selecionadas o checkbox desmarcar

function desmarcarCheckbox(id)
{

    const checkbox = document.getElementById(id);

    checkbox.checked = false;
}


//função para remover a pergunta da lista de array de perguntas selecionadas

function removerPerguntaDaLista(id)
{
    perguntasSelecionadas = perguntasSelecionadas.filter(item => item.id !== id);
    
   
    mostrarPerguntasDaLista(perguntasSelecionadas);
}

// Função para enviar a lista de perguntas selecionadas para o endpoint
async function editarListaPerguntas(id) {
    try {
        const listaPerguntasSelecionadas = perguntasSelecionadasEditar.map(pergunta => pergunta.id);

        //criar um form data

        const formData = new FormData();

        //adicionar no form data o id da lista
        formData.append('id', id);

    // Adicione a lista de perguntas selecionadas ao FormData como um campo JSON
        formData.append('lista', JSON.stringify(listaPerguntasSelecionadas));

        const response = await fetch(urlAPI + 'Listas/AtualizarPerguntasDaLista', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Adicione o token JWT, se necessário
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        location.reload();

        perguntasSelecionadas = [];

    } catch (error) {
        console.error('Erro ao enviar lista de perguntas:', error.message);
    }
}


// função para criar uma lista com as perguntas existentes para selecionar

//função para mostrar as perguntas da lista selecionada

function mostrarPerguntasDisponiveis(perguntas)
{
    const listaPerguntasSelecionadas = document.getElementById('listaDePerguntasEditar');

    
    consultarPerguntasComCallback(criarListaPerguntasParaEditar);

    
    

    // Limpa o conteúdo atual das listas
    listaPerguntasSelecionadas.innerHTML = '';


}
// function mostrarPerguntasDisponiveis(perguntas)
// {
//     const listaPerguntasSelecionadas = document.getElementById('listaDePerguntasEditar');

//     // Limpa o conteúdo atual das listas
//     listaPerguntasSelecionadas.innerHTML = '';

//     perguntas.forEach((pergunta) => {

//         const itemSelecionado = document.createElement('li');
//         itemSelecionado.textContent = `${pergunta.conteudo} (ID: ${pergunta.id})`;
//         listaPerguntasSelecionadas.appendChild(itemSelecionado);

//         //adicionar um botao remover

//         const btnRemover = document.createElement('button');
//         btnRemover.classList.add('btn', 'btn-danger', 'mr-2');
//         btnRemover.textContent = 'Adicionar';
//         btnRemover.addEventListener('click', (event) => {
//             event.stopPropagation(); // Impedir a propagação do evento de clique para o card
//             adicionarPerguntaDaLista(pergunta);
//             console.log(pergunta);
//         });

//         itemSelecionado.appendChild(btnRemover);
//     });

// }

//função para adicionar a pergunta selecionada a lista de perguntas selecionadas

function adicionarPerguntaDaLista(pergunta)
{
    perguntasSelecionadas.push(pergunta);
    mostrarPerguntasDaLista(perguntasSelecionadas);
    
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
   
        const response = await fetch(urlAPI + `Requisicoes/ProcurarQuestao?texto=${searchTerm}`, {
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



