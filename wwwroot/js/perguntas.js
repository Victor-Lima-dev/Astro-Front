

async function consultarPerguntas() {
    try {
        const response = await fetch(urlAPI + 'Requisicoes/ConsultarPerguntas', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const perguntas = await response.json();

        console.log("perguntas");

        criarCards(perguntas);

    } catch (error) {
        console.error('Erro na consulta de perguntas:', error.message);
    }
}


// Função para fazer a consulta de pergunta
function consultarPergunta(requisicaoId) {
    fetch(urlAPI + `Requisicoes/ConsultarPergunta?id=${requisicaoId}`, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Consulta de pergunta falhou");
            }
        })
        .then(function (pergunta) {
            // Chamar a função para gerar os elementos com base nos dados da pergunta
            const perguntaUnica = true;
            gerarElementosPergunta(pergunta, perguntaUnica);
        })
        .catch(function (error) {
            // Lógica para lidar com erros na consulta de pergunta
            alert("Ocorreu um erro na consulta de pergunta: " + error.message);
        });
}

// Função para gerar os elementos com base nos dados da pergunta
function gerarElementosPergunta1(pergunta) {

    // Criar os elementos HTML com base nos dados da pergunta
    var divPergunta = document.createElement("div");
    divPergunta.className = "home-questao";

    //adicionar as classes 'animate__animated', 'animate__fadeIn'

    divPergunta.classList.add('animate__animated', 'animate__fadeIn');

    var divEnunciado = document.createElement("div");
    divEnunciado.className = "home-enunciado";

    var h4Titulo = document.createElement("h4");
    h4Titulo.className = "home-titulo titulo";
    h4Titulo.textContent = "Astronomy Question";

    var pParagrafo = document.createElement("p");
    pParagrafo.className = "home-paragrafo questao-paragrafo paragrafo";
    pParagrafo.textContent = pergunta.conteudo;

    divEnunciado.appendChild(h4Titulo);
    divEnunciado.appendChild(pParagrafo);

    var divAlternativas = document.createElement("div");
    divAlternativas.className = "home-alternativas alternativas";

    pergunta.respostas.forEach(function (resposta, index) {
        //criar uma div para colocar o botão e o motivo da resposta estar errada

        var divAlternativa = document.createElement("div");
        divAlternativa.className = "alternativa-div";
        divAlternativa.id = 'resposta.id';

        var buttonAlternativa = document.createElement("button");
        buttonAlternativa.className = "alternativa";
        buttonAlternativa.classList.add("btn", "btn-primary");
        buttonAlternativa.textContent = resposta.conteudo;

        //adicionar um p para armazenar o motivo da resposta estar errada

        var pMotivo = document.createElement("p");
        pMotivo.className = "motivo";
        //deixar isso oculto
        pMotivo.classList.add('d-none');
        pMotivo.textContent = resposta.erro;
        pMotivo.id = `motivo_${index}`;

        var motivoId = `motivo_${index}`;

        // Atribuir um identificador único (id) a cada botão
        var alternativaId = `alternativa_${index}`;
        buttonAlternativa.id = alternativaId;

        // Adicione um evento de clique para processar a resposta
        buttonAlternativa.onclick = function () {
            processarResposta(resposta, alternativaId, pergunta, motivoId);
        };

        divAlternativa.appendChild(buttonAlternativa);
        divAlternativa.appendChild(pMotivo);

        divAlternativas.appendChild(divAlternativa);
    });


    //criar div para armazenar o paragrafo com a explicação

    var divExplicacao = document.createElement("div");
    divExplicacao.className = "explicacao";
    divExplicacao.id = "explicacao";
    divExplicacao.classList.add('d-none');

    var pExplicacao = document.createElement("p");
    pExplicacao.className = "explicacao-paragrafo";
    pExplicacao.textContent = pergunta.explicacao;

    divExplicacao.appendChild(pExplicacao);


    divPergunta.appendChild(divEnunciado);
    divPergunta.appendChild(divAlternativas);
    divPergunta.appendChild(divExplicacao);

    // Substituir o conteúdo anterior pelo novo
    var paragrafoStatus = document.getElementById("divPergunta");
    paragrafoStatus.innerHTML = "";
    paragrafoStatus.appendChild(divPergunta);
}








