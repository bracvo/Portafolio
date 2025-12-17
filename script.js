// Menu Toggle para móviles
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Cambiar icono
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Cerrar menú al hacer clic en un enlace (móviles)
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

// ============================================
// REEMPLAZA ESTOS VALORES CON TUS DATOS REALES
// ============================================
const EMAILJS_CONFIG = {
    // 1. Service ID: Ve a Email Services > Click en tu servicio
    SERVICE_ID: 'service_9n9ivyp',
    
    // 2. Template ID: Ve a Email Templates > Click en tu template  
    TEMPLATE_ID: 'template_dcoedw6',
    
    // 3. Public Key: Ve a Account > API Keys
    PUBLIC_KEY: 'eabIl0YwbLPwfLotx'
};

// ============================================
// CARGAR EMAILJS SDK
// ============================================
console.log('🔧 Cargando EmailJS SDK...');
const emailjsScript = document.createElement('script');
emailjsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
emailjsScript.onload = function() {
    console.log('✅ EmailJS SDK cargado');
    
    // Inicializar EmailJS
    if (EMAILJS_CONFIG.PUBLIC_KEY && !EMAILJS_CONFIG.PUBLIC_KEY.includes('xxxx')) {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('✅ EmailJS inicializado con Public Key');
    } else {
        console.error('❌ ERROR: Configura tu Public Key en EMAILJS_CONFIG');
        console.log('ℹ️ Ve a: Account > API Keys > Public Key');
    }
};
document.head.appendChild(emailjsScript);

