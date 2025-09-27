// Efectos y animaciones modernas
class ModernStore {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollEffects();
        this.setupCategoryScroll();
        this.setupAnimations();
        this.setupProductHover();
        this.setupIntersectionObserver();
    }

    // Efectos de scroll para header
    setupScrollEffects() {
        const header = document.querySelector('header');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // Scroll horizontal de categorías con controles
    setupCategoryScroll() {
        const scrollContainer = document.querySelector('.categorias-scroll');
        const scrollLeftBtn = document.querySelector('.scroll-left');
        const scrollRightBtn = document.querySelector('.scroll-right');

        if (scrollLeftBtn && scrollRightBtn) {
            scrollLeftBtn.addEventListener('click', () => {
                scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
            });

            scrollRightBtn.addEventListener('click', () => {
                scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
            });
        }

        // Navegación por categorías
        const categoryItems = document.querySelectorAll('.categoria-item');
        categoryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const categoryId = item.getAttribute('data-categoria');
                const targetSection = document.getElementById(`categoria-${categoryId}`);

                if (targetSection) {
                    // Remover active de todos
                    categoryItems.forEach(i => i.classList.remove('active'));
                    // Agregar active al clickeado
                    item.classList.add('active');
                    
                    // Scroll suave a la sección
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Animaciones al hacer hover en productos
    setupProductHover() {
        const productCards = document.querySelectorAll('.producto-card');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Observer para animaciones al hacer scroll
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animación escalonada para productos
                    if (entry.target.classList.contains('productos-grid')) {
                        const products = entry.target.querySelectorAll('.producto-card');
                        products.forEach((product, index) => {
                            product.style.animationDelay = `${index * 0.1}s`;
                            product.classList.add('fade-in');
                        });
                    }
                }
            });
        }, observerOptions);

        // Observar elementos con clase fade-in
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    // Configuración de animaciones generales
    setupAnimations() {
        // Efecto de partículas en el hero (simulado con CSS)
        this.createFloatingElements();
        
        // Contador animado para estadísticas (puedes agregarlo luego)
        this.setupCounters();
    }

    createFloatingElements() {
        // Crear elementos flotantes decorativos
        const hero = document.querySelector('.hero');
        if (hero) {
            for (let i = 0; i < 5; i++) {
                const floatEl = document.createElement('div');
                floatEl.className = 'floating-element';
                floatEl.style.cssText = `
                    position: absolute;
                    width: ${20 + Math.random() * 30}px;
                    height: ${20 + Math.random() * 30}px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    animation: float ${6 + Math.random() * 6}s ease-in-out infinite;
                    animation-delay: ${Math.random() * 5}s;
                `;
                hero.appendChild(floatEl);
            }
        }
    }

    setupCounters() {
        // Puedes agregar contadores animados para estadísticas
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.innerText = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target;
                }
            };

            // Iniciar cuando sea visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(counter);
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ModernStore();
});

// Efectos adicionales para interactividad
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de carga suave
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Navegación suave
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de modo oscuro automático
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
        document.body.classList.add('dark-mode');
    }

    // Actualizar dinámicamente si cambia la preferencia
    prefersDark.addEventListener('change', e => {
        document.body.classList.toggle('dark-mode', e.matches);
    });
});