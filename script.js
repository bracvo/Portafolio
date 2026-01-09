// ============================================
// CONFIGURACIÓN EMAILJS
// ============================================
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_9n9ivyp',
    TEMPLATE_ID: 'template_dcoedw6',
    PUBLIC_KEY: 'eabIl0YwbLPwfLotx'
};

// Estado de EmailJS
let EMAILJS_LOADED = false;
let EMAILJS_INITIALIZED = false;

// ============================================
// INICIALIZACIÓN PRINCIPAL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio inicializado - Christian Juárez');
    
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
        console.log('⚠️ Elementos del menú no encontrados');
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
    
    console.log('✅ Menú móvil configurado');
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
    
    console.log(`✅ Animaciones configuradas para ${animatedElements.length} elementos`);
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
        
        lastScroll = currentScroll;
    });
    
    console.log('✅ Efecto de navbar configurado');
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
            }
        }
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
    
    console.log('📝 Configurando formulario de contacto...');
    
    // Quitar acciones por defecto
    contactForm.removeAttribute('action');
    contactForm.removeAttribute('method');
    contactForm.setAttribute('novalidate', 'true');
    
    // Cargar EmailJS al cargar el formulario
    loadEmailJSSDK();
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🔄 Formulario enviado - Iniciando proceso...');
        
        // 1. Validación
        if (!validateContactForm()) {
            console.log('❌ Validación fallida');
            return;
        }
        
        // 2. Preparar datos
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim(),
            date: new Date().toLocaleString('es-MX')
            // ⚠️ IMPORTANTE: NO incluir to_email ni reply_to (tu template no los usa)
        };
        
        console.log('📊 Datos del formulario:', formData);
        console.log('✅ Variables que tu template espera: name, email, subject, message, date');
        
        // 3. Mostrar loading
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // 4. Intentar enviar con EmailJS
        try {
            await sendWithEmailJS(formData);
        } catch (error) {
            console.error('❌ Error en envío:', error);
            showNotification('error', '❌ Error al enviar. Intenta nuevamente.');
        } finally {
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// 8. CARGAR EMAILJS SDK
// ============================================
function loadEmailJSSDK() {
    console.log('🔧 Iniciando carga de EmailJS...');
    
    // Si ya está cargado
    if (typeof emailjs !== 'undefined') {
        console.log('✅ EmailJS ya está cargado en la página');
        initializeEmailJS();
        return;
    }
    
    // Verificar si ya hay un script cargando
    if (document.querySelector('script[src*="email.min.js"]')) {
        console.log('📥 EmailJS ya se está cargando...');
        return;
    }
    
    console.log('📥 Cargando EmailJS SDK desde CDN...');
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    
    script.onload = function() {
        console.log('✅ EmailJS SDK cargado exitosamente');
        EMAILJS_LOADED = true;
        initializeEmailJS();
    };
    
    script.onerror = function(error) {
        console.error('❌ ERROR crítico al cargar EmailJS:', error);
        showNotification('error', '❌ Error al cargar servicio de email. Verifica tu conexión.');
    };
    
    document.head.appendChild(script);
}

// ============================================
// INICIALIZAR EMAILJS CON VERIFICACIÓN
// ============================================
function initializeEmailJS() {
    console.log('🔄 Inicializando EmailJS...');
    
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS no está definido después de cargar');
        return;
    }
    
    if (!EMAILJS_CONFIG.PUBLIC_KEY) {
        console.error('❌ Public Key no configurada');
        return;
    }
    
    try {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        EMAILJS_INITIALIZED = true;
        
        console.log('✅ EmailJS inicializado correctamente');
        console.log('🔑 Public Key:', EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 10) + '...');
        console.log('🏷️ Service ID:', EMAILJS_CONFIG.SERVICE_ID);
        console.log('📄 Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
        
    } catch (error) {
        console.error('❌ ERROR al inicializar EmailJS:', error);
    }
}

