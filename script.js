// ================================
// GENERAR PÉTALOS AMARILLOS CAYENDO
// ================================
function generarPetalos() {
    const emojis = ['🌼', '🌻', '🌾', '✿'];
    const velocidades = [4, 5, 6, 7, 8];
    
    setInterval(() => {
        const petalo = document.createElement('div');
        petalo.className = 'petalo';
        petalo.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Posición aleatoria en la pantalla
        petalo.style.left = Math.random() * 100 + '%';
        
        // Duración variada para efecto natural
        const duracion = velocidades[Math.floor(Math.random() * velocidades.length)];
        petalo.style.animationDuration = duracion + 's';
        
        // Tamaño aleatorio pero armónico
        petalo.style.fontSize = (Math.random() * 1.2 + 1.2) + 'rem';
        
        // Pequeña rotación inicial
        petalo.style.transform = `rotateZ(${Math.random() * 360}deg)`;
        
        document.body.appendChild(petalo);

        // Remover elemento después de que termine la animación
        setTimeout(() => petalo.remove(), duracion * 1000 + 1000);
    }, 250);
}

// ================================
// MOSTRAR/OCULTAR MENSAJES EMERGENTES
// ================================
function mostrarMensaje(index) {
    const mensaje = document.getElementById(`mensaje-${index}`);
    
    // Alternar visibilidad
    if (mensaje.classList.contains('visible')) {
        mensaje.classList.remove('visible');
    } else {
        // Ocultar otros mensajes con animación
        document.querySelectorAll('.mensaje-emergente.visible').forEach(m => {
            m.classList.remove('visible');
        });
        
        // Mostrar el mensaje clickeado
        mensaje.classList.add('visible');
        
        // Crear confeti de pétalos especiales
        crearConfeti(5);
        
        // Scroll suave hacia el mensaje
        setTimeout(() => {
            mensaje.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 150);
        
        // Pequeña vibración (haptic feedback si está disponible)
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    }
}

// ================================
// CREAR CONFETI CUANDO SE ABRE UN MENSAJE
// ================================
function crearConfeti(cantidad) {
    const colores = ['🌼', '🌻', '✨', '💛'];
    
    for (let i = 0; i < cantidad; i++) {
        const confeti = document.createElement('div');
        confeti.className = 'petalo';
        confeti.textContent = colores[Math.floor(Math.random() * colores.length)];
        confeti.style.left = Math.random() * 100 + '%';
        confeti.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        confeti.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
        
        document.body.appendChild(confeti);
        setTimeout(() => confeti.remove(), 4500);
    }
}

// ================================
// MÚSICA DE FONDO + PANTALLA DE ENTRADA
// Los navegadores no dejan reproducir sonido sin que la persona toque algo,
// por eso la música se inicia con el toque en "Toca para abrir".
// ================================
const audio = document.getElementById('musica-fondo');
const pantallaEntrada = document.getElementById('pantalla-entrada');
const VOLUMEN_FINAL = 0.6; // de 0 (silencio) a 1 (máximo)

function iniciarMusica() {
    if (!audio) return;

    audio.volume = 0;
    const intento = audio.play();
    if (intento && intento.catch) {
        intento.catch(() => {
            console.log('⚠️ No se pudo reproducir la música. Verifica que "musica.mp3" esté en la misma carpeta que index.html.');
        });
    }

    // Sube el volumen poco a poco
    let volumen = 0;
    const subida = setInterval(() => {
        volumen += 0.02;
        if (volumen >= VOLUMEN_FINAL) {
            volumen = VOLUMEN_FINAL;
            clearInterval(subida);
        }
        audio.volume = volumen;
    }, 100);
}

function abrirRegalo() {
    iniciarMusica();

    // Muestra la página
    pantallaEntrada.classList.add('oculta');
    document.body.classList.remove('entrada-activa');
    setTimeout(() => pantallaEntrada.remove(), 1000);

    // Arranca los efectos de la página
    generarPetalos();
    agregarBrillo();
}

// ================================
// INICIALIZAR LA PÁGINA
// ================================
document.addEventListener('DOMContentLoaded', () => {
    // La música y los pétalos empiezan cuando se toca la pantalla de entrada
    if (pantallaEntrada) {
        pantallaEntrada.addEventListener('click', abrirRegalo, { once: true });
    } else {
        generarPetalos();
    }
    
    // Agregar clase 'loaded' al body para animaciones de carga
    document.body.classList.add('loaded');
    
    // Mensaje de bienvenida en la consola (bonus 😄)
    console.log('%c✿ Para Giuli - Día de las Flores Amarillas ✿', 
                'color: #FFD700; font-size: 18px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%cEspero que sientas la sinceridad en cada palabra 💛', 
                'color: #FFD700; font-size: 14px; font-weight: 600;');
    console.log('%cCreado con tiempo, esfuerzo y respeto genuino.', 
                'color: #D4A017; font-size: 12px;');
    console.log('%c"Las flores amarillas no piden nada, solo florecen"', 
                'color: #FFA500; font-size: 12px; font-style: italic;');
});

// ================================
// EFECTO DE BRILLO ESPECIAL
// ================================
function agregarBrillo() {
    const header = document.querySelector('header');
    if (header) {
        header.style.animation = 'none';
        setTimeout(() => {
            header.style.animation = 'fadeInDown 1s ease-out';
        }, 10);
    }
}

// ================================
// DETECTAR SCROLL Y AGREGAR EFECTOS
// ================================
window.addEventListener('scroll', () => {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(seccion => {
        const posicion = seccion.getBoundingClientRect().top;
        const ventana = window.innerHeight;
        
        if (posicion < ventana * 0.75) {
            seccion.style.opacity = '1';
            seccion.style.transform = 'translateY(0)';
        }
    });
});

// ================================
// EVENT LISTENERS ADICIONALES
// ================================

// Agregar interactividad al hacer clic en la flor principal
const florPrincipal = document.querySelector('.flor-principal');
if (florPrincipal) {
    florPrincipal.addEventListener('click', () => {
        crearConfeti(10);
    });
    
    florPrincipal.addEventListener('mouseover', () => {
        florPrincipal.style.filter = 'drop-shadow(0 0 40px rgba(212, 175, 55, 1)) drop-shadow(0 0 80px rgba(255, 215, 0, 0.8))';
    });
    
    florPrincipal.addEventListener('mouseout', () => {
        florPrincipal.style.filter = 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.8)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.4))';
    });
}