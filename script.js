// ============================================
// CONFIGURACIÓN EMAILJS
// ============================================
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_9n9ivyp',
    TEMPLATE_ID: 'template_dcoedw6',
    PUBLIC_KEY: 'eabIl0YwbLPwfLotx'
};

// ============================================
// INICIALIZACIÓN PRINCIPAL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log(' Portfolio inicializado - Christian Juárez');
    
    // 1. Menú móvil
    initMobileMenu();
    
    // 2. Animaciones de scroll
    initScrollAnimations();
    
    // 3. Efecto navbar al hacer scroll
    initNavbarScroll();
    
    // 4. Animación de typing en el código
    initTypingAnimation();
    
    // 5. Modales de proyectos (galerías)
    initProjectModals();
    
    // 6. Sistema de zoom para imágenes
    initImageZoom();
    
    // 7. Configurar formulario de contacto
    setupContactForm();
    
    // 8. Cargar EmailJS SDK
    loadEmailJSSDK();
});

// ============================================
// 1. MENÚ TOGGLE PARA MÓVILES
// ============================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) {
        console.log('Elementos del menú no encontrados');
        return;
    }
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Cambiar icono hamburguesa ↔ X
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Cerrar menú al hacer clic en un enlace (solo móviles)
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    console.log(' Menú móvil configurado');
}

// ============================================
// 2. ANIMACIONES AL HACER SCROLL
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .skill-category');
    
    if (animatedElements.length === 0) return;
    
    // Configurar observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Aplicar estilos iniciales y observar
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    console.log(` Animaciones configuradas para ${animatedElements.length} elementos`);
}

// ============================================
// 3. NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Cambiar background al hacer scroll
        if (currentScroll > 50) {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
        
        // Ocultar/mostrar navbar al hacer scroll (opcional)
        if (currentScroll > lastScroll && currentScroll > 100) {
            // navbar.style.transform = 'translateY(-100%)';
        } else {
            // navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    console.log('Efecto de navbar configurado');
}

// ============================================
// 4. ANIMACIÓN DE TYPING EN CÓDIGO
// ============================================
function initTypingAnimation() {
    const codeElement = document.querySelector('.code-content code');
    if (!codeElement) return;
    
    const originalCode = codeElement.textContent;
    codeElement.textContent = '';
    
    // Observer para iniciar animación cuando sea visible
    const codeObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startTypingAnimation(codeElement, originalCode);
            codeObserver.unobserve(entries[0].target);
        }
    }, { threshold: 0.5 });
    
    codeObserver.observe(document.querySelector('.code-visual'));
}

function startTypingAnimation(element, text) {
    let i = 0;
    const speed = 20; // milisegundos por carácter
    
    function typeWriter() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Esperar un momento antes de empezar
    setTimeout(typeWriter, 500);
    console.log('✅ Animación de typing iniciada');
}

