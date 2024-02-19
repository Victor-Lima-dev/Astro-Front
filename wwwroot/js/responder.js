
function processarResposta(resposta, alternativaId, pergunta, motivoId) {
    try {
        var formData = new FormData();
        formData.append('IdPergunta', resposta.perguntaId);
        formData.append('IdResposta', resposta.id);

        fetch( urlAPI +  'Requisicoes/ResponderPergunta', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {

            // Chamar a função para interações com o DOM após a resposta

            interacoesDomAposResposta(data, alternativaId, motivoId);
             //salvar a resposta no array de respostas
                salvarResposta(resposta.perguntaId, data);

        })
        .catch(error => {
            console.error('Ocorreu um erro ao enviar a resposta: ' + error);
        });
    } catch (error) {
        console.error('Erro ao processar resposta:', error.message);
    }
}

// Função para interações com o DOM após a resposta ser processada
function interacoesDomAposResposta(data, alternativaId, motivoId) {

    // Obter o botão de alternativa pelo id e aplicar o estilo correspondente
    var botaoAlternativa = document.getElementById(alternativaId);
    if (data) {
        // Resposta correta (verde)
        botaoAlternativa.style.backgroundColor = 'green';
        botaoAlternativa.style.color = 'white';

        // Desabilitar outros botões
        desabilitarBotoesAlternativa();

        //mostrar a explicação
        



        // Adicionar mensagem de resposta correta
        var mensagemResposta = document.getElementById('mensagemResposta');
        mensagemResposta.textContent = 'Resposta correta!';
        mensagemResposta.style.color = 'green';

        var explicacao = document.getElementById('explicacao');
        //retirar a classe d-none
        explicacao.classList.remove('d-none');
    } else {
        // Resposta incorreta (vermelho)
        botaoAlternativa.style.backgroundColor = 'red';
        botaoAlternativa.style.color = 'white';

        // Adicionar mensagem de resposta incorreta
        var mensagemResposta = document.getElementById('mensagemResposta');
        mensagemResposta.textContent = 'Resposta incorreta!';
        mensagemResposta.style.color = 'red';

        //revelar o erro

        //obter o paragrafo com o id motivoId

        var motivo = document.getElementById(motivoId);
        //retirar a classe d-none

        motivo.classList.remove('d-none');

    }
}

// Função para desabilitar os botões de alternativa
function desabilitarBotoesAlternativa() {
    // Obter todos os botões de alternativa
    var botoesAlternativa = document.getElementsByClassName("alternativa");

    // Iterar sobre os botões e desabilitar
    for (var i = 0; i < botoesAlternativa.length; i++) {
        botoesAlternativa[i].disabled = true;
    }
}


function alternativaErrada(alternativaId)
{
    
}