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



// Função para carregar as TAGs ao carregar a página
async function carregarTagsPaginacaoLista() {
    try {
        
        const response = await fetch(`http://24.199.100.244:8002/api/Requisicoes/RetornarTAGsPaginacao?quantidade=${quantidade}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const tags = await response.json();

        // Chama a função para criar a lista de TAGs com base nos dados
        criarListaDeTagsLista(tags);

    } catch (error) {
        console.error('Erro ao carregar TAGs:', error);
    }
}

//criar uma função que aumenta a variavel quantidade e chama a função carregarTagsPaginacao

function aumentarQuantidadeTAGs() {
    quantidade += 3;
    carregarTagsPaginacaoLista();
}

//criar uma função que reseta a variavel quantidade e chama a função carregarTagsPaginacao

function resetarQuantidadeTAGs() {
    quantidade = 3;
    carregarTagsPaginacaoLista();
}


// Função para criar a lista de TAGs no HTML
function criarListaDeTagsLista(tags) {
    const listaDeTags = document.getElementById('listaDeTagsLista');

    // Limpa o conteúdo atual da lista
    listaDeTags.innerHTML = '';

    // Itera sobre as TAGs e adiciona itens à lista
    tags.forEach(tag => {
        const itemDaLista = document.createElement('li');
        itemDaLista.textContent = tag.texto; // Substitua 'texto' pelo nome da propriedade da TAG

         // Adiciona as classes do Bootstrap
         itemDaLista.classList.add('btn', 'btn-primary', 'animate__animated', 'animate__fadeIn'); // Adicione as classes conforme necessário


        // Adiciona o evento de clique
        itemDaLista.addEventListener('click', function () {
            // Chama a função para fazer o POST no endpoint
            enviarTagParaPerguntasLista(tag.id);
            obterEAtualizarTagsRelacionadasLista(tag.id);

        });

        // Adiciona o item à lista
        listaDeTags.appendChild(itemDaLista);
    });
}

// Função para obter TAGs relacionadas e atualizar a lista
async function obterEAtualizarTagsRelacionadasLista(tagId) {

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
        criarListaDeTagsLista(tagsRelacionadas);

    } catch (error) {
        console.error('Erro ao obter TAGs relacionadas:', error.message);
    }
}



async function pesquisarTagsCallBack(callback) {
    try {
        const inputElement = document.getElementById('pesquisaTags');
        const searchTerm = inputElement.value;

        if (searchTerm === '') {
            // Se estiver vazio, execute carregarTags()
            carregarTagsPaginacao();
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
        callback(tags);

    } catch (error) {
        console.error('Erro ao pesquisar TAGs:', error.message);
    }
}