// ============================================
// 5. MODALES PARA GALERÍAS DE PROYECTOS
// ============================================
function initProjectModals() {
    // Contenido HTML de los modales
    const modalContent = {
        'tenis': `
            <h3> Tienda Online de Tenis</h3>
            <div class="modal-gallery">
                <div class="two-images">
                    <div>
                        <img src="img/screencapture-127-0-0-1-5501-index-html-2025-12-04-20_15_04.png" 
                             alt="Homepage de tienda de tenis"
                             class="zoomable-image">
                        <p class="gallery-caption">Homepage - Diseño moderno con productos destacados</p>
                    </div>
                    <div>
                        <img src="img/screencapture-127-0-0-1-5501-productos-html-2025-12-04-20_16_19.png" 
                             alt="Página de producto"
                             class="zoomable-image">
                        <p class="gallery-caption">Página de producto - Detalles, variaciones y compra</p>
                    </div>
                </div>
            </div>
            <div class="project-description">
                <h4> Características implementadas:</h4>
                <ul>
                    <li><strong>Sistema de filtros inteligentes:</strong> Por tipo de superficie, nivel de jugador, marca</li>
                    <li><strong>Diseño 100% responsive:</strong> Mobile-first approach</li>
                    <li><strong>SEO optimizado:</strong> Para cada producto y categoría</li>
                    <li><strong>Panel administrativo:</strong> Gestión simplificada de inventario</li>
                    <li><strong>Checkout optimizado:</strong> Conversión aumentada en 35%</li>
                </ul>
            </div>
            <div class="modal-stats">
                <div class="stat">
                    <span class="stat-number">+35%</span>
                    <span class="stat-label">Conversiones</span>
                </div>
                <div class="stat">
                    <span class="stat-number">2.1s</span>
                    <span class="stat-label">Tiempo carga</span>
                </div>
                <div class="stat">
                    <span class="stat-number">50+</span>
                    <span class="stat-label">Productos</span>
                </div>
            </div>
        `,
        
        'reportes': `
            <h3>Sistema de Análisis de Ventas</h3>
            <div class="modal-gallery">
                <div class="two-images">
                    <div>
                        <img src="img/screencapture-127-0-0-1-5000-2025-12-04-20_28_02.png" 
                             alt="Dashboard de reportes"
                             class="zoomable-image">
                        <p class="gallery-caption">Dashboard principal - Métricas y gráficos interactivos</p>
                    </div>
                    <div>
                        <img src="img/screencapture-127-0-0-1-5000-reporte-2025-12-04-20_28_35.png" 
                             alt="Generador de reportes"
                             class="zoomable-image">
                        <p class="gallery-caption">Generador de reportes - Filtros avanzados y personalización</p>
                    </div>
                </div>
            </div>
            <div class="project-description">
                <h4>Tecnologías utilizadas:</h4>
                <ul>
                    <li><strong>Python 3.9+</strong> con Tkinter para interfaz gráfica</li>
                    <li><strong>MySQL</strong> para almacenamiento de datos de ventas</li>
                    <li><strong>Matplotlib & Pandas</strong> para gráficos y análisis</li>
                    <li><strong>ReportLab</strong> para generación automática de PDFs</li>
                    <li><strong>CRUD completo</strong> de productos, ventas y usuarios</li>
                    <li><strong>Automatización</strong> de reportes semanales/mensuales</li>
                </ul>
            </div>
            <div class="modal-stats">
                <div class="stat">
                    <span class="stat-number">10h</span>
                    <span class="stat-label">Ahorro semanal</span>
                </div>
                <div class="stat">
                    <span class="stat-number">99.8%</span>
                    <span class="stat-label">Precisión datos</span>
                </div>
                <div class="stat">
                    <span class="stat-number">1-click</span>
                    <span class="stat-label">Reportes PDF</span>
                </div>
            </div>
            <div class="github-link">
                <a href="https://github.com/bracvo/flask-ventas" target="_blank" class="btn btn-outline">
                    <i class="fab fa-github"></i> Ver código en GitHub
                </a>
            </div>
        `,
        
        'mapa': `
            <h3> Mapa de Inundaciones CDMX</h3>
            <div class="modal-gallery">
                <div class="one-image">
                    <img src="img/screencapture-127-0-0-1-5500-index-html-2025-12-04-20_30_55.png" 
                         alt="Mapa interactivo de CDMX"
                         class="zoomable-image">
                </div>
                <p class="gallery-caption">Mapa interactivo - Zonas de riesgo y red de alcantarillado</p>
            </div>
            <div class="project-description">
                <h4> Funcionalidades del sistema:</h4>
                <ul>
                    <li><strong>Análisis geoespacial:</strong> Capacidad de drenaje por zona</li>
                    <li><strong>Visualización interactiva:</strong> Red de alcantarillado</li>
                    <li><strong>Sistema de alertas tempranas:</strong> Basado en pronóstico de lluvias</li>
                    <li><strong>Dashboard administrativo:</strong> Monitoreo en tiempo real</li>
                    <li><strong>Modelado predictivo:</strong> Identificación de zonas críticas</li>
                    <li><strong>Base de datos espacial:</strong> Histórico de 10+ años</li>
                </ul>
            </div>
            <div class="modal-stats">
                <div class="stat">
                    <span class="stat-number">50+</span>
                    <span class="stat-label">Zonas monitoreadas</span>
                </div>
                <div class="stat">
                    <span class="stat-number">40%</span>
                    <span class="stat-label">Menos tiempo respuesta</span>
                </div>
                <div class="stat">
                    <span class="stat-number">85%</span>
                    <span class="stat-label">Precisión alertas</span>
                </div>
            </div>
            <div class="security-note">
                <p><i class="fas fa-shield-alt"></i> <strong>Nota:</strong> Por contener datos sensibles, solo el código base está disponible públicamente.</p>
                <a href="https://github.com/bracvo/CDMX-Sewer-and-Green-Areas-System" target="_blank" class="btn btn-secondary">
                    <i class="fab fa-github"></i> Ver código base
                </a>
            </div>
        `
    };
    
    // Crear estructura del modal
    const modalHTML = `
        <div id="project-modal" class="project-modal">
            <div class="modal-overlay"></div>
            <div class="modal-container">
                <button class="modal-close" aria-label="Cerrar modal">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-header">
                    <h2 class="modal-title"></h2>
                </div>
                <div class="modal-body" id="modal-body"></div>
                <div class="modal-footer">
                    <button class="btn btn-primary close-modal-btn">
                        <i class="fas fa-times"></i> Cerrar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Agregar modal al body si no existe
    if (!document.getElementById('project-modal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Agregar estilos CSS para el modal
        addModalStyles();
    }
    
    // Agregar eventos a los botones de galería
    document.querySelectorAll('[data-modal]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const modalType = this.getAttribute('data-modal');
            openProjectModal(modalType);
        });
    });
    
    console.log('✅ Modales de proyectos configurados');
}

// Función para abrir modal de proyecto
function openProjectModal(modalType) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.querySelector('.modal-title');
    
    // Contenido predefinido
    const modalContent = {
        'tenis': {
            title: '🎾 Tienda Online de Tenis',
            content: `
                <div class="modal-gallery">
                    <div class="two-images">
                        <div>
                            <img src="img/screencapture-127-0-0-1-5501-index-html-2025-12-04-20_15_04.png" 
                                 alt="Homepage de tienda de tenis"
                                 class="zoomable-image">
                            <p class="gallery-caption">Homepage - Diseño moderno</p>
                        </div>
                        <div>
                            <img src="img/screencapture-127-0-0-1-5501-productos-html-2025-12-04-20_16_19.png" 
                                 alt="Página de producto"
                                 class="zoomable-image">
                            <p class="gallery-caption">Página de producto - Detalles</p>
                        </div>
                    </div>
                </div>
                <div class="project-description">
                    <h4>✨ Características:</h4>
                    <ul>
                        <li>Sistema de filtros inteligentes</li>
                        <li>Diseño 100% responsive</li>
                        <li>SEO optimizado</li>
                        <li>Panel administrativo</li>
                    </ul>
                </div>
            `
        },
        'reportes': {
            title: '📊 Sistema de Análisis de Ventas',
            content: `
                <div class="modal-gallery">
                    <div class="two-images">
                        <div>
                            <img src="img/screencapture-127-0-0-1-5000-2025-12-04-20_28_02.png" 
                                 alt="Dashboard de reportes"
                                 class="zoomable-image">
                            <p class="gallery-caption">Dashboard principal</p>
                        </div>
                        <div>
                            <img src="img/screencapture-127-0-0-1-5000-reporte-2025-12-04-20_28_35.png" 
                                 alt="Generador de reportes"
                                 class="zoomable-image">
                            <p class="gallery-caption">Generador de reportes</p>
                        </div>
                    </div>
                </div>
                <div class="project-description">
                    <h4>⚙️ Tecnologías:</h4>
                    <ul>
                        <li>Python 3.9+ con Tkinter</li>
                        <li>MySQL para almacenamiento</li>
                        <li>Matplotlib & Pandas</li>
                        <li>ReportLab para PDFs</li>
                    </ul>
                </div>
            `
        },
        'mapa': {
            title: '🗺️ Mapa de Inundaciones CDMX',
            content: `
                <div class="modal-gallery">
                    <div class="one-image">
                        <img src="img/screencapture-127-0-0-1-5500-index-html-2025-12-04-20_30_55.png" 
                             alt="Mapa interactivo de CDMX"
                             class="zoomable-image">
                    </div>
                    <p class="gallery-caption">Mapa interactivo - Zonas de riesgo</p>
                </div>
                <div class="project-description">
                    <h4>🎯 Funcionalidades:</h4>
                    <ul>
                        <li>Análisis geoespacial</li>
                        <li>Visualización interactiva</li>
                        <li>Sistema de alertas tempranas</li>
                        <li>Dashboard administrativo</li>
                    </ul>
                </div>
            `
        }
    };
    
    if (modalContent[modalType]) {
        modalTitle.textContent = modalContent[modalType].title;
        modalBody.innerHTML = modalContent[modalType].content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquear scroll
        
        // Configurar zoom para imágenes dentro del modal
        setTimeout(() => {
            modalBody.querySelectorAll('.zoomable-image').forEach(img => {
                img.addEventListener('click', function() {
                    openImageZoom(this.src, this.alt);
                });
            });
        }, 100);
    }
}

// Función para agregar estilos del modal
function addModalStyles() {
    const styles = `
        <style>
            .project-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
            }
            
            .project-modal.active {
                display: block;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(10px);
            }
            
            .modal-container {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #1e293b;
                border-radius: 16px;
                width: 90%;
                max-width: 900px;
                max-height: 85vh;
                overflow-y: auto;
                border: 1px solid #334155;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                animation: modalSlideIn 0.3s ease;
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -60%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }
            
            .modal-header {
                padding: 25px 30px 15px;
                border-bottom: 1px solid #334155;
            }
            
            .modal-title {
                color: #f1f5f9;
                font-size: 1.8rem;
                margin: 0;
            }
            
            .modal-body {
                padding: 20px 30px;
                color: #cbd5e1;
            }
            
            .modal-footer {
                padding: 20px 30px;
                border-top: 1px solid #334155;
                text-align: right;
            }
            
            .modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: #334155;
                border: none;
                color: #f1f5f9;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                transition: all 0.3s ease;
                z-index: 10;
            }
            
            .modal-close:hover {
                background: #3b82f6;
                transform: rotate(90deg);
            }
            
            .close-modal-btn {
                padding: 10px 25px;
                font-size: 0.95rem;
            }
            
            /* Estilos para galería dentro del modal */
            .modal-gallery {
                margin: 20px 0;
            }
            
            .two-images {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-bottom: 20px;
            }
            
            .one-image {
                display: flex;
                justify-content: center;
                margin-bottom: 20px;
            }
            
            .modal-gallery img {
                width: 100%;
                max-height: 300px;
                object-fit: contain;
                border-radius: 10px;
                border: 1px solid #475569;
                background: #0f172a;
                cursor: zoom-in;
                transition: transform 0.3s ease;
            }
            
            .modal-gallery img:hover {
                transform: scale(1.02);
                border-color: #3b82f6;
            }
            
            .gallery-caption {
                text-align: center;
                color: #94a3b8;
                font-size: 0.9rem;
                margin-top: 10px;
                padding: 10px;
                background: #334155;
                border-radius: 6px;
            }
            
            .project-description {
                background: #0f172a;
                padding: 20px;
                border-radius: 10px;
                margin: 25px 0;
                border: 1px solid #334155;
            }
            
            .project-description h4 {
                color: #f1f5f9;
                margin-bottom: 15px;
                font-size: 1.2rem;
            }
            
            .project-description ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .project-description li {
                padding: 8px 0;
                padding-left: 25px;
                position: relative;
                color: #cbd5e1;
            }
            
            .project-description li:before {
                content: "✓";
                position: absolute;
                left: 0;
                color: #10b981;
                font-weight: bold;
            }
            
            @media (max-width: 768px) {
                .modal-container {
                    width: 95%;
                    max-height: 90vh;
                }
                
                .two-images {
                    grid-template-columns: 1fr;
                    gap: 15px;
                }
                
                .modal-gallery img {
                    max-height: 250px;
                }
                
                .modal-header {
                    padding: 20px 20px 15px;
                }
                
                .modal-body {
                    padding: 15px 20px;
                }
                
                .modal-footer {
                    padding: 15px 20px;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
    
    // Configurar eventos de cierre del modal
    const modal = document.getElementById('project-modal');
    const closeButtons = modal.querySelectorAll('.modal-close, .close-modal-btn, .modal-overlay');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ============================================
// 6. SISTEMA DE ZOOM PARA IMÁGENES
// ============================================
function initImageZoom() {
    // Crear overlay de zoom
    const zoomOverlay = document.createElement('div');
    zoomOverlay.id = 'zoom-overlay';
    zoomOverlay.className = 'zoom-overlay';
    zoomOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 23, 42, 0.98);
        backdrop-filter: blur(10px);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Contenedor de imagen
    const zoomContainer = document.createElement('div');
    zoomContainer.className = 'zoom-container';
    zoomContainer.style.cssText = `
        position: relative;
        max-width: 95%;
        max-height: 95%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Imagen zoom
    const zoomedImg = document.createElement('img');
    zoomedImg.id = 'zoomed-image';
    zoomedImg.className = 'zoomed-image';
    zoomedImg.style.cssText = `
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
        cursor: grab;
        transition: transform 0.2s ease-out;
        transform-origin: center center;
        border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;
    
    // Botón cerrar
    const closeBtn = document.createElement('button');
    closeBtn.className = 'zoom-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: -15px;
        right: -15px;
        width: 40px;
        height: 40px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#ef4444';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#3b82f6';
    });
    
    // Variables de control
    let currentScale = 1;
    let isDragging = false;
    let startX = 0, startY = 0, translateX = 0, translateY = 0;
    
    // Función global para abrir zoom
    window.openImageZoom = function(src, alt) {
        zoomedImg.src = src;
        zoomedImg.alt = alt || 'Imagen ampliada';
        
        // Resetear transformaciones
        currentScale = 1;
        translateX = 0;
        translateY = 0;
        updateImageTransform();
        
        // Mostrar overlay
        zoomOverlay.style.display = 'flex';
        setTimeout(() => {
            zoomOverlay.style.opacity = '1';
            document.body.style.overflow = 'hidden';
        }, 10);
        
        console.log('🔍 Zoom abierto:', src);
    };
    
    // Actualizar transformación
    function updateImageTransform() {
        zoomedImg.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
        zoomedImg.style.cursor = currentScale > 1 ? 'grab' : 'default';
    }
    
    // Zoom con rueda del mouse
    zoomOverlay.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        const delta = e.deltaY > 0 ? -0.25 : 0.25;
        currentScale = Math.max(0.5, Math.min(5, currentScale + delta));
        
        // Si vuelve a escala 1, resetear posición
        if (currentScale === 1) {
            translateX = 0;
            translateY = 0;
        }
        
        updateImageTransform();
    });
    
    // Arrastrar imagen
    function startDrag(e) {
        if (currentScale <= 1) return;
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        zoomedImg.style.cursor = 'grabbing';
        zoomedImg.style.transition = 'none';
    }
    
    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateImageTransform();
    }
    
    function stopDrag() {
        isDragging = false;
        zoomedImg.style.cursor = currentScale > 1 ? 'grab' : 'default';
        zoomedImg.style.transition = 'transform 0.2s ease-out';
    }
    
    // Event listeners para mouse
    zoomedImg.addEventListener('mousedown', startDrag);
    zoomOverlay.addEventListener('mousemove', drag);
    zoomOverlay.addEventListener('mouseup', stopDrag);
    zoomOverlay.addEventListener('mouseleave', stopDrag);
    
    // Cerrar zoom
    function closeZoom() {
        zoomOverlay.style.opacity = '0';
        setTimeout(() => {
            zoomOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeZoom);
    zoomOverlay.addEventListener('click', function(e) {
        if (e.target === zoomOverlay) closeZoom();
    });
    
    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && zoomOverlay.style.display === 'flex') {
            closeZoom();
        }
        
        // Controles de teclado
        if (zoomOverlay.style.display === 'flex') {
            switch(e.key) {
                case '+':
                case '=':
                    e.preventDefault();
                    currentScale = Math.min(5, currentScale + 0.25);
                    updateImageTransform();
                    break;
                case '-':
                case '_':
                    e.preventDefault();
                    currentScale = Math.max(0.5, currentScale - 0.25);
                    updateImageTransform();
                    break;
                case '0':
                    e.preventDefault();
                    currentScale = 1;
                    translateX = 0;
                    translateY = 0;
                    updateImageTransform();
                    break;
                case 'r': // Reset con R
                    e.preventDefault();
                    currentScale = 1;
                    translateX = 0;
                    translateY = 0;
                    updateImageTransform();
                    break;
            }
        }
    });
    
    // Touch para móviles
    let touchStartDistance = 0;
    
    zoomOverlay.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            // Pinch to zoom
            touchStartDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        } else if (e.touches.length === 1 && currentScale > 1) {
            // Drag con un dedo
            startDrag({
                clientX: e.touches[0].clientX,
                clientY: e.touches[0].clientY
            });
        }
    }, { passive: false });
    
    zoomOverlay.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2 && touchStartDistance !== 0) {
            e.preventDefault();
            const currentDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            
            const scaleChange = currentDistance / touchStartDistance;
            if (scaleChange > 1.1) {
                currentScale = Math.min(5, currentScale + 0.25);
                touchStartDistance = currentDistance;
                updateImageTransform();
            } else if (scaleChange < 0.9) {
                currentScale = Math.max(0.5, currentScale - 0.25);
                touchStartDistance = currentDistance;
                updateImageTransform();
            }
        } else if (e.touches.length === 1 && isDragging) {
            e.preventDefault();
            drag({
                clientX: e.touches[0].clientX,
                clientY: e.touches[0].clientY
            });
        }
    }, { passive: false });
    
    zoomOverlay.addEventListener('touchend', function() {
        touchStartDistance = 0;
        stopDrag();
    });
    
    // Ensamblar y agregar al DOM
    zoomContainer.appendChild(zoomedImg);
    zoomContainer.appendChild(closeBtn);
    zoomOverlay.appendChild(zoomContainer);
    document.body.appendChild(zoomOverlay);
    
    console.log('✅ Sistema de zoom configurado');
}