// ============================================
// FORMULARIO CON EMAILJS - VERSIÓN SIMPLIFICADA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 Página cargada, configurando formulario...');
    
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.error('❌ No se encontró el formulario con id="contactForm"');
        return;
    }
    
    // Quitar cualquier action/method del HTML
    contactForm.removeAttribute('action');
    contactForm.removeAttribute('method');
    contactForm.setAttribute('novalidate', 'true');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('🔄 Formulario enviado');
        
        // 1. Validar
        if (!validateForm()) {
            console.log('❌ Validación fallida');
            return;
        }
        
        // 2. Mostrar loading
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // 3. Preparar datos
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim(),
            date: new Date().toLocaleString('es-MX'),
            to_email: 'bravocv90@gmail.com'
        };
        
        console.log('📤 Datos a enviar:', formData);
        console.log('🔑 Configuración:', EMAILJS_CONFIG);
        
        // 4. Enviar con EmailJS
        try {
            // Verificar que EmailJS esté disponible
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS no está cargado. Espera un momento.');
            }
            
            console.log('📧 Enviando email con EmailJS...');
            
            const response = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                {
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    date: formData.date,
                    to_email: formData.to_email,
                    reply_to: formData.email
                }
            );
            
            console.log('✅ Respuesta de EmailJS:', response);
            
            if (response.status === 200) {
                // ÉXITO
                console.log('🎉 ¡Email enviado exitosamente!');
                showNotification('success', '¡Mensaje enviado! Te contactaré pronto.');
                contactForm.reset();
                
                // Opcional: Verificar en Email History después de 1 minuto
                setTimeout(() => {
                    console.log('📋 Revisa tu Email History en: https://dashboard.emailjs.com/admin/history');
                }, 60000);
                
            } else {
                throw new Error(`Error ${response.status}`);
            }
            
        } catch (error) {
            // ERROR
            console.error('❌ Error detallado:', error);
            
            // Mensaje amigable según el error
            let errorMsg = 'Error al enviar. Intenta nuevamente.';
            
            if (error.text?.includes('Invalid template ID')) {
                errorMsg = 'Error: Template ID incorrecto. Verifica tu Template ID.';
                console.log('🛠️ Solución: Ve a Email Templates > Copia Template ID');
            } else if (error.text?.includes('Invalid service ID')) {
                errorMsg = 'Error: Service ID incorrecto. Verifica tu Service ID.';
                console.log('🛠️ Solución: Ve a Email Services > Copia Service ID');
            } else if (error.text?.includes('Invalid public key')) {
                errorMsg = 'Error: Public Key incorrecta. Verifica tu API Key.';
                console.log('🛠️ Solución: Ve a Account > API Keys > Copia Public Key');
            }
            
            showNotification('error', errorMsg);
            
            // Mostrar ayuda en consola
            console.log('🆘 AYUDA:');
            console.log('1. Ve a: https://dashboard.emailjs.com/admin');
            console.log('2. Service ID: Email Services > Click en tu servicio');
            console.log('3. Template ID: Email Templates > Click en tu template');
            console.log('4. Public Key: Account > API Keys');
            
        } finally {
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // ============================================
    // FUNCIONES AUXILIARES
    // ============================================
    
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showNotification('error', 'Por favor, completa todos los campos.');
            return false;
        }
        
        if (!isValidEmail(email)) {
            showNotification('error', 'Por favor, ingresa un email válido.');
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function showNotification(type, message) {
        // Eliminar notificaciones previas
        const oldNotif = document.getElementById('emailjs-notification');
        if (oldNotif) oldNotif.remove();
        
        // Crear nueva notificación
        const notification = document.createElement('div');
        notification.id = 'emailjs-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            max-width: 400px;
            animation: slideIn 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'Inter', sans-serif;
        `;
        
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" style="
                background: none;
                border: none;
                color: white;
                margin-left: auto;
                cursor: pointer;
                padding: 0 5px;
            ">
                &times;
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});
   // Animación de barras de habilidades al hacer scroll
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.querySelector('.skill-level');
                const width = skillLevel.style.width;
                skillLevel.style.width = '0%';
                
                // Animar después de un pequeño delay
                setTimeout(() => {
                    skillLevel.style.width = width;
                }, 300);
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
    
    // Efecto de aparición para tarjetas
    const cards = document.querySelectorAll('.service-card, .project-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Estilos iniciales para animación
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
    
    // Efecto de typing en el código (opcional)
    const codeElement = document.querySelector('.code-content code');
    if (codeElement) {
        const originalCode = codeElement.textContent;
        codeElement.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalCode.length) {
                codeElement.textContent += originalCode.charAt(i);
                i++;
                setTimeout(typeWriter, 10);
            }
        }
        
        // Iniciar typing cuando la sección sea visible
        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(typeWriter, 500);
                heroObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });
        
        heroObserver.observe(document.querySelector('.hero'));
    }
    
    // Cambiar color de navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // ============================================
    // GALERÍAS PARA PROYECTOS 
    // ============================================
    
    // Modales para demostraciones de proyectos
    function initProjectModals() {
        // Crear estructura de modales
        const modalHTML = `
            <div id="modal-overlay" class="modal-overlay">
                <div class="modal-container">
                    <button class="modal-close">&times;</button>
                    <div class="modal-content" id="modal-content"></div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Estilos para los modales
        const modalStyles = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(5px);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .modal-overlay.active {
                display: flex;
                opacity: 1;
            }
            
            .modal-container {
                background-color: var(--bg-card);
                border-radius: 12px;
                width: 90%;
                max-width: 900px;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                border: 1px solid var(--border-color);
                transform: translateY(20px);
                transition: transform 0.3s ease;
            }
            
            .modal-overlay.active .modal-container {
                transform: translateY(0);
            }
            
            .modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: var(--bg-input);
                border: none;
                color: var(--text-primary);
                font-size: 1.8rem;
                cursor: pointer;
                z-index: 10;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: var(--transition);
            }
            
            .modal-close:hover {
                background-color: var(--accent-primary);
                color: white;
            }
            
            .modal-content {
                padding: 40px;
            }
            
            /* ESTILOS PARA GALERÍAS */
            .modal-gallery {
                margin: 20px 0;
            }
            
            .gallery-main {
                display: grid;
                grid-template-columns: 1fr;
                gap: 20px;
                margin-bottom: 20px;
            }
            
            .gallery-main img {
                width: 100%;
                max-height: 400px;
                object-fit: contain;
                border-radius: 8px;
                border: 1px solid var(--border-color);
                background-color: var(--bg-primary);
                cursor: zoom-in;
                transition: transform 0.3s ease;
            }
            
            .gallery-main img:hover {
                transform: scale(1.02);
            }
            
            .gallery-thumbnails {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                gap: 10px;
                margin-bottom: 20px;
            }
            
            .thumbnail {
                width: 100%;
                height: 80px;
                object-fit: cover;
                border-radius: 6px;
                cursor: pointer;
                border: 2px solid transparent;
                transition: all 0.3s ease;
            }
            
            .thumbnail:hover {
                transform: scale(1.05);
                border-color: var(--accent-primary);
            }
            
            .thumbnail.active {
                border-color: var(--accent-primary);
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
            }
            
            .gallery-caption {
                text-align: center;
                color: var(--text-secondary);
                font-size: 0.9rem;
                padding: 10px;
                background-color: var(--bg-input);
                border-radius: 6px;
                margin-top: 10px;
            }
            
            /* Para proyectos con 2 imágenes lado a lado */
            .two-images {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }
            
            .two-images img {
                width: 100%;
                height: 300px;
                object-fit: contain;
                border-radius: 8px;
                border: 1px solid var(--border-color);
                background-color: var(--bg-primary);
                cursor: zoom-in;
                transition: transform 0.3s ease;
            }
            
            .two-images img:hover {
                transform: scale(1.02);
            }
            
            /* Para proyectos con 1 imagen centrada */
            .one-image {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .one-image img {
                width: 100%;
                max-width: 700px;
                height: auto;
                max-height: 400px;
                object-fit: contain;
                border-radius: 8px;
                border: 1px solid var(--border-color);
                background-color: var(--bg-primary);
                cursor: zoom-in;
                transition: transform 0.3s ease;
            }
            
            .one-image img:hover {
                transform: scale(1.02);
            }
            
            /* Estadísticas */
            .modal-stats {
                display: flex;
                justify-content: space-around;
                margin: 30px 0;
                padding: 20px;
                background-color: var(--bg-primary);
                border-radius: 10px;
                border: 1px solid var(--border-color);
            }
            
            .stat {
                text-align: center;
            }
            
            .stat-number {
                display: block;
                font-size: 1.8rem;
                font-weight: 800;
                color: var(--accent-primary);
                margin-bottom: 5px;
            }
            
            .stat-label {
                font-size: 0.85rem;
                color: var(--text-muted);
            }
            
            /* Descripción */
            .project-description {
                background-color: var(--bg-input);
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
            }
            
            .project-description ul {
                list-style: none;
                margin: 15px 0 0 0;
            }
            
            .project-description li {
                padding: 8px 0;
                padding-left: 25px;
                position: relative;
                color: var(--text-secondary);
            }
            
            .project-description li:before {
                content: "✓";
                position: absolute;
                left: 0;
                color: var(--accent-secondary);
                font-weight: bold;
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .modal-content {
                    padding: 20px;
                }
                
                .two-images {
                    grid-template-columns: 1fr;
                    gap: 15px;
                }
                
                .two-images img {
                    height: 200px;
                }
                
                .gallery-main img {
                    max-height: 300px;
                }
                
                .modal-stats {
                    flex-direction: column;
                    gap: 15px;
                }
                
                .thumbnail {
                    height: 60px;
                }
                
                .one-image img {
                    max-height: 300px;
                }
            }
        `;
        
        const styleEl = document.createElement('style');
        styleEl.textContent = modalStyles;
        document.head.appendChild(styleEl);
        
        // CONTENIDO DE LOS MODALES CON ZOOM
        const modalContent = {
            // ==================== PROYECTO TENIS ====================
            'tenis': `
                <h3> Tienda Online de Tenis - Galería</h3>
                
                <div class="modal-gallery">
                    <div class="two-images">
                        <!-- IMAGEN 1 con ZOOM -->
                        <div>
                            <img src="img/screencapture-127-0-0-1-5501-index-html-2025-12-04-20_15_04.png" 
                                 alt="Homepage de la tienda de tenis - Diseño moderno con productos destacados"
                                 onclick="openImageZoom(this.src, this.alt)"
                                 onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80'">
                            <p class="gallery-caption">Homepage - Diseño moderno y responsive <br><small></small></p>
                        </div>
                        
                        <!-- IMAGEN 2 con ZOOM -->
                        <div>
                            <img src="img/screencapture-127-0-0-1-5501-productos-html-2025-12-04-20_16_19.png" 
                                 alt="Página de producto de tenis - Detalles, variaciones y botón de compra"
                                 onclick="openImageZoom(this.src, this.alt)"
                                 onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80'">
                            <p class="gallery-caption">Página de producto - Variaciones y checkout <br><small></small></p>
                        </div>
                    </div>
                </div>
                
                <div class="project-description">
                    <h4> Características implementadas:</h4>
                    <ul>
                        <li><strong>Sistema de filtros inteligentes</strong> por tipo de superficie, nivel de jugador, marca</li>
                        <li><strong>Diseño 100% responsive</strong> (mobile-first approach)</li>
                        <li><strong>SEO optimizado</strong> para cada producto y categoría</li>
                        <li><strong>Panel administrativo</strong> simplificado para gestión de inventario</li>
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
                
                <div style="background-color: rgba(59, 130, 246, 0.1); padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem;">
                        <i class="fas fa-info-circle" style="color: var(--accent-primary); margin-right: 8px;"></i>
                        <strong>Nota:</strong> Por confidencialidad con el cliente, el acceso al sitio en vivo está restringido.
                        Estas imágenes muestran el diseño y funcionalidades implementadas.
                    </p>
                </div>
            `,
            
            // ==================== PROYECTO REPORTES ====================
            'reportes': `
                <h3> Sistema de Análisis de Ventas - Galería</h3>
                
                <div class="modal-gallery">
                    <div class="two-images">
                        <!-- IMAGEN 1 con ZOOM -->
                        <div>
                            <img src="img/screencapture-127-0-0-1-5000-2025-12-04-20_28_02.png" 
                                 alt="Dashboard del sistema de reportes - Gráficos y estadísticas"
                                 onclick="openImageZoom(this.src, this.alt)"
                                 onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'">
                            <p class="gallery-caption">Dashboard principal - Métricas y gráficos interactivos <br><small>🔍 Haz clic para zoom</small></p>
                        </div>
                        
                        <!-- IMAGEN 2 con ZOOM -->
                        <div>
                            <img src="img/screencapture-127-0-0-1-5000-reporte-2025-12-04-20_28_35.png" 
                                 alt="Interfaz de generación de reportes - Filtros y opciones"
                                 onclick="openImageZoom(this.src, this.alt)"
                                 onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'">
                            <p class="gallery-caption">Generador de reportes - Filtros avanzados y personalización <br><small></small></p>
                        </div>
                    </div>
                </div>
                
                <div class="project-description">
                    <h4> Tecnologías utilizadas:</h4>
                    <ul>
                        <li><strong>Python 3.9+</strong> con Tkinter para la interfaz gráfica</li>
                        <li><strong>MySQL</strong> para almacenamiento de datos de ventas</li>
                        <li><strong>Matplotlib & Pandas</strong> para gráficos y análisis</li>
                        <li><strong>ReportLab</strong> para generación de PDFs automáticos</li>
                        <li><strong>pymysql</strong> para conexión a base de datos</li>
                        <li><strong>CRUD completo</strong> de productos, ventas y usuarios</li>
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
                
                <div style="background-color: var(--bg-primary); padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <h5 style="margin-top: 0; color: var(--accent-primary);">
                        <i class="fab fa-github" style="margin-right: 8px;"></i> Código disponible
                    </h5>
                    <p style="margin: 10px 0 0 0; color: var(--text-secondary);">
                        El código completo de este sistema está disponible en GitHub para revisión técnica.
                        <a href="https://github.com/bracvo/flask-ventas" 
                           target="_blank" 
                           style="color: var(--accent-primary); text-decoration: none; font-weight: 600;">
                           Ver repositorio →
                        </a>
                    </p>
                </div>
            `,
            
            // ==================== PROYECTO MAPA CDMX ====================
            'mapa': `
                <h3> Mapa de Inundaciones CDMX - Visualización</h3>
                
                <div class="modal-gallery">
                    <div class="one-image">
                        <!-- IMAGEN ÚNICA con ZOOM -->
                        <img src="img/screencapture-127-0-0-1-5500-index-html-2025-12-04-20_30_55.png" 
                             alt="Mapa interactivo de CDMX con zonas de riesgo de inundaciones"
                             onclick="openImageZoom(this.src, this.alt)"
                             onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80'">
                    </div>
                    <p class="gallery-caption">Mapa interactivo - Zonas de riesgo y red de alcantarillado <br><small></small></p>
                </div>
                
                <div class="project-description">
                    <h4>🎯 Funcionalidades del sistema:</h4>
                    <ul>
                        <li><strong>Análisis geoespacial</strong> de capacidad de drenaje por zona</li>
                        <li><strong>Visualización interactiva</strong> de red de alcantarillado</li>
                        <li><strong>Sistema de alertas tempranas</strong> basado en pronóstico de lluvias</li>
                        <li><strong>Dashboard administrativo</strong> para monitoreo en tiempo real</li>
                        <li><strong>Modelado predictivo</strong> de zonas críticas</li>
                        <li><strong>Base de datos espacial</strong> con histórico de 10+ años</li>
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
                
                <div style="background-color: rgba(16, 185, 129, 0.1); padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <h5 style="margin-top: 0; color: var(--accent-secondary);">
                        <i class="fas fa-shield-alt" style="margin-right: 8px;"></i> Nota sobre datos sensibles
                    </h5>
                    <p style="margin: 10px 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">
                        Por contener datos geoespaciales sensibles y protocolos de seguridad urbana, 
                        solo el <strong>código base y algoritmos genéricos</strong> están disponibles públicamente.
                        <a href="https://github.com/bracvo/CDMX-Sewer-and-Green-Areas-System" 
                           target="_blank" 
                           style="color: var(--accent-secondary); text-decoration: none; font-weight: 600;">
                           Ver código base →
                        </a>
                    </p>
                </div>
            `
        };
        
        // FUNCIONALIDAD DE LOS MODALES
        const modalOverlay = document.getElementById('modal-overlay');
        const modalContentEl = document.getElementById('modal-content');
        const modalClose = document.querySelector('.modal-close');
        
        // Abrir modal cuando se hace clic en "Ver Galería"
        document.querySelectorAll('[data-modal]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const modalType = button.getAttribute('data-modal');
                
                if (modalContent[modalType]) {
                    modalContentEl.innerHTML = modalContent[modalType];
                    modalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevenir scroll
                }
            });
        });
        
        // Cerrar modal
        modalClose.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Cerrar al hacer clic fuera del contenido
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // ============================================
    // ZOOM POTENTE PARA IMÁGENES
    // ============================================
    
    function initImageZoom() {
        // Crear overlay de zoom
        const zoomOverlay = document.createElement('div');
        zoomOverlay.id = 'zoom-overlay';
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
        
        // Contenedor de la imagen
        const zoomContainer = document.createElement('div');
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
        zoomedImg.style.cssText = `
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
            cursor: grab;
            transition: transform 0.2s ease-out;
            transform-origin: center center;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        `;
        
        // Botón cerrar
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: -15px;
            right: -15px;
            width: 40px;
            height: 40px;
            background: var(--accent-primary);
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
        
        // Variables de control
        let currentScale = 1;
        let isDragging = false;
        let startX, startY, translateX = 0, translateY = 0;
        
        // Función para abrir zoom
        window.openImageZoom = function(src, alt) {
            zoomedImg.src = src;
            zoomedImg.alt = alt;
            
            // Resetear
            currentScale = 1;
            translateX = 0;
            translateY = 0;
            updateImageTransform();
            
            // Mostrar
            zoomOverlay.style.display = 'flex';
            setTimeout(() => {
                zoomOverlay.style.opacity = '1';
                document.body.style.overflow = 'hidden';
            }, 10);
        };
        
        // Actualizar transformación
        function updateImageTransform() {
            zoomedImg.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
            zoomedImg.style.cursor = currentScale > 1 ? 'grab' : 'default';
        }
        
        // Zoom con rueda
        zoomOverlay.addEventListener('wheel', function(e) {
            e.preventDefault();
            if (e.deltaY < 0) {
                // Zoom in
                currentScale = Math.min(3, currentScale + 0.25);
            } else {
                // Zoom out
                currentScale = Math.max(1, currentScale - 0.25);
            }
            updateImageTransform();
        });
        
        // Arrastrar
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
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateImageTransform();
        }
        
        function stopDrag() {
            isDragging = false;
            zoomedImg.style.cursor = currentScale > 1 ? 'grab' : 'default';
            zoomedImg.style.transition = 'transform 0.2s ease-out';
        }
        
        // Event listeners
        zoomedImg.addEventListener('mousedown', startDrag);
        zoomOverlay.addEventListener('mousemove', drag);
        zoomOverlay.addEventListener('mouseup', stopDrag);
        
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
            
            // Controles de zoom con teclado
            if (zoomOverlay.style.display === 'flex') {
                if (e.key === '+' || e.key === '=') {
                    e.preventDefault();
                    currentScale = Math.min(3, currentScale + 0.25);
                    updateImageTransform();
                }
                if (e.key === '-' || e.key === '_') {
                    e.preventDefault();
                    currentScale = Math.max(1, currentScale - 0.25);
                    updateImageTransform();
                }
                if (e.key === '0') {
                    e.preventDefault();
                    currentScale = 1;
                    translateX = 0;
                    translateY = 0;
                    updateImageTransform();
                }
            }
        });
        
        // Touch para móviles
        let initialDistance = null;
        
        zoomOverlay.addEventListener('touchstart', function(e) {
            if (e.touches.length === 2) {
                // Pinch to zoom
                initialDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
            } else if (e.touches.length === 1 && currentScale > 1) {
                // Drag
                e.preventDefault();
                startDrag({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
            }
        });
        
        zoomOverlay.addEventListener('touchmove', function(e) {
            if (e.touches.length === 2 && initialDistance !== null) {
                e.preventDefault();
                const currentDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                
                const scaleChange = currentDistance / initialDistance;
                if (scaleChange > 1.1) {
                    currentScale = Math.min(3, currentScale + 0.25);
                    initialDistance = currentDistance;
                    updateImageTransform();
                } else if (scaleChange < 0.9) {
                    currentScale = Math.max(1, currentScale - 0.25);
                    initialDistance = currentDistance;
                    updateImageTransform();
                }
            } else if (e.touches.length === 1 && isDragging) {
                e.preventDefault();
                drag({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
            }
        });
        
        zoomOverlay.addEventListener('touchend', function() {
            initialDistance = null;
            stopDrag();
        });
        
        // Ensamblar y agregar al DOM
        zoomContainer.appendChild(zoomedImg);
        zoomContainer.appendChild(closeBtn);
        zoomOverlay.appendChild(zoomContainer);
        document.body.appendChild(zoomOverlay);
        
        // Agregar zoom a imágenes de las tarjetas también
        setTimeout(() => {
            document.querySelectorAll('.project-image img').forEach(img => {
                img.style.cursor = 'zoom-in';
                img.addEventListener('click', function(e) {
                    e.preventDefault();
                    openImageZoom(this.src, this.alt);
                });
            });
        }, 1000);
    }
    
    // ============================================
    // INICIALIZAR TODO
    // ============================================
    
    // Inicializar los modales
    initProjectModals();
    
    // Inicializar el zoom (AGREGA ESTA LÍNEA)
    initImageZoom();
});