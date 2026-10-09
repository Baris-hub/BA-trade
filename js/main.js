document.addEventListener('DOMContentLoaded', () => {
    // Language Switcher
    let currentLang = 'en';
    const langToggle = document.getElementById('lang-toggle');
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    const formElements = document.querySelectorAll('[data-i18n-placeholder]');

    const updateTranslations = (lang) => {
        elementsToTranslate.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        
        formElements.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if(translations[lang][key]) {
                el.setAttribute('placeholder', translations[lang][key]);
            }
        });
        
        document.documentElement.lang = lang;
        langToggle.textContent = lang === 'en' ? 'TR' : 'EN';
    };

    langToggle.addEventListener('click', (e) => {
        e.preventDefault();
        currentLang = currentLang === 'en' ? 'tr' : 'en';
        updateTranslations(currentLang);
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for Reveal Animations & Active Nav Links
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    const counters = document.querySelectorAll('.counter-val');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Highlight Nav
                let currentId = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${currentId}`) {
                        item.classList.add('active');
                    }
                });
                
                // Run counters
                if(entry.target.id === 'about') {
                    runCounters();
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('reveal');
        sectionObserver.observe(section);
    });
    
    // Counter Animation
    let countersRun = false;
    function runCounters() {
        if(countersRun) return;
        countersRun = true;
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if(current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + (counter.getAttribute('data-suffix') || '');
                }
            };
            updateCounter();
        });
    }

    // Parallax Hero
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if(heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
    });

    // Form Validation (Simple)
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate form submission
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = 'Sent Successfully!';
                btn.classList.add('success');
                contactForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.classList.remove('success');
                }, 3000);
            }, 1500);
        });
    }

    // Initialize Translations
    updateTranslations(currentLang);
});
