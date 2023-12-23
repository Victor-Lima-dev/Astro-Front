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
        element.classList.toggle('d-none');
    }
}

function toggleDivInput() {
    const elements = document.getElementsByClassName('home-inputBox');

  
    // Itera sobre os elementos encontrados pela classe
    for (const element of elements) {
        element.classList.toggle('d-none');
    }
}


function modificarTextoBotaoMostrarPerguntas() {
    var botaoMostrarPerguntas = document.getElementById("botaoMostrarPerguntas");
    if (botaoMostrarPerguntas.textContent == "Perguntas") {
        botaoMostrarPerguntas.textContent = "Nova Pergunta";
    } else {
        botaoMostrarPerguntas.textContent = "Perguntas";
    }
}


function substituirBotaoMostrarPerguntas() {
    var botaoMostrarPerguntas = document.getElementById("botaoMostrarPerguntas");
    botaoMostrarPerguntas.textContent = "Voltar ao inicio";

    botaoMostrarPerguntas.onclick = function () {
       
        //limpar esse elemento divPergunta
        var divPergunta = document.getElementById("divPergunta");
        divPergunta.innerHTML = "";

         toggleElement('home-inputBox');
         toggleElement('home-status');

         modificarTextoBotaoMostrarPerguntas();
        resetarBotaoMostrarPerguntas();

    }
}

function resetarBotaoMostrarPerguntas() {
    var botaoMostrarPerguntas = document.getElementById("botaoMostrarPerguntas");
    botaoMostrarPerguntas.onclick = function () {
       
        //limpar esse elemento divPergunta
        var divPergunta = document.getElementById("divPergunta");
        divPergunta.innerHTML = "";
         toggleElement('home-inputBox');
         toggleElement('home-status');
         toggleElement('perguntasElemento');

         modificarTextoBotaoMostrarPerguntas();

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