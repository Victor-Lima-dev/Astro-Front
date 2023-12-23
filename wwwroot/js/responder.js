
function processarResposta(resposta, alternativaId) {
    try {
        var formData = new FormData();
        formData.append('IdPergunta', resposta.perguntaId);
        formData.append('IdResposta', resposta.id);

        fetch('http://24.199.100.244:8002/api/Requisicoes/ResponderPergunta', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            // Chamar a função para interações com o DOM após a resposta

            interacoesDomAposResposta(data, alternativaId);
            
        })
        .catch(error => {
            alert('Ocorreu um erro ao enviar a resposta: ' + error.message);
        });
    } catch (error) {
        console.error('Erro ao processar resposta:', error.message);
    }
}

// Função para interações com o DOM após a resposta ser processada
function interacoesDomAposResposta(data, alternativaId) {
    // Atualizar o conteúdo do elemento p com as informações recebidas
    var paragrafoStatus = document.getElementById("paragrafoStatus");

    // Verificar se a resposta é verdadeira ou falsa
    var mensagem = data ? 'Resposta correta!' : 'Resposta incorreta!';

    // Obter o botão de alternativa pelo id e aplicar o estilo correspondente
    var botaoAlternativa = document.getElementById(alternativaId);
    if (data) {
        // Resposta correta (verde)
        botaoAlternativa.style.backgroundColor = 'green';
        botaoAlternativa.style.color = 'white';

        // Desabilitar outros botões
        desabilitarBotoesAlternativa();
    } else {
        // Resposta incorreta (vermelho)
        botaoAlternativa.style.backgroundColor = 'red';
        botaoAlternativa.style.color = 'white';
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
