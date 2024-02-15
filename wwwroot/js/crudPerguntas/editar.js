function editarPergunta(pergunta) {
    try {
        var formData = new FormData();
        formData.append('pergunta', pergunta);
        fetch(urlAPITeste + `Perguntas/Deletar`, {
            method: "PUT",
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(function (response) {
            if (response.ok) {
                alert('Pergunta editada com sucesso!');
                //recarregar a página
                location.reload();
                return 

            } else {
                throw new Error(response);
            }
        })
    } catch (error) {
        console.error('Erro ao consultar requisição:', error.message);
    }
}

function carregarTelaEditarPergunta(pergunta) {
    const perguntaParaEditar = document.getElementById('perguntaParaEditar');
    perguntaParaEditar.value = pergunta;
}
