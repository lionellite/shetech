
```javascript
// Smooth scrolling for program links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Program card hover effects
const programCards = document.querySelectorAll('.program-card-main');

programCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const program = card.dataset.program;

        // Add glow effect based on program
        switch(program) {
            case 'web':
                card.style.boxShadow = '0 20px 40px rgba(255, 107, 107, 0.3)';
                break;
            case 'design':
                card.style.boxShadow = '0 20px 40px rgba(168, 230, 207, 0.3)';
                break;
            case 'marketing':
                card.style.boxShadow = '0 20px 40px rgba(255, 217, 61, 0.3)';
                break;
            case 'ai':
                card.style.boxShadow = '0 20px 40px rgba(155, 89, 182, 0.3)';
                break;
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.program-card-main, .method-feature, .timeline-week').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target.textContent;
            if (target.includes('250')) {
                animateCounter(entry.target, 0, 250, 2000);
            } else if (target.includes('100%')) {
                entry.target.textContent = '100%';
            } else if (!isNaN(target)) {
                animateCounter(entry.target, 0, parseInt(target), 1500);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

function animateCounter(element, start, end, duration) {
    const increment = (end - start) / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
    }, 16);
}

stats.forEach(stat => statsObserver.observe(stat));

// URL parameter handling for pre-selecting program
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const program = urlParams.get('program');

    if (program) {
        const targetCard = document.querySelector(`[data-program="${program}"]`);
        if (targetCard) {
            targetCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            targetCard.style.animation = 'pulse 2s ease-in-out';
        }
    }
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);