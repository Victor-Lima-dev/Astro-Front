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

    botaoMostrarPerguntas.classList.toggle('d-none');


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

        toggleElement('perguntasElemento');
        toggleElement('botaoVoltar');
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

