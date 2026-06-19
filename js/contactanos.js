
//  AUTO-SAVE FORM DATA

const form = document.getElementById('contact-form');
const formFields = form.querySelectorAll('input, textarea, select');


// EXPRESIONES REGULARES PARA VALIDACIÓN

const validations = {
    name: {
        regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        message: 'El nombre solo puede contener letras y espacios.'
    },
    message: {
        regex: /^.{10,}$/,
        message: 'El mensaje debe tener al menos 10 caracteres.'
    }
};


// VALIDACIÓN DE EMAIL CON MENSAJES ESPECÍFICOS

const validateEmail = (email) => {
    const value = email.trim();
    
    if (value === '') {
        return { isValid: false, message: 'El correo electrónico es requerido.' };
    }
    
    if (!value.includes('@')) {
        return { isValid: false, message: 'El correo debe contener un @ (ej: usuario@dominio.com)' };
    }
    
    if (value.startsWith('@') || value.endsWith('@')) {
        return { isValid: false, message: 'El correo debe tener usuario y dominio (ej: usuario@dominio.com)' };
    }
    
    const parts = value.split('@');
    const username = parts[0];
    const domain = parts[1];
    
    if (!username || username.length === 0) {
        return { isValid: false, message: 'El correo debe tener un nombre de usuario' };
    }
    
    if (!domain || domain.length === 0) {
        return { isValid: false, message: 'El correo debe tener un dominio' };
    }
    
    if (!domain.includes('.')) {
        return { isValid: false, message: 'El dominio debe tener un punto (ej: @gmail.com)' };
    }
    
    if (domain.startsWith('.') || domain.endsWith('.')) {
        return { isValid: false, message: 'El dominio debe tener nombre y extensión (ej: @gmail.com)' };
    }
    
    const domainParts = domain.split('.');
    const extension = domainParts[domainParts.length - 1];
    
    if (extension.length < 2) {
        return { isValid: false, message: 'La extensión del dominio debe tener al menos 2 caracteres (ej: .com, .co)' };
    }
    
    if (!/^[a-zA-Z]+$/.test(extension)) {
        return { isValid: false, message: 'La extensión del dominio solo debe contener letras (ej: .com, .org)' };
    }
    
    const invalidChars = /[^a-zA-Z0-9._%+-@]/g;
    if (invalidChars.test(value)) {
        return { isValid: false, message: 'El correo contiene caracteres no permitidos.' };
    }
    
    return { isValid: true, message: 'Correo válido' };
};


//  FUNCIÓN DE VALIDACIÓN PRINCIPAL

const validateField = (field) => {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Validar según el tipo de campo
    if (field.id === 'name') {
        // Solo letras y espacios
        isValid = validations.name.regex.test(value);
        errorMessage = validations.name.message;
    } else if (field.id === 'email') {
        // === AQUÍ SE USA LA FUNCIÓN validateEmail ===
        const result = validateEmail(value);
        isValid = result.isValid;
        errorMessage = result.message;
    } else if (field.id === 'message') {
        // Mínimo 10 caracteres
        isValid = validations.message.regex.test(value);
        errorMessage = validations.message.message;
    } else {
        // Validación genérica
        isValid = field.checkValidity();
    }
    
    // Aplicar clases CSS
    if (value === '') {
        field.classList.remove('is-valid', 'is-invalid');
        return false;
    }
    
    field.classList.toggle('is-valid', isValid);
    field.classList.toggle('is-invalid', !isValid);
    
    // Actualizar mensaje de error
    const feedback = field.parentElement.querySelector('.invalid-feedback');
    if (feedback) {
        if (!isValid) {
            feedback.innerHTML = `<i class="fas fa-exclamation-circle me-1"></i> ${errorMessage}`;
        } else {
            feedback.innerHTML = `<i class="fas fa-exclamation-circle me-1"></i> Por favor, ingresa un correo electrónico válido.`;
        }
    }
    
    return isValid;
};


// EVENTOS DE VALIDACIÓN

formFields.forEach(field => {
    if (field.dataset.validate === 'true') {
        field.addEventListener('input', function() {
            validateField(this);
        });
        
        field.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                validateField(this);
            }
        });
    }
});


//  AUTO-SAVE MIENTRAS ESCRIBE

formFields.forEach(field => {
    field.addEventListener('input', function() {
        const data = JSON.parse(localStorage.getItem('contactFormData') || '{}');
        data[this.id] = this.value;
        localStorage.setItem('contactFormData', JSON.stringify(data));
    });
});


// FUNCIÓN PARA CARGAR DATOS GUARDADOS

function loadSavedData() {
    const saved = localStorage.getItem('contactFormData');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            formFields.forEach(field => {
                if (data[field.id]) {
                    field.value = data[field.id];
                    if (field.dataset.validate === 'true') {
                        validateField(field);
                    }
                    field.dispatchEvent(new Event('input'));
                }
            });
        } catch (e) {
            console.warn('Error loading saved form data:', e);
        }
    }
}


// CONTADOR DE CARACTERES

const messageField = document.getElementById('message');
const charCounter = document.getElementById('char-counter');
const MAX_CHARS = 500;

if (messageField && charCounter) {
    messageField.addEventListener('input', function() {
        const length = this.value.length;
        charCounter.textContent = `${length}/${MAX_CHARS}`;
        
        if (length > MAX_CHARS) {
            this.value = this.value.substring(0, MAX_CHARS);
            charCounter.textContent = `${MAX_CHARS}/${MAX_CHARS}`;
        }
    });
}


// TOAST NOTIFICATIONS

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    toast.className = `toast-custom ${type}`;
    toast.innerHTML = `
        <i class="fas ${icons[type] || icons.success}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}


// EFECTO RIPPLE

document.querySelector('.btn-submit')?.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});


// ENVÍO DEL FORMULARIO

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let allValid = true;
    const fields = this.querySelectorAll('[data-validate="true"]');
    fields.forEach(field => {
        if (!validateField(field)) {
            allValid = false;
        }
    });
    
    if (!allValid) {
        showToast('Por favor, completa todos los campos correctamente.', 'error');
        return;
    }
    
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    setTimeout(() => {
        localStorage.removeItem('contactFormData');
        form.reset();
        formFields.forEach(field => {
            field.classList.remove('is-valid', 'is-invalid');
        });
        
        if (charCounter) {
            charCounter.textContent = '0/500';
        }
        
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        showToast('¡Mensaje enviado con éxito! Te responderemos pronto.', 'success');
    }, 2000);
});

// CARGAR DATOS GUARDADOS

loadSavedData();