// Função para gerar os elementos com base nos dados da pergunta
function gerarElementosPergunta(pergunta, perguntaUnica, perguntas = []) {



    // Criar os elementos HTML com base nos dados da pergunta
    var divContainer = document.createElement("div");
    divContainer.className = "container container-principal container-responder";


    if (!perguntaUnica)
    {
        var totalQuestoes = perguntas.length;
        var numQuestao = perguntas.indexOf(pergunta) + 1;

        var divContadorQuestao = document.createElement("div");
        divContadorQuestao.className = "divContatorQuestao";
        var spanContadorQuestao = document.createElement("span");
        spanContadorQuestao.id = "contadorQuestao";
        spanContadorQuestao.textContent = "Question " + numQuestao + " of " + totalQuestoes;
        divContadorQuestao.appendChild(spanContadorQuestao);
    }
  

    var divTitulo = document.createElement("div");
    divTitulo.className = "titulo";
    var h2TituloQuestao = document.createElement("h2");
    h2TituloQuestao.id = "tituloQuestao";
    h2TituloQuestao.textContent = pergunta.conteudo;
    divTitulo.appendChild(h2TituloQuestao);

    var divAlternativas = document.createElement("div");
    divAlternativas.className = "alternativas";

    pergunta.respostas.forEach(function (resposta, index) {
        var buttonAlternativa = document.createElement("button");

        var alternativaId = `alternativa_${index}`;
        
        buttonAlternativa.textContent = resposta.conteudo;

        var pMotivo = document.createElement("p");
        pMotivo.className = "motivo";
        //deixar isso oculto
        pMotivo.classList.add('d-none', "motivos");
        pMotivo.textContent = resposta.erro;
        pMotivo.id = `motivo_${index}`;

        var motivoId = `motivo_${index}`;
        
        // Atribuir um identificador único (id) a cada botão
 
        buttonAlternativa.id = alternativaId;

        // Adicionar um evento de clique para processar a resposta
        buttonAlternativa.onclick = function () {
            processarResposta(resposta, alternativaId, pergunta, motivoId);
        };


       
        divAlternativas.appendChild(buttonAlternativa);
        divAlternativas.appendChild(pMotivo);
    });

   


    if (!perguntaUnica)
    {
        var divControleQuestao = document.createElement("div");
        divControleQuestao.className = "controleQuestao";
        var buttonNext = document.createElement("button");
        buttonNext.textContent = "Next";
        // Adicionar evento de clique para ir para a próxima questão
        buttonNext.onclick = function () {

            nextQuestion(perguntas, perguntas.indexOf(pergunta));
        };
        var buttonPrevious = document.createElement("button");
        buttonPrevious.textContent = "Previous";
        // Adicionar evento de clique para voltar para a questão anterior
        buttonPrevious.onclick = function () {
            previousQuestion(perguntas, perguntas.indexOf(pergunta));
        };
    
        divControleQuestao.appendChild(buttonNext);
        divControleQuestao.appendChild(buttonPrevious);

    }

    if (!perguntaUnica)
    {
        divContainer.appendChild(divContadorQuestao);
    }

    divContainer.appendChild(divTitulo);
    divContainer.appendChild(divAlternativas);

       //adicionar explicação
       var divExplicacao = document.createElement("div");
       divExplicacao.className = "explicacao";
       divExplicacao.id = "explicacao";
       divExplicacao.classList.add('d-none');
   
       var pExplicacao = document.createElement("p");
       pExplicacao.className = "explicacao-paragrafo";
       pExplicacao.textContent = pergunta.explicacao;
   
       divExplicacao.appendChild(pExplicacao);
   
       divContainer.appendChild(divExplicacao);

    if (!perguntaUnica)
    {
        divContainer.appendChild(divControleQuestao);
    }

  

    // Substituir o conteúdo anterior pelo novo
    var divPerguntaAntiga = document.getElementById("divPergunta");
    divPerguntaAntiga.innerHTML = "";
    divPerguntaAntiga.appendChild(divContainer);
}



