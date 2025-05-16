document.addEventListener('DOMContentLoaded', function() {
  // Elementos da DOM
  const startButton = document.getElementById('startButton');
  const body = document.body;
  
  // Função de redirecionamento
  function redirectToHome() {
    try {
      // Feedback visual
      if (startButton) {
        startButton.disabled = true;
        startButton.textContent = "Carregando...";
      }
      
      // Transição de saída
      body.classList.add('page-transition');
      body.style.opacity = '0';
      
      // Redirecionamento com delay para a transição
      setTimeout(() => {
        window.location.href = "home.html";
      }, 300);
      
    } catch (error) {
      console.error("Redirecionamento falhou:", error);
      
      // Restaurar botão se houver erro
      if (startButton) {
        startButton.disabled = false;
        startButton.textContent = "Tentar Novamente";
        body.classList.remove('page-transition');
        body.style.opacity = '1';
      }
      
      // Feedback para o usuário
      alert("Ocorreu um erro ao carregar. Por favor, tente novamente.");
    }
  }

  // Configuração dos Event Listeners
  if (startButton) {
    // Click do mouse
    startButton.addEventListener('click', redirectToHome);
    
    // Teclado (acessibilidade)
    startButton.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        redirectToHome();
      }
    });
    
    // Melhoria: Foco visível para acessibilidade
    startButton.addEventListener('focus', function() {
      this.style.boxShadow = '0 0 0 3px rgba(0, 116, 217, 0.5)';
    });
    
    startButton.addEventListener('blur', function() {
      this.style.boxShadow = 'none';
    });
  }

  // Transição de entrada ao carregar a página
  setTimeout(() => {
    body.classList.remove('page-transition');
  }, 50);
});