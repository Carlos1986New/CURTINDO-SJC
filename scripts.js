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

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.slider-track');
  const slides = Array.from(track.children);
  const slideCount = slides.length;
  let currentIndex = 0;
  let slideWidth = slides[0].getBoundingClientRect().width;

  // Função para atualizar posição do slider
  function updateSlider() {
    const moveAmount = -slideWidth * currentIndex;
    track.style.transform = `translateX(${moveAmount}px)`;
  }

  // Auto-slide a cada 3 segundos
  let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
  }, 3000);

  // Ajusta slideWidth no resize da janela
  window.addEventListener('resize', () => {
    slideWidth = slides[0].getBoundingClientRect().width;
    updateSlider();
  });

  // Modal elementos
  const modal = document.getElementById('modal');
  const modalImg = modal.querySelector('.modal-content');
  const modalClose = modal.querySelector('.modal-close');

  // Abrir modal ao clicar na imagem
  slides.forEach((slide) => {
    slide.addEventListener('click', () => {
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      modalImg.src = slide.src;
      modalImg.alt = slide.alt;
      
      // Para o auto-slide ao abrir o modal
      clearInterval(autoSlide);
    });

    // Também abrir modal com Enter ou Espaço (acessibilidade)
    slide.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        slide.click();
      }
    });
  });

  // Fechar modal ao clicar no X
  modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    
    // Retoma auto-slide ao fechar modal
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSlider();
    }, 3000);
  });

  // Fechar modal ao clicar fora da imagem
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modalClose.click();
    }
  });

  // Inicia o slider na posição correta
  updateSlider();
});
