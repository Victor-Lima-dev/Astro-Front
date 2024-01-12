

async function consultarPerguntas() {
    try {
        const response = await fetch('http://24.199.100.244:8002/api/Requisicoes/ConsultarPerguntas', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const perguntas = await response.json();

        criarCards(perguntas);

    } catch (error) {
        console.error('Erro na consulta de perguntas:', error.message);
    }
}


// Função para fazer a consulta de pergunta
function consultarPergunta(requisicaoId) {
    fetch(`http://24.199.100.244:8002/api/Requisicoes/ConsultarPergunta?id=${requisicaoId}`, {
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
            gerarElementosPergunta(pergunta);
        })
        .catch(function (error) {
            // Lógica para lidar com erros na consulta de pergunta
            alert("Ocorreu um erro na consulta de pergunta: " + error.message);
        });
}

// Função para gerar os elementos com base nos dados da pergunta
function gerarElementosPergunta(pergunta) {
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
        var buttonAlternativa = document.createElement("button");
        buttonAlternativa.className = "alternativa";
        buttonAlternativa.classList.add("btn", "btn-primary");
        buttonAlternativa.textContent = resposta.conteudo;

        // Atribuir um identificador único (id) a cada botão
        var alternativaId = `alternativa_${index}`;
        buttonAlternativa.id = alternativaId;

        // Adicione um evento de clique para processar a resposta
        buttonAlternativa.onclick = function () {
            processarResposta(resposta, alternativaId);
        };
        divAlternativas.appendChild(buttonAlternativa);
    });

    divPergunta.appendChild(divEnunciado);
    divPergunta.appendChild(divAlternativas);

    // Substituir o conteúdo anterior pelo novo
    var paragrafoStatus = document.getElementById("divPergunta");
    paragrafoStatus.innerHTML = "";
    paragrafoStatus.appendChild(divPergunta);
}


// Função para criar cards de perguntas
function criarCards(perguntas) {
    const cardContainer = document.getElementById('cardContainer');

    cardContainer.innerHTML = ''; // Limpa o conteúdo atual

    perguntas.forEach((pergunta, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3', 'pergunta-card', 'animate__animated', 'animate__fadeIn');

        // Adiciona o evento de clique ao card
        card.addEventListener('click', function () {
            const idRequisicao = pergunta.requisicaoId;

            consultarPergunta(idRequisicao);

            //toggleElement('perguntasElemento');

            togglePerguntasElemento();

            substituirBotaoMostrarPerguntas();

        });

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

        card.appendChild(cardBody);
        cardContainer.appendChild(card);
    });
}


async function pesquisarQuestoes() {
    try {
        const inputElement = document.getElementById('pesquisarQuestoes');
        const searchTerm = inputElement.value;

        // if (searchTerm === '') {
        
        //     consultarPerguntas();

        //    return;
        //  }
   
        const response = await fetch(`http://localhost:5084/api/Requisicoes/ProcurarQuestao?texto=${searchTerm}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const questoes = await response.json();


        criarListaPerguntas(questoes);

    } catch (error) {
        console.error('Erro ao pesquisar Questoes:', error.message);
    }
}
