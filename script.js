document.addEventListener('DOMContentLoaded', () => {

    /* ELEMENTS */
    const navbar      = document.getElementById('navbar');
    const hamburger   = document.getElementById('hamburger');
    const navLinks    = document.getElementById('navLinks');
    const progressBar = document.getElementById('progressBar');
    const sections    = document.querySelectorAll('section[id], footer[id]');
    const navItems    = document.querySelectorAll('.nav-link');

    /* SCROLL PROGRESS BAR */
    function updateProgress() {
        const scrollTop  = window.scrollY;
        const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
        const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = pct + '%';
    }

    /* NAVBAR SHADOW ON SCROLL */
    function updateNavbar() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /* ACTIVE NAV LINK */
    function updateActiveLink() {
        const scrollY     = window.scrollY;
        const windowH     = window.innerHeight;
        const docH        = document.documentElement.scrollHeight;
        const atBottom    = scrollY + windowH >= docH - 10;

        let current = '';

        if (atBottom) {
            current = sections[sections.length - 1].id;
        } else {
            sections.forEach(sec => {
                const top = sec.offsetTop - Math.floor(windowH * 0.4);
                if (scrollY >= top) current = sec.id;
            });
        }

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    /* COMBINED SCROLL HANDLER */
    window.addEventListener('scroll', () => {
        updateProgress();
        updateNavbar();
        updateActiveLink();
    }, { passive: true });

    /* run once on load */
    updateProgress();
    updateNavbar();
    updateActiveLink();

    /* MOBILE NAV TOGGLE */
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        /* close on link click */
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    /* SCROLL REVEAL */
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

});
