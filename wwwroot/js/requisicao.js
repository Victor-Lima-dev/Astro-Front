// Função para consultar a requisição
function consultarRequisicao(idRequisicao) {
    try {
        fetch(`http://24.199.100.244:8002/api/Requisicoes/ConsultarRequisicao?id=${idRequisicao}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Consulta de requisição falhou");
            }
        })
        .then(function (requisicao) {
            // Atualizar o conteúdo do elemento p com as informações recebidas
            var paragrafoStatus = document.getElementById("paragrafoStatus");

            // Chamar a função para gerar os elementos com base nos dados da requisição
            gerarElementosRequisicao(requisicao);
          

            // Se o status não for 11, iniciar o intervalo a cada 5 segundos
            if (requisicao.status !== 11) {
                intervalId = setInterval(function () {
                    consultarRequisicao(idRequisicao);
                }, 5000); // 5000 milissegundos = 5 segundos
            }
        })
        .catch(function (error) {
            // Lógica para lidar com erros na consulta de requisição
            alert("Ocorreu um erro na consulta de requisição: " + error.message);
        });
    } catch (error) {
        console.error('Erro ao consultar requisição:', error.message);
    }
}

// Função para gerar os elementos com base nos dados da requisição
function gerarElementosRequisicao(requisicao) {
    console.log(requisicao);
    // Atualizar o conteúdo do elemento p com as informações recebidas
    var paragrafoStatus = document.getElementById("paragrafoStatus");
    var dataInicioFormatada = new Date(requisicao.dataInicio).toLocaleString();

    var homeStatus = document.getElementById("home-status");

    // Limpar o intervalo anterior antes de iniciar um novo
    clearInterval(intervalId);

    switch (requisicao.status) {
        case 1:
            // Requisição na fila
            paragrafoStatus.innerHTML = "Your question is being analyzed and will be sent to the GPT soon.";
    
            //modificar a cor do background, amarelo bem claro

            homeStatus.style.backgroundColor = "#ffeb3b";

            break;
        case 6:
            // GPT processando
            paragrafoStatus.innerHTML = "The GPT is processing your question. Please wait.";

            //modificar a cor do background, verde bem claro

            homeStatus.style.backgroundColor = "#c8e6c9";
            break;
        case 11:
            // Se o status for 11, chamar a função para consultar a pergunta
            toggleElement('home-status');
            resetarParagrafoStatus();
            consultarPergunta(requisicao.id);
            substituirBotaoMostrarPerguntas();

            break;
        default:
            // Erro na requisição
            paragrafoStatus.innerHTML = "Request error. Please change the input text and try again.";

            //modificar a cor do background vermelho bem claro

            homeStatus.style.backgroundColor = "#ffcdd2";
            break;
    }
}


// Função para enviar o formulário
function enviarFormulario() {
    try {

        // Obter o valor do campo do formulário
        var textoEntrada = document.getElementById("textoEntrada").value;

        // Criar um objeto FormData
        var formData = new FormData();
        formData.append('textoEntrada', textoEntrada);

        fetch("http://24.199.100.244:8002/api/Requisicoes/IniciarRequisicao", {
            method: "POST",
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(function (response) {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error("Requisição falhou");
                }
            })
            .then(function (idRequisicao) {
                // Remover aspas do início e do fim da string (se existirem)
                idRequisicao = idRequisicao.replace(/^"(.*)"$/, "$1");

                // Chamar a função para consultar a requisição
                consultarRequisicao(idRequisicao);
            })
            .catch(function (error) {
                // Alterar o conteúdo do elemento p em caso de erro
                document.getElementById("paragrafoStatus").innerHTML = `<strong>Erro na requisição:</strong> ${error.message}`;
            });
    } catch (error) {
        console.error('Erro ao enviar formulário:', error.message);
    }
}
