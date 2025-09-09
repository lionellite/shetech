
```
// Form Validation and Submission
const registrationForm = document.getElementById('registrationForm');
const submitBtn = registrationForm.querySelector('.btn-submit');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoader = submitBtn.querySelector('.btn-loader');

// Form validation
function validateForm() {
    const requiredFields = registrationForm.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error', 'success');

        if (!field.value.trim()) {
            formGroup.classList.add('error');
            isValid = false;
        } else {
            formGroup.classList.add('success');
        }
    });

    // Email validation
    const emailField = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value && !emailRegex.test(emailField.value)) {
        emailField.closest('.form-group').classList.add('error');
        isValid = false;
    }

    // Phone validation (Benin format)
    const phoneField = document.getElementById('phone');
    const phoneRegex = /^(\\+229|00229)?[49][0-9]{7}$/;
    if (phoneField.value && !phoneRegex.test(phoneField.value.replace(/\s/g, ''))) {
        phoneField.closest('.form-group').classList.add('error');
        isValid = false;
    }

    return isValid;
}

// Real-time validation
registrationForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => {
        const formGroup = field.closest('.form-group');
        if (field.hasAttribute('required')) {
            formGroup.classList.remove('error', 'success');
            if (!field.value.trim()) {
                formGroup.classList.add('error');
            } else {
                formGroup.classList.add('success');
            }
        }
    });
});

// Program selection enhancement
const programOptions = document.querySelectorAll('.program-option input[type="radio"]');
programOptions.forEach(option => {
    option.addEventListener('change', () => {
        document.querySelectorAll('.program-label').forEach(label => {
            label.style.transform = 'scale(0.98)';
            label.style.opacity = '0.7';
        });

        const selectedLabel = option.nextElementSibling;
        selectedLabel.style.transform = 'scale(1.02)';
        selectedLabel.style.opacity = '1';
    });
});

// Form submission
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    submitBtn.textContent = 'Envoi en cours...';

    // Simulate form submission
    try {
        // In a real application, you would send the data to your backend
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Success state
        registrationForm.innerHTML = `
            <div class="success-message">
                <h3>🎉 Candidature reçue !</h3>
                <p>Merci pour votre candidature à SheTech Bénin. Notre équipe va étudier votre dossier et vous recevrez une réponse dans les 7 jours ouvrables.</p>
                <p>En attendant, rejoignez notre communauté sur les réseaux sociaux pour rester informée des actualités.</p>
                <div style="margin-top: 2rem;">
                    <a href="index.html" class="btn btn-primary">Retour à l'accueil</a>
                </div>
            </div>
        `;

        // Update progress steps
        document.querySelectorAll('.step-item').forEach((step, index) => {
            if (index === 0) step.classList.add('completed');
            if (index === 1) step.classList.add('active');
        });

    } catch (error) {
        // Error state
        submitBtn.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
        submitBtn.textContent = 'Soumettre ma candidature';

        alert('Une erreur est survenue. Veuillez réessayer.');
    }
});

// Auto-save form data
function saveFormData() {
    const formData = new FormData(registrationForm);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    localStorage.setItem('shetechRegistration', JSON.stringify(data));
}

function loadFormData() {
    const savedData = localStorage.getItem('shetechRegistration');
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const field = registrationForm.querySelector(`[name="${key}"]`);
            if (field && field.type !== 'radio') {
                field.value = data[key];
            } else if (field && field.type === 'radio' && field.value === data[key]) {
                field.checked = true;
            }
        });
    }
}

// Save form data on input change
registrationForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', saveFormData);
});

// Load saved data on page load
document.addEventListener('DOMContentLoaded', loadFormData);

// Clear saved data on successful submission
window.addEventListener('beforeunload', () => {
    if (document.querySelector('.success-message')) {
        localStorage.removeItem('shetechRegistration');
    }
});