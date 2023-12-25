
async function consultarPerguntasComCallback(callback) {
    try {
        const response = await fetch('http://24.199.100.244:8002/api/Requisicoes/ConsultarPerguntas', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const perguntas = await response.json();

        // Chama o callback passando as perguntas
        callback(perguntas);

    } catch (error) {
        console.error('Erro na consulta de perguntas:', error.message);
    }
}