// ============================================
// ENVIAR CON EMAILJS (VERSIÓN CORREGIDA)
// ============================================
async function sendWithEmailJS(formData) {
    console.log('📧 Intentando enviar con EmailJS...');
    
    // Verificar que EmailJS esté listo
    if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS no está cargado');
    }
    
    if (!EMAILJS_INITIALIZED) {
        throw new Error('EmailJS no está inicializado');
    }
    
    console.log('🔍 Verificando credenciales:');
    console.log('- Service ID:', EMAILJS_CONFIG.SERVICE_ID);
    console.log('- Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
    
    // ⚠️ IMPORTANTE: SOLO las 5 variables que tu template usa
    // Según tu template HTML, solo estas variables:
    const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        date: formData.date
        // ❌ NO incluyas: to_email, reply_to (tu template no los usa)
    };
    
    console.log('📤 Enviando con parámetros:', templateParams);
    console.log('✅ Variables exactas: name, email, subject, message, date');
    
    try {
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams
        );
        
        console.log('✅ ÉXITO - Email enviado:', response);
        
        if (response.status === 200) {
            showNotification('success', '🎉 ¡Mensaje enviado! Te contactaré pronto.');
            document.getElementById('contactForm').reset();
            return response;
        } else {
            throw new Error(`Estado ${response.status}: ${response.text}`);
        }
        
    } catch (error) {
        console.error('❌ ERROR EmailJS:', error);
        
        // Análisis específico
        if (error.status === 412) {
            console.log('🛠️ ERROR 412 - Precondition Failed');
            console.log('📋 Problema: Variables incorrectas o faltantes');
            console.log('✅ Solución: Tu template solo usa: name, email, subject, message, date');
            console.log('❌ NO uses: to_email, reply_to');
            
            showNotification('error', '❌ Error de configuración. Variables incorrectas.');
        } else if (error.text) {
            console.log('📄 Error text:', error.text);
            
            // Mensajes comunes de error
            if (error.text.includes('Invalid template ID')) {
                showNotification('error', '❌ Template ID incorrecto. Verifica en EmailJS.');
            } else if (error.text.includes('Invalid service ID')) {
                showNotification('error', '❌ Service ID incorrecto. Verifica en EmailJS.');
            } else if (error.text.includes('Invalid public key')) {
                showNotification('error', '❌ Public Key incorrecta. Verifica en EmailJS.');
            } else {
                showNotification('error', '❌ Error: ' + error.text);
            }
        } else {
            showNotification('error', '❌ Error al enviar el mensaje.');
        }
        
        throw error;
    }
}

// ============================================
// VALIDACIÓN DEL FORMULARIO
// ============================================
function validateContactForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Resetear errores
    [name, email, subject, message].forEach(field => {
        field.classList.remove('error');
        field.style.borderColor = '';
    });
    
    // Validar nombre
    if (!name.value.trim()) {
        name.classList.add('error');
        name.style.borderColor = '#ef4444';
        showNotification('error', '⚠️ Por favor, ingresa tu nombre.');
        isValid = false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        email.classList.add('error');
        email.style.borderColor = '#ef4444';
        showNotification('error', '⚠️ Por favor, ingresa tu email.');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        email.classList.add('error');
        email.style.borderColor = '#ef4444';
        showNotification('error', '⚠️ Por favor, ingresa un email válido.');
        isValid = false;
    }
    
    // Validar asunto
    if (!subject.value || subject.value === '') {
        subject.classList.add('error');
        subject.style.borderColor = '#ef4444';
        showNotification('error', '⚠️ Por favor, selecciona un tipo de proyecto.');
        isValid = false;
    }
    
    // Validar mensaje
    if (!message.value.trim()) {
        message.classList.add('error');
        message.style.borderColor = '#ef4444';
        showNotification('error', '⚠️ Por favor, escribe tu mensaje.');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        message.classList.add('error');
        message.style.borderColor = '#ef4444';
        showNotification('error', '⚠️ El mensaje debe tener al menos 10 caracteres.');
        isValid = false;
    }
    
    return isValid;
}