function nextQuestion(perguntas, index) {
            var perguntaAtual = perguntas[index];
            if (index === perguntas.length - 1) {
            gerarElementosPergunta(perguntas[0], false, perguntas);
                
            }    
            // A próxima questão não é a última
            gerarElementosPergunta(perguntas[perguntas.indexOf(perguntaAtual) + 1], false, perguntas);
}

function previousQuestion(perguntas, index) {
    var perguntaAtual = perguntas[index];
    if (index === 0) {
        gerarElementosPergunta(perguntas[perguntas.length - 1], false, perguntas);
    }
    // A próxima questão não é a última
    gerarElementosPergunta(perguntas[perguntas.indexOf(perguntaAtual) - 1], false, perguntas);
}


// Função para criar cards de perguntas
function criarCards(perguntas) {
    const cardContainer = document.getElementById('cardContainer');

    console.log("cards");
    //contar quantas perguntas tem

    var quantidadePerguntas = perguntas.length;

    console.log(quantidadePerguntas);

    cardContainer.innerHTML = ''; // Limpa o conteúdo atual

    perguntas.forEach((pergunta, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3', 'pergunta-card', 'animate__animated', 'animate__fadeIn');

        // Adiciona o evento de clique ao card
        card.addEventListener('click', function () {
            
            const idRequisicao = pergunta.requisicaoId;

            consultarPergunta(idRequisicao);

            togglePerguntasElemento();

            substituirBotaoMostrarPerguntas();

        });

        const divBotoes = document.createElement('div');
        divBotoes.classList.add('botoes');

        const svgDeletar = document.createElement('img');
        svgDeletar.src = "/img/garbage.svg";
        svgDeletar.alt = "Deletar pergunta";

        svgDeletar.addEventListener('click', function (event) {
            event.stopPropagation();
            deletarPergunta(pergunta.id);
        });

        divBotoes.appendChild(svgDeletar);

     

        const svgEditar = document.createElement('img');
        svgEditar.src = "/img/edit.svg";
        svgEditar.alt = "Editar pergunta";

        svgEditar.addEventListener('click', function (event) {
            event.stopPropagation();
            destruirElementosIndex();
            criarEstruturaPergunta(pergunta);
        });

        divBotoes.appendChild(svgEditar);

     

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const numeroPergunta = document.createElement('h5');
        numeroPergunta.classList.add('card-title');
        numeroPergunta.textContent = `Pergunta ${index + 1}`;

        const conteudoPergunta = document.createElement('p');
        conteudoPergunta.classList.add('card-text');
        conteudoPergunta.textContent = pergunta.conteudo;

        const tagsPergunta = document.createElement('ul');
        tagsPergunta.classList.add('list-inline', 'tag-ul');

        pergunta.tags.forEach(tag => {
            const tagItem = document.createElement('li');
            tagItem.classList.add('list-inline-item', 'tag-pergunta');
            tagItem.textContent = tag;
            tagsPergunta.appendChild(tagItem);
            
        });

        cardBody.appendChild(numeroPergunta);
        cardBody.appendChild(conteudoPergunta);
        cardBody.appendChild(tagsPergunta);
        cardBody.appendChild(divBotoes);

        card.appendChild(cardBody);
        cardContainer.appendChild(card);
    });
}


async function pesquisarQuestoes() {
    try {
        const inputElement = document.getElementById('pesquisaQuestoes');
        const searchTerm = inputElement.value;

        //limpar o campo de pesquisa


         if (searchTerm === '') {
        
          consultarPerguntas();

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

        criarCards(questoes);
    


    } catch (error) {
        console.error('Erro ao pesquisar Questoes:', error.message);
    }
}




function pesquisarComDebounce() {
    // Limpar o temporizador anterior, se existir
    clearTimeout(debounceTimer);

    // Configurar um novo temporizador
    debounceTimer = setTimeout(function () {
        // Função a ser chamada após um atraso
        pesquisarQuestoes();
    }, 500); // Ajuste o valor do atraso conforme necessário
}