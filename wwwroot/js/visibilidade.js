function removeElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.remove();
    }
}

function toggleTags() {
    const listaDeTags = document.getElementById('listaDeTags');
    const pesquisa = document.getElementById('pesquisa');

    pesquisa.classList.toggle('d-none');

    listaDeTags.classList.toggle('d-none');
}

function toggleElement(elementClass) {
    const elements = document.getElementsByClassName(elementClass);

    // Itera sobre os elementos encontrados pela classe
    for (const element of elements) {
        element.classList.toggle('animate__fadeOut');

        //delay de meio segundo para dar o toggle na d-none


        setTimeout(() => {
            element.classList.toggle('d-none');
        }, 500);
        
   
       
    }
}
function toggleElementEntrar(elementClass) {
    const elements = document.getElementsByClassName(elementClass);

    // Itera sobre os elementos encontrados pela classe
    for (const element of elements) {
        element.classList.toggle('animate__fadein');

        //delay de meio segundo para dar o toggle na d-none


        setTimeout(() => {
            element.classList.toggle('d-none');
        }, 500);
        
   
       
    }
}



function toggleBotaoVoltar() {
    var elements = document.getElementById("botaoMostrarPerguntas");

  
    // Itera sobre os elementos encontrados pela classe
    for (const element of elements) {
        element.classList.toggle('d-none');
    }
}




function substituirBotaoMostrarPerguntas() {

    var botaoMostrarPerguntas = document.getElementById("botaoMostrarPerguntas");
    
    botaoMostrarPerguntas.textContent = "Voltar ao inicio";


    toggleBotaoVoltar();


//verificar quais classes tem o botaoMostrarPerguntas

    var classes = botaoMostrarPerguntas.classList;

    //se ele tiver a classe animate__fadeOut, remover ela
    
    if (classes.contains("animate__fadeOut")) {
        classes.remove("animate__fadeOut");
    }

    botaoMostrarPerguntas.onclick = function () {

        var divPergunta = document.getElementById("divPergunta");
        divPergunta.innerHTML = "";

        //recarregar a pagina para voltar ao inicio

        togglePerguntasElemento();

        toggleBotaoVoltar();

        resetarMensagemResposta();
    }
}



//função para resetar o texto de paragrafoStatus para o texto padrão

function resetarParagrafoStatus() {
    var paragrafoStatus = document.getElementById("paragrafoStatus");
    paragrafoStatus.innerHTML = "Status This is where the status of the generated question will appear";

    //voltar a cor do background para o padrão

    var homeStatus = document.getElementById("home-status");
    homeStatus.style.backgroundColor = "aliceblue"
}


// Função para resetar a mensagem de resposta
function resetarMensagemResposta() {
    var mensagemResposta = document.getElementById('mensagemResposta');
    mensagemResposta.textContent = '';  // Limpa o texto
    mensagemResposta.style.color = '';  // Reseta a cor do texto
}




// Função para adicionar animação e remover
function adicionarAnimacaoERemoverCallBack(elementoPaiId, callback) {
    const elementoPai = document.getElementById(elementoPaiId);

    // Adicionar classes de animação
    elementoPai.classList.add('animate__animated', 'animate__fadeOut');

    // Aguardar a conclusão da animação (1 segundo)
    setTimeout(() => {
        // Remover o elemento pai
        elementoPai.remove();

        // Executar o callback, se fornecido
        if (typeof callback === 'function') {
            callback();
        }
    }, 1000);
}



// Objeto de estado para controle de visibilidade
const visibilidadeEstado = {
    perguntasElemento: true, // true significa visível, false significa invisível
    botaoVoltar: false, // true significa visível, false significa invisível
    homeStatus: true, // true significa visível, false significa invisível
  };
  
  // Função para atualizar a visibilidade com base no objeto de estado
  function atualizarVisibilidade() {
    for (const elemento in visibilidadeEstado) {
      const elementos = document.getElementsByClassName(elemento);
      for (const element of elementos) {
        if (visibilidadeEstado[elemento]) {
          element.classList.remove('d-none');
        } else {
          element.classList.add('d-none');
        }
      }
    }
  }
  
  // Função para toggle da visibilidade do elemento 'perguntasElemento'
  function togglePerguntasElemento() {
    visibilidadeEstado.perguntasElemento = !visibilidadeEstado.perguntasElemento;

    console.log( " PerguntasElemento" +" "+ visibilidadeEstado.perguntasElemento);

    atualizarVisibilidade();
  }
  

  // Função para toggle da visibilidade do elemento 'botaoVoltar'
function toggleBotaoVoltar() {
    visibilidadeEstado.botaoVoltar = !visibilidadeEstado.botaoVoltar;

    console.log( " BotaoVoltar" +" "+ visibilidadeEstado.botaoVoltar);

    atualizarVisibilidade();
  }
  
  function toggleHomeStatus() {
    visibilidadeEstado.homeStatus = !visibilidadeEstado.homeStatus;

    console.log( " HomeStatus" +" "+ visibilidadeEstado.homeStatus);

    atualizarVisibilidade();
  }