// ============================================
// ENVIAR CON EMAILJS (VERSIÓN CORREGIDA - REEMPLAZA TODO)
// ============================================
async function sendWithEmailJS(formData) {
    console.log('📧 ENVÍO ULTIMATUM - EmailJS...');
    
    if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS no está cargado');
    }
    
    if (!EMAILJS_INITIALIZED) {
        throw new Error('EmailJS no está inicializado');
    }
    
    console.log('🔍 Verificando todo:');
    console.log('- Service ID:', EMAILJS_CONFIG.SERVICE_ID);
    console.log('- Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
    console.log('- EmailJS listo:', typeof emailjs.send === 'function');
    
    // ⚠️ PRUEBA 1: Variables EXACTAS como en tu template
    const templateParams = {
        name: String(formData.name || '').trim(),
        email: String(formData.email || '').trim(),
        subject: String(formData.subject || '').trim(),
        message: String(formData.message || '').trim(),
        date: String(formData.date || new Date().toLocaleString('es-MX'))
    };
    
    console.log('📤 Enviando con:', templateParams);
    console.log('✅ Template espera: name, email, subject, message, date');
    
    try {
        console.log('🚀 Intento 1: Enviando...');
        
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams
        );
        
        console.log('✅ ÉXITO COMPLETO:', {
            status: response.status,
            text: response.text
        });
        
        showNotification('success', '🎉 ¡Mensaje enviado! Te contactaré pronto.');
        document.getElementById('contactForm').reset();
        
        return response;
        
    } catch (error) {
        console.error('❌ ERROR 412:', error);
        
        // PRUEBA 2: Con valores MÁS SIMPLES
        console.log('🔄 Intento 2: Con valores simples...');
        
        const simpleParams = {
            name: 'Test User',
            email: 'test@example.com',
            subject: 'Test Subject',
            message: 'Test message',
            date: '2026-01-09'
        };
        
        try {
            const response2 = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                simpleParams
            );
            
            console.log('✅ ÉXITO con valores simples:', response2);
            showNotification('success', '🎉 ¡Mensaje enviado! (modo prueba simple)');
            document.getElementById('contactForm').reset();
            return response2;
            
        } catch (error2) {
            console.error('❌ ERROR también con valores simples:', error2);
            
            // DIAGNÓSTICO COMPLETO
            console.log('💀 DIAGNÓSTICO FINAL:');
            console.log('1. Error status:', error2.status);
            console.log('2. Error text:', error2.text);
            console.log('3. Service ID:', EMAILJS_CONFIG.SERVICE_ID);
            console.log('4. Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
            console.log('5. Variables usadas:', Object.keys(simpleParams));
            
            // Verificar en el dashboard
            console.log('🔗 Verifica en:');
            console.log('- https://dashboard.emailjs.com/admin/history');
            console.log('- https://dashboard.emailjs.com/admin/test');
            
            if (error2.status === 412) {
                showNotification('error', '❌ Error 412: Problema con el template. Verifica las variables {{ }} en EmailJS.');
            } else if (error2.text) {
                showNotification('error', '❌ Error: ' + error2.text);
            } else {
                showNotification('error', '❌ Error desconocido. Verifica la consola.');
            }
            
            // Mostrar alerta con ayuda
            setTimeout(() => {
                alert('⚠️ PROBLEMA CON EMAILJS\n\n' +
                      '1. Ve a: https://dashboard.emailjs.com/admin/templates\n' +
                      '2. Haz clic en template_dcoedw6\n' +
                      '3. Verifica que las variables sean EXACTAMENTE:\n' +
                      '   - {{name}}\n' +
                      '   - {{email}}\n' +
                      '   - {{subject}}\n' +
                      '   - {{message}}\n' +
                      '   - {{date}}\n\n' +
                      '4. Prueba desde: https://dashboard.emailjs.com/admin/test');
            }, 1000);
            
            throw error2;
        }
    }
}
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
// MOSTRAR NOTIFICACIÓN
// ============================================
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
// INFORMACIÓN DE DIAGNÓSTICO
// ============================================
console.log('⚙️ Script.js cargado correctamente');
console.log('📝 Comandos disponibles en consola:');
console.log('   - testEmailService() → Probar EmailJS (SOLO 5 variables)');
console.log('   - testZoom() → Probar sistema de zoom');
console.log('   - openImageZoom(url, alt) → Abrir imagen en zoom');
console.log('🔧 Configuración EmailJS:', {
    SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
    TEMPLATE_ID: EMAILJS_CONFIG.TEMPLATE_ID,
    PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY ? 'Configurada' : 'NO CONFIGURADA'
});
console.log('✅ Variables del template: name, email, subject, message, date');
console.log('❌ NO usar: to_email, reply_to');