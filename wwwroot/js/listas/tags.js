async function enviarTagParaPerguntasLista(tag) {
    try {
        // Crie um objeto FormData para enviar dados como 'form-data'
        var formData = new FormData();

        formData.append('tagId', tag);

        console.log(formData);

        const response = await fetch('http://24.199.100.244:8002/api/Requisicoes/PerguntasPorTags', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const perguntas = await response.json();

        criarListaPerguntas(perguntas);
     

    } catch (error) {
        console.error('Erro ao enviar TAG para PerguntasPorTags:', error.message);
    }
}