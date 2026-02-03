document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Scroll Animations (Reveal on Scroll)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Form Handling with Formspree
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    if (formStatus) {
                        formStatus.textContent = "Thanks for your submission! Teacher Jayson will be in touch.";
                        formStatus.className = "form-status success";
                    }
                    contactForm.reset();
                } else {
                    const jsonData = await response.json();
                    if (formStatus) {
                        if (Object.hasOwn(jsonData, 'errors')) {
                            formStatus.textContent = jsonData["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formStatus.textContent = "Oops! There was a problem submitting your form";
                        }
                        formStatus.className = "form-status error";
                    }
                }
            } catch (error) {
                if (formStatus) {
                    formStatus.textContent = "Oops! There was a problem submitting your form";
                    formStatus.className = "form-status error";
                }
            }
        });
    }
});
