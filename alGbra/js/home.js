document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================================================
    // PARTE 1: LÓGICA DO ACORDEÃO (Accordion)
    // Garante que apenas uma aba de conteúdo seja aberta por vez (.set / .content)
    // =========================================================================
    
    // Seleciona TODOS os cabeçalhos clicáveis do acordeão (que têm a classe .set)
    const accordionHeaders = document.querySelectorAll('.set');

    /**
     * Função auxiliar para fechar todos os painéis de conteúdo do acordeão
     * exceto o que foi clicado.
     * @param {HTMLElement} currentHeader O cabeçalho que foi clicado e deve permanecer aberto ou ser processado.
     */
    function closeAllContents(currentHeader) {
        // Itera sobre TODOS os cabeçalhos do acordeão
        accordionHeaders.forEach(header => {
            // Verifica se o cabeçalho no loop é DIFERENTE do cabeçalho clicado
            if (header !== currentHeader) {
                // 1. Fecha o ícone de rotação
                header.classList.remove('active-geo');
                
                // 2. Encontra o painel de conteúdo imediatamente seguinte
                const contentToClose = header.nextElementSibling;
                
                if (contentToClose && contentToClose.classList.contains('content')) {
                    // 3. Remove a classe de ativação do conteúdo
                    contentToClose.classList.remove('active-content');
                    // 4. Define o maxHeight para 0 para fechar o painel suavemente
                    contentToClose.style.maxHeight = "0";
                }
            }
        });
    }

    // Adiciona o ouvinte de clique para CADA cabeçalho do acordeão
    accordionHeaders.forEach(header => {
        // Encontra o conteúdo relacionado (o próximo elemento irmão)
        const content = header.nextElementSibling;
        
        if (content && content.classList.contains('content')) {
             // 0. Define o maxHeight inicial como 0 para garantir que todos estejam fechados ao carregar
             content.style.maxHeight = "0";

             header.addEventListener('click', function(e) {
                 e.preventDefault();
                
                 // PASSO 1: IMPLEMENTAÇÃO DO ACORDEÃO: Fecha todos os outros painéis antes de manipular o atual.
                 closeAllContents(header);

                 // PASSO 2: Alterna as classes do item clicado para abrir ou fechar
                 header.classList.toggle('active-geo');
                 content.classList.toggle('active-content');
                
                 // PASSO 3: Gerencia a altura e animação
                 if (content.classList.contains('active-content')) {
                     // Abre: Usa scrollHeight para pegar a altura real + 30px (para compensar o padding)
                     content.style.maxHeight = content.scrollHeight + 30 + "px"; 
                 } else {
                     // Fecha: Retorna a altura para 0 (recolhe)
                     content.style.maxHeight = "0";
                 }
             });
        }
    });


    // =========================================================================
    // PARTE 2: LÓGICA DE ANIMAÇÃO NO SCROLL (Intersection Observer)
    // Ativa animações (intro1, typing) quando o elemento entra na viewport
    // =========================================================================

    // 1. Seleciona todos os elementos que têm o atributo 'data-animation'
    const animatedElements = document.querySelectorAll('[data-animation]'); 

    // 2. Prepara os elementos: Adiciona a classe inicial 'hiddenScroll' (que esconde via CSS)
    animatedElements.forEach(el => {
        if (!el.classList.contains('hiddenScroll')) {
            el.classList.add('hiddenScroll');
        }
    });

    // 3. Define as opções do observador
    const observerOptions = {
        root: null, // Observa em relação à viewport
        // rootMargin: '0px 0px -100px 0px' FAZ A MÁGICA
        // A animação só dispara quando o elemento estiver 100px acima da borda inferior da tela.
        rootMargin: '0px 0px -100px 0px', 
        threshold: 0.0 // Dispara assim que o primeiro pixel cruza a margem
    };

    /**
     * Função que é chamada quando um elemento cruza o limite de visibilidade
     * @param {IntersectionObserverEntry[]} entries Lista de elementos observados que mudaram de estado.
     * @param {IntersectionObserver} observer A instância do observador.
     */
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            // Se o elemento estiver visível (intersectando a viewport com o rootMargin aplicado)
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // A. LÊ O ATRIBUTO DE DADOS (Ex: 'intro1' ou 'typing')
                const animationClass = element.getAttribute('data-animation'); 
                
                // B. ATIVA A ANIMAÇÃO: Remove a classe de esconder (hiddenScroll)
                element.classList.remove('hiddenScroll');
                
                if (animationClass) {
                    // C. Adiciona a classe de animação desejada (dispara o @keyframes)
                    element.classList.add(animationClass); 
                }

                // D. Para de observar o elemento (a animação só precisa ser disparada uma vez)
                observer.unobserve(element);
            }
        });
    }

    // 4. Cria e inicia o Intersection Observer
    const scrollObserver = new IntersectionObserver(handleIntersection, observerOptions);

    // 5. Começa a observar cada elemento que deve ser animado
    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
});