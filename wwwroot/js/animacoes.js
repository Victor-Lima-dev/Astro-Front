// Função para controlar o estado do spinner
function toggleSpinner(action) {
    const spinner = document.getElementById('spinner');
  
    if (action === 'iniciar') {
      // Mostrar o spinner
      spinner.style.display = 'block';
    } else if (action === 'fechar') {
      // Ocultar o spinner
      spinner.style.display = 'none';
    }
  }
  
  // Exemplo de uso
  // Inicie o spinner antes de iniciar a requisição
  toggleSpinner('iniciar');
  
  // Simule uma requisição assíncrona (pode ser substituída pela sua lógica real)
  setTimeout(() => {
    // Feche o spinner após receber a resposta ou concluir o processamento
    toggleSpinner('fechar');
  }, 3000); // Tempo de simulação (substitua pelo tempo real da sua requisição)
  