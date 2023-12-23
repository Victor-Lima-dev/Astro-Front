async function pesquisarTags() {
    try {
        const inputElement = document.getElementById('pesquisaTags');
        const searchTerm = inputElement.value;

        if (searchTerm === '') {
            // Se estiver vazio, execute carregarTags()
            carregarTags();
            return;
        }


        const response = await fetch(`http://24.199.100.244:8002/api/Requisicoes/ProcurarTAG?texto=${searchTerm}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const tags = await response.json();

        // Chama a função para criar a lista de TAGs com base nos dados
        criarListaDeTags(tags);

    } catch (error) {
        console.error('Erro ao pesquisar TAGs:', error.message);
    }
}




// Função para carregar as TAGs ao carregar a página
async function carregarTags() {
    try {


        console.log(token);
        const response = await fetch('http://24.199.100.244:8002/api/Requisicoes/RetornarTAGs', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const tags = await response.json();

        // Chama a função para criar a lista de TAGs com base nos dados
        criarListaDeTags(tags);

    } catch (error) {
        console.error('Erro ao carregar TAGs:', error);
    }
}


// Função para criar a lista de TAGs no HTML
function criarListaDeTags(tags) {
    const listaDeTags = document.getElementById('listaDeTags');

    // Limpa o conteúdo atual da lista
    listaDeTags.innerHTML = '';

    // Itera sobre as TAGs e adiciona itens à lista
    tags.forEach(tag => {
        const itemDaLista = document.createElement('li');
        itemDaLista.textContent = tag.texto; // Substitua 'texto' pelo nome da propriedade da TAG

        // Adiciona o evento de clique
        itemDaLista.addEventListener('click', function () {
            // Chama a função para fazer o POST no endpoint
            enviarTagParaPerguntas(tag.id);
            obterEAtualizarTagsRelacionadas(tag.id);

        });

        // Adiciona o item à lista
        listaDeTags.appendChild(itemDaLista);
    });
}

async function enviarTagParaPerguntas(tag) {
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

        criarTabela(perguntas);
     

    } catch (error) {
        console.error('Erro ao enviar TAG para PerguntasPorTags:', error.message);
    }
}


// Função para obter TAGs relacionadas e atualizar a lista
async function obterEAtualizarTagsRelacionadas(tagId) {

    try {

        const response = await fetch(`http://24.199.100.244:8002/api/Requisicoes/TagsRelacionadas?tagId=${tagId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const tagsRelacionadas = await response.json();

        // Chama a função para criar a lista de TAGs com base nas TAGs relacionadas
        criarListaDeTags(tagsRelacionadas);

    } catch (error) {
        console.error('Erro ao obter TAGs relacionadas:', error.message);
    }
}

