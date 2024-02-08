// Função para responder a uma lista de perguntas
function responderLista(lista) {

    //limpar o conteudo do array de respostas
    respostasLista = [];
    perguntasRespondidas = [];

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

        //colocar o id da pergunta no botão

        perguntaItem.setAttribute('id', pergunta.id);

        // Adiciona o conteúdo da pergunta
        perguntaItem.textContent = pergunta.conteudo;

        // Adiciona um evento de clique para carregar a pergunta no centro do local ao ser clicada
        perguntaItem.addEventListener('click', function () {
            // Chama a função para gerar a pergunta no centro do local
            gerarElementosPergunta(pergunta);
            alterarEstiloBotao();
        });

        // Adiciona a pergunta à lista HTML
        listaHTML.appendChild(perguntaItem);
        gerarElementosPergunta(pergunta);
    });

    // Adiciona a lista HTML ao local para responder a lista
    responderListaElement.appendChild(listaHTML);
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
        quantidadeRespostas: respostasLista.length,
        quantidadePerguntasRespondidas: calcularTotalPerguntasRespondidas()
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
    console.log(perguntasRespondidas);
    return perguntasRespondidas.length;
    
}