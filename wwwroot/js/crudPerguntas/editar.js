function editarPergunta(pergunta) {
    console.log(pergunta);

    fetch(urlAPI + 'Perguntas/Editar', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(pergunta) // Converte o objeto pergunta em JSON e envia no corpo da requisição
    })
    .then(function(response) {
        if (response.ok) {
            return response; // Retorna a Promise com os dados JSON
        } else {
            throw new Error('Erro na requisição. Código: ' + response.status);
        }
    })
    .then(function(data) {
        alert('Pergunta editada com sucesso!');
        //recarrregar a pagina
        location.reload();
        
    })
    .catch(function(error) {
        console.error('Erro ao editar pergunta:', error.message);
    });
}



function criarElementoBootstrap(tag, classes) {
    const elemento = document.createElement(tag);
    classes.forEach(classe => elemento.classList.add(classe));
    return elemento;
  }

 // Função para criar a estrutura da pergunta
 function criarEstruturaPergunta(pergunta) {
    const main = document.getElementsByClassName('main')[0];
    main.innerHTML = '';

    const container = criarElementoBootstrap('div', ['container', 'mt-5', 'editarPergunta']);
    const form = document.createElement('form');
    form.id = 'editarPerguntaForm';

    // Enunciado


    const enunciadoGroup = criarElementoBootstrap('div', ['form-group']);
    const labelEnunciado = document.createElement('label');
    labelEnunciado.setAttribute('for', 'enunciado');
    labelEnunciado.textContent = 'Enunciado:';
    const textareaEnunciado = document.createElement('textarea');
    textareaEnunciado.classList.add('form-control');
    textareaEnunciado.id = 'enunciado';
    textareaEnunciado.rows = '3';
    textareaEnunciado.textContent = pergunta.conteudo;
    enunciadoGroup.appendChild(labelEnunciado);
    enunciadoGroup.appendChild(textareaEnunciado);
    form.appendChild(enunciadoGroup);

    // Alternativas
    const alternativasGroup = criarElementoBootstrap('div', ['form-group']);
    const labelAlternativas = document.createElement('label');
    labelAlternativas.setAttribute('for', 'alternativas');
    labelAlternativas.textContent = 'Alternativas:';
    const divAlternativas = document.createElement('div');
    divAlternativas.id = 'alternativas';
    pergunta.respostas.forEach((alternativa, index) => {
      const inputAlternativa = document.createElement('input');
      inputAlternativa.type = 'text';
      inputAlternativa.classList.add('form-control', 'mb-2');
      inputAlternativa.value = alternativa.conteudo;
      inputAlternativa.id = 'alternativa' + index;
      divAlternativas.appendChild(inputAlternativa);
    });
    alternativasGroup.appendChild(labelAlternativas);
    alternativasGroup.appendChild(divAlternativas);
    form.appendChild(alternativasGroup);

    // Botão Salvar
    const botaoSalvar = document.createElement('button');
    botaoSalvar.type = 'submit';
    botaoSalvar.classList.add('btn', 'btn-primary');
    botaoSalvar.textContent = 'Salvar';

    botaoSalvar.onclick = function (event) {
        event.preventDefault();
        //nao deixar se propagar
        event.stopPropagation();
        const enunciado = document.getElementById('enunciado').value;
        
        const alternativas = Array.from(document.getElementById('alternativas').children).map(input => input.value);
        const perguntaEditada = {
            requisicaoId: pergunta.requisicaoId,
            conteudo: enunciado,
            id: pergunta.id,
            respostas: alternativas.map((alternativa, index) => ({ id : pergunta.respostas[index].id ,conteudo: alternativa, correta: pergunta.respostas[index].correta })),
            tags: []
        };
        
        editarPergunta(perguntaEditada);
    }


    form.appendChild(botaoSalvar);

    container.appendChild(form);
    main.appendChild(container);

  }

  function destruirElementosIndex() {
 
    const container = document.getElementsByClassName('home-container')[0];
    //remover do dom
    container.remove();

    const status = document.getElementById('home-status');
    //remover do dom
    status.remove();

    const divPergunta = document.getElementById('divPergunta');
    //remover do dom
    divPergunta.remove();

    const mensagemResposta = document.getElementById('mensagemResposta');
    //remover do dom
    mensagemResposta.remove();

    const perguntasElemento = document.getElementsByClassName('perguntasElemento')[0];
    //remover do dom
    perguntasElemento.remove();

    const cardContainer = document.getElementById('cardContainer');
    //remover do dom
    cardContainer.remove();


  }