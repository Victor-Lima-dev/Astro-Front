// Função para enviar a lista de perguntas selecionadas para o endpoint
async function enviarListaPerguntas() {
    try {
        const listaPerguntasSelecionadas = perguntasSelecionadas.map(pergunta => pergunta.id);

        // Use o FormData para enviar dados do formulário
        const formData = new FormData(document.getElementById('formPerguntaSelecionadas'));

        console.log('Lista de perguntas selecionadas:', listaPerguntasSelecionadas);

        // Adicione a lista de perguntas selecionadas ao FormData como um campo JSON
        formData.append('lista', JSON.stringify(listaPerguntasSelecionadas));

       

        const response = await fetch(urlAPI + 'Listas/ReceberLista', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Adicione o token JWT, se necessário
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const resultado = await response.json();
        console.log('Resposta da API:', resultado);

        // Limpar a lista de perguntas selecionadas após o envio bem-sucedido
        perguntasSelecionadas = [];
        atualizarListas(); // Função que atualiza as listas na página
    } catch (error) {
        console.error('Erro ao enviar lista de perguntas:', error.message);
    }
}
