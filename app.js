/* 
 * Kioske da Tecnologia Landing Page Interactivity Script
 * Handles Interactive Form Selection, Header Scroll Dynamics & WhatsApp Dispatch
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Defect Options Selector
    // -------------------------------------------------------------
    const defectButtons = document.querySelectorAll('.defect-btn');
    let selectedDefect = '';

    defectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                selectedDefect = '';
            } else {
                defectButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                selectedDefect = button.getAttribute('data-value');
            }
        });
    });

    // -------------------------------------------------------------
    // 2. Phone Input Mask (BR standard)
    // -------------------------------------------------------------
    const phoneInput = document.getElementById('clientWhatsapp');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
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
    }

    // -------------------------------------------------------------
    // 3. Form Submission & WhatsApp Link Dispatch
    // -------------------------------------------------------------
    const form = document.getElementById('evaluationForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('clientName').value.trim();
            const whatsapp = document.getElementById('clientWhatsapp').value.trim();
            const brand = document.getElementById('deviceBrand').value;
            const model = document.getElementById('deviceModel').value.trim();
            
            if (!selectedDefect) {
                alert('Por favor, selecione uma opção em "O que aconteceu com o aparelho?".');
                return;
            }

            const businessPhone = '555491450742'; // Kioske da Tecnologia Official WhatsApp
            
            const textMessage = `Olá Kioske da Tecnologia! Gostaria de solicitar uma *Avaliação Gratuita*.

*Nome:* ${name}
*WhatsApp:* ${whatsapp}
*Aparelho:* ${brand} ${model}
*Problema:* ${selectedDefect}

_Enviado pelo site oficial da Kioske da Tecnologia_`;

            const whatsappUrl = `https://wa.me/${businessPhone}?text=${encodeURIComponent(textMessage)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // -------------------------------------------------------------
    // 4. Header Scroll State
    // -------------------------------------------------------------
    const header = document.getElementById('mainHeader');
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // -------------------------------------------------------------
    // 5. Floating Onira CTA Widget
    // -------------------------------------------------------------
    const oniraCta = document.getElementById('oniraCta');
    const oniraCtaClose = document.getElementById('oniraCtaClose');
    
    if (oniraCta && oniraCtaClose) {
        const isDismissed = localStorage.getItem('kioske_cta_onira') === 'dispensado';
        
        if (!isDismissed) {
            let shown = false;
            const showCta = () => {
                if (!shown && !localStorage.getItem('kioske_cta_onira')) {
                    shown = true;
                    oniraCta.classList.add('active');
                }
            };

            // Trigger on scroll or after 4s
            window.addEventListener('scroll', () => {
                if (window.scrollY > 250) showCta();
            }, { passive: true });

            setTimeout(showCta, 4000);
        }

        oniraCtaClose.addEventListener('click', (e) => {
            e.stopPropagation();
            oniraCta.classList.remove('active');
            localStorage.setItem('kioske_cta_onira', 'dispensado');
        });
    }
});
