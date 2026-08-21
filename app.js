/* 
 * Kioske da Tecnologia Landing Page Interactivity Script
 * Handles Interactive Form Selection & WhatsApp Link Generation
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('evaluationForm');
    const defectButtons = document.querySelectorAll('.defect-btn');
    let selectedDefect = '';

    // Handle Defect Option Buttons
    defectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Toggle active state
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                selectedDefect = '';
            } else {
                // Remove active from other buttons
                defectButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                selectedDefect = button.getAttribute('data-value');
            }
        });
    });

    // Handle Phone Input Mask (Brazilian format)
    const phoneInput = document.getElementById('clientWhatsapp');
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        // Apply mask: (XX) X XXXX-XXXX or (XX) XXXX-XXXX
        if (value.length > 10) {
            e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7)}`;
        } else if (value.length > 6) {
            e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
        } else if (value.length > 2) {
            e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            e.target.value = `(${value}`;
        }
    });

    // Form Submission & WhatsApp Link Redirection
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('clientName').value.trim();
        const whatsapp = document.getElementById('clientWhatsapp').value.trim();
        const brand = document.getElementById('deviceBrand').value;
        const model = document.getElementById('deviceModel').value.trim();
        
        if (!selectedDefect) {
            alert('Por favor, selecione uma opção em "O QUE ACONTECEU?".');
            return;
        }

        // WhatsApp Details
        const businessPhone = '555491450742'; // Country code 55 + Area 54 + Phone 9145-0742
        
        // Build the text message with formatting
        const textMessage = `Olá Kioske da Tecnologia! Gostaria de solicitar uma *Avaliação Gratuita*.

*Nome:* ${name}
*WhatsApp:* ${whatsapp}
*Aparelho:* ${brand} ${model}
*Problema:* ${selectedDefect}

_Enviado pelo site da Kioske da Tecnologia_`;

        // Create the official WhatsApp URL
        const whatsappUrl = `https://wa.me/${businessPhone}?text=${encodeURIComponent(textMessage)}`;

        // Open in new tab/window
        window.open(whatsappUrl, '_blank');
    });

    // Scroll Header Background Change
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(2, 8, 19, 0.96)';
            header.style.padding = '5px 0';
        } else {
            header.style.backgroundColor = 'rgba(2, 8, 19, 0.85)';
            header.style.padding = '0';
        }
    });
});
