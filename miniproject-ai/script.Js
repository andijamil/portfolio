document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');

    function toggleMenu() {
        navMenu.classList.toggle('show-menu');
    }

    navToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav__link').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
    
    // Initial call to set active section on page load
    highlightActiveSection();

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        let valid = true;
        
        // Simple validation
        formData.forEach((value, key) => {
            if (!value.trim()) {
                valid = false;
            }
        });
        
        if (valid) {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.skill__card, .about__container, .contact__container'
    );

    animatedElements.forEach(el => observer.observe(el));
    
    // Add animation class to home section elements
    setTimeout(() => {
        document.querySelector('.home__title').style.opacity = 1;
        document.querySelector('.home__subtitle').style.opacity = 1;
        document.querySelector('.home .button').style.opacity = 1;
    }, 300);
    
    // Add scroll to top button functionality
    const scrollTopButton = document.createElement('button');
    scrollTopButton.classList.add('scroll-top');
    scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopButton);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('show-scroll');
        } else {
            scrollTopButton.classList.remove('show-scroll');
        }
    });
    
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add CSS for scroll to top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top {
            position: fixed;
            right: 1.5rem;
            bottom: -20%;
            background-color: var(--orange-color);
            color: #fff;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 99;
            transition: all .4s;
            opacity: 0;
            border: none;
            outline: none;
        }
        
        .scroll-top:hover {
            background-color: var(--navy-color);
            transform: translateY(-3px);
        }
        
        .show-scroll {
            bottom: 2rem;
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});