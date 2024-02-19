// Função para responder a uma lista de perguntas
function responderLista(lista) {

    //limpar o conteudo do array de respostas
    respostasLista = [];
    perguntasRespondidas = [];
    const perguntaUnica = false;


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
        perguntaItem.classList.add('pergunta-item','btn', 'btn-secondary');

        //colocar o id da pergunta no botão

        perguntaItem.setAttribute('id', pergunta.id);

        // Adiciona o conteúdo da pergunta
        perguntaItem.textContent = pergunta.conteudo;

        // Adiciona um evento de clique para carregar a pergunta no centro do local ao ser clicada
        perguntaItem.addEventListener('click', function () {
            // Chama a função para gerar a pergunta no centro do local
            gerarElementosPergunta(pergunta, perguntaUnica, lista);
            alterarEstiloBotao();
        });

        // Adiciona a pergunta à lista HTML
        listaHTML.appendChild(perguntaItem);


        gerarElementosPergunta(pergunta , perguntaUnica, lista);
    });

    // Adiciona a lista HTML ao local para responder a lista
    responderListaElement.appendChild(listaHTML);

    //setar a variavel quantidadePerguntasLista com a quantidade de perguntas na lista

    quantidadePerguntasLista = lista.length;



   
    mostrarContadores(lista);
}

//array de respostasLista

let respostasLista = [];

function salvarResposta (perguntaId, booleano) {
    const resposta = {
        perguntaId: perguntaId,
        booleano: booleano
    };
    respostasLista.push(resposta);
    definirContadoresRespostasLista();
    atualizarContadores();
}

function alterarEstiloBotao () {
    //usar o array de respostas para alterar o estilo do botão
    respostasLista.forEach((resposta) => {
        const botao = document.getElementById(resposta.perguntaId);
        if (resposta.booleano) {
            botao.classList.remove('btn-primary');
            botao.classList.add('btn-success');
        } else {
            botao.classList.remove('btn-primary');
            botao.classList.add('btn-danger');
        }
    });
}

//funçao para separar os dados do array de respostas
function definirContadoresRespostasLista() {
    let contadores = {
        positivas: 0,
        negativas: 0,
        quantidadePerguntas: respostasLista.length,
        quantidadePerguntasRespondidas: calcularTotalPerguntasRespondidas(),
        quantidadeRestante:  quantidadePerguntasLista - calcularTotalPerguntasRespondidas() 
    };

    respostasLista.forEach((resposta) => {
        if (resposta.booleano) {
            contadores.positivas++;
        } else {
            contadores.negativas++;
        }
    });

    
    return contadores;
}

// Criar um método para calcular o total de perguntas respondidas sem repetição, conta respostas positivas e negativas
let perguntasRespondidas = [];

function calcularTotalPerguntasRespondidas() {
    respostasLista.forEach((resposta) => {


        if (!perguntasRespondidas.includes(resposta.perguntaId)) {
            perguntasRespondidas.push(resposta.perguntaId);
        }
    });
    return perguntasRespondidas.length;
    
}
let quantidadePerguntasLista;
function mostrarContadores()
{
    const caixaResponderLista = document.getElementsByClassName('caixaResponderLista ');

    
    //criar uma div para mostrar os contadores
    const divContadores = document.createElement('div');
    divContadores.classList.add('contadores');
    divContadores.id = 'contadores';

    //criar um paragrafo para mostrar a quantidade de perguntas respondidas
    const paragrafoPerguntasRespondidas = document.createElement('p');
    paragrafoPerguntasRespondidas.textContent = `Perguntas respondidas: ${calcularTotalPerguntasRespondidas()}`;
    
    //criar um paragrafo para mostrar a quantidade de respostas positivas
    const paragrafoRespostasPositivas = document.createElement('p');
    paragrafoRespostasPositivas.textContent = `Respostas positivas: ${definirContadoresRespostasLista().positivas}`;

    //criar um paragrafo para mostrar a quantidade de respostas negativas
    const paragrafoRespostasNegativas = document.createElement('p');
    paragrafoRespostasNegativas.textContent = `Respostas negativas: ${definirContadoresRespostasLista().negativas}`;

    //criar um parafrafo para mostrar a quantidade de perguntas restantes
    const paragrafoPerguntasRestantes = document.createElement('p');
    paragrafoPerguntasRestantes.textContent = `Perguntas restantes: ${definirContadoresRespostasLista().quantidadeRestante}`;

    //criar um paragrafo para mostrar a quantidade de perguntas
    const paragrafoQuantidadePerguntas = document.createElement('p');
    paragrafoQuantidadePerguntas.textContent = `Quantidade de perguntas: ${quantidadePerguntasLista}`;



    //adicionar os paragrafos na div
    divContadores.appendChild(paragrafoQuantidadePerguntas);
    divContadores.appendChild(paragrafoPerguntasRespondidas);
    divContadores.appendChild(paragrafoRespostasPositivas);
    divContadores.appendChild(paragrafoRespostasNegativas);
    divContadores.appendChild(paragrafoPerguntasRestantes);

    //adicionar a div na caixaResponderLista
    caixaResponderLista[0].appendChild(divContadores);
}

function atualizarContadores() {
 
    //verifica se existe uma div com o id contadores
    if (document.getElementById('contadores')) {
        document.getElementById('contadores').remove();
    }

    mostrarContadores();
}