// ============================================
// 7. CONFIGURAR FORMULARIO DE CONTACTO
// ============================================
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.log('⚠️ Formulario de contacto no encontrado');
        return;
    }
    
    // Quitar acciones por defecto
    contactForm.removeAttribute('action');
    contactForm.removeAttribute('method');
    contactForm.setAttribute('novalidate', 'true');
    
    // Configurar evento submit
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar formulario
        if (!validateContactForm()) {
            return;
        }
        
        // Mostrar estado de carga
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Preparar datos
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim(),
            date: new Date().toLocaleString('es-MX', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        
        console.log('📤 Datos del formulario:', formData);
        
        // Enviar con EmailJS si está disponible
        if (typeof emailjs !== 'undefined' && window.EMAILJS_READY) {
            try {
                const response = await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    formData
                );
                
                if (response.status === 200) {
                    showNotification('success', '✅ ¡Mensaje enviado! Te contactaré pronto.');
                    contactForm.reset();
                }
            } catch (error) {
                console.error('❌ Error EmailJS:', error);
                showNotification('error', '⚠️ Error al enviar. Intenta nuevamente.');
            }
        } else {
            // Fallback si EmailJS no está disponible
            console.log('EmailJS no disponible, mostrando simulación');
            showNotification('success', '✅ ¡Mensaje enviado! (modo simulación)');
            contactForm.reset();
        }
        
        // Restaurar botón
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
    
    console.log('✅ Formulario de contacto configurado');
}

