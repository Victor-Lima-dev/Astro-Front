function deletarPergunta(idPergunta) {
    try {
        var formData = new FormData();
        formData.append('id', idPergunta);
      

        fetch(urlAPITeste + `Perguntas/Deletar`, {
            method: "DELETE",
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(function (response) {
            if (response.ok) {
                alert('Pergunta deletada com sucesso!');
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
