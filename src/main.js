const dialog = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;


openBtn.addEventListener('click', () => {
    lastActive = document.activeElement; 
    dialog.showModal(); 
    dialog.querySelector('input, select, textarea, button')?.focus(); 
});


closeBtn.addEventListener('click', () => {
    dialog.close('cancel');
});


form?.addEventListener('submit', (e) => {
    e.preventDefault();

    
    [...form.elements].forEach(el => el.setCustomValidity?.(''));

    
    if (!form.checkValidity()) {
        const email = form.elements.email;
        if (email?.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail, например name@example.com');
        }
        form.reportValidity(); 

        
        [...form.elements].forEach(el => {
            if (el.willValidate) {
                el.toggleAttribute('aria-invalid', !el.checkValidity());
            }
        });
        return;
    }

    dialog.close('success');
    form.reset();
});


dialog.addEventListener('close', () => {
    lastActive?.focus();
});

const phone = document.getElementById('phone');

phone?.addEventListener('input', () => {
    
    const digits = phone.value.replace(/\D/g, '').slice(0, 11);
    
    
    const normalizedDigits = digits.startsWith('8') ? '7' + digits.slice(1) : digits;

    let formattedValue = '';
    
    
    if (normalizedDigits.length > 0) {
        formattedValue += '+7';
    }
    if (normalizedDigits.length > 1) {
        formattedValue += ` (${normalizedDigits.slice(1, 4)}`;
    }
    if (normalizedDigits.length > 4) {
        formattedValue += `) ${normalizedDigits.slice(4, 7)}`;
    }
    if (normalizedDigits.length > 7) {
        formattedValue += `-${normalizedDigits.slice(7, 9)}`;
    }
    if (normalizedDigits.length > 9) {
        formattedValue += `-${normalizedDigits.slice(9, 11)}`;
    }
    
    phone.value = formattedValue;
});