// Validar formulario
function validateContactForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Resetear estilos de error
    [name, email, subject, message].forEach(field => {
        field.classList.remove('error');
    });
    
    // Validar nombre
    if (!name.value.trim()) {
        name.classList.add('error');
        showNotification('error', '⚠️ Por favor, ingresa tu nombre.');
        isValid = false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.classList.add('error');
        showNotification('error', '⚠️ Por favor, ingresa un email válido.');
        isValid = false;
    }
    
    // Validar asunto
    if (!subject.value) {
        subject.classList.add('error');
        showNotification('error', '⚠️ Por favor, selecciona un tipo de proyecto.');
        isValid = false;
    }
    
    // Validar mensaje
    if (!message.value.trim() || message.value.trim().length < 10) {
        message.classList.add('error');
        showNotification('error', '⚠️ El mensaje debe tener al menos 10 caracteres.');
        isValid = false;
    }
    
    return isValid;
}

// ============================================
// 8. CARGAR EMAILJS SDK
// ============================================
function loadEmailJSSDK() {
    // Verificar si ya está cargado
    if (typeof emailjs !== 'undefined') {
        window.EMAILJS_READY = true;
        initializeEmailJS();
        return;
    }
    
    console.log('🔧 Cargando EmailJS SDK...');
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    
    script.onload = function() {
        console.log('✅ EmailJS SDK cargado');
        initializeEmailJS();
    };
    
    script.onerror = function() {
        console.error('❌ Error al cargar EmailJS SDK');
        showNotification('error', '⚠️ Error al cargar servicio de email. Recarga la página.');
    };
    
    document.head.appendChild(script);
}

function initializeEmailJS() {
    if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY.includes('xxxx')) {
        console.error('❌ Public Key no configurada');
        return;
    }
    
    try {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        window.EMAILJS_READY = true;
        console.log('✅ EmailJS inicializado');
        
        // Hacer emailjs disponible globalmente
        window.emailjs = emailjs;
    } catch (error) {
        console.error('❌ Error al inicializar EmailJS:', error);
    }
}

// ============================================
// FUNCIONES UTILITARIAS
// ============================================

// Mostrar notificación
function showNotification(type, message) {
    // Eliminar notificaciones anteriores
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Estilos
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 18px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        z-index: 99999;
        max-width: 450px;
        animation: slideInRight 0.4s ease-out;
        display: flex;
        align-items: center;
        gap: 15px;
        font-family: 'Inter', sans-serif;
        font-size: 15px;
        line-height: 1.5;
        backdrop-filter: blur(10px);
        border: 1px solid ${type === 'success' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'};
    `;
    
    // Icono
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    // Contenido
    notification.innerHTML = `
        <div style="font-size: 24px;">
            <i class="fas ${icon}"></i>
        </div>
        <div style="flex: 1;">
            <strong>${type === 'success' ? '¡Éxito!' : 'Error'}</strong><br>
            <span>${message}</span>
        </div>
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 5px 10px;
            font-size: 20px;
            opacity: 0.8;
            transition: opacity 0.2s;
        " onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">
            &times;
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.4s ease-out forwards';
            setTimeout(() => notification.remove(), 400);
        }
    }, 5000);
    
    // Agregar animaciones CSS si no existen
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .notification {
                transition: all 0.3s ease;
            }
            
            .error {
                border-color: #ef4444 !important;
                background-color: rgba(239, 68, 68, 0.05) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// FUNCIÓN DE PRUEBA PARA CONSOLA
// ============================================
window.testEmailService = async function() {
    console.log('🧪 Iniciando prueba de EmailJS...');
    
    if (typeof emailjs === 'undefined' || !window.EMAILJS_READY) {
        console.error('❌ EmailJS no está listo');
        showNotification('error', 'EmailJS no está listo. Espera unos segundos.');
        return false;
    }
    
    const testData = {
        name: 'Juan Pérez (Prueba)',
        email: 'test@ejemplo.com',
        subject: 'Consulta sobre proyecto',
        message: 'Este es un mensaje de prueba enviado desde la consola. Si recibes esto, EmailJS está funcionando correctamente.',
        date: new Date().toLocaleString('es-MX')
    };
    
    try {
        console.log('📤 Enviando prueba...');
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            testData
        );
        
        console.log('✅ Prueba exitosa:', response);
        showNotification('success', '✅ Prueba enviada exitosamente!');
        return true;
    } catch (error) {
        console.error('❌ Prueba fallida:', error);
        showNotification('error', '❌ Prueba fallida: ' + (error.text || 'Error desconocido'));
        return false;
    }
};

// ============================================
// FUNCIÓN PARA PROBAR ZOOM DESDE CONSOLA
// ============================================
window.testZoom = function() {
    console.log('🔍 Probando sistema de zoom...');
    openImageZoom(
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
        'Imagen de prueba para zoom'
    );
};

// ============================================
// INFORMACIÓN DE DIAGNÓSTICO
// ============================================
console.log('⚙️ Script.js cargado correctamente');
console.log('📝 Comandos disponibles en consola:');
console.log('   - testEmailService() → Probar EmailJS');
console.log('   - testZoom() → Probar sistema de zoom');
console.log('   - openImageZoom(url, alt) → Abrir imagen en zoom');
console.log('🔧 Configuración EmailJS:', EMAILJS_CONFIG);