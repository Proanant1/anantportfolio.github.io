// ============================================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute('href')
        );

        if (target) {

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }

    });

});


// ============================================================
// FADE-IN ANIMATION ON SCROLL
// ============================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = '1';

                entry.target.style.transform =
                    'translateY(0)';

            }

        });

    },
    observerOptions
);


// Observe all cards and timeline items

document
    .querySelectorAll(
        '.skill-card, .project-card, .timeline-item, .cert-item'
    )
    .forEach(el => {

        el.style.opacity = '0';

        el.style.transform =
            'translateY(20px)';

        el.style.transition =
            'opacity 0.6s ease-out, transform 0.6s ease-out';

        observer.observe(el);

    });


// ============================================================
// MATRIX / HACKER CURSOR
// ============================================================

// Don't run custom cursor on touch/mobile devices

const isTouchDevice =
    window.matchMedia('(pointer: coarse)').matches;


// Only create cursor on devices with a real mouse

if (!isTouchDevice) {

    // --------------------------------------------------------
    // MAIN CURSOR
    // --------------------------------------------------------

    const cursor = document.createElement('div');

    cursor.id = 'matrix-cursor';

    document.body.appendChild(cursor);


    // --------------------------------------------------------
    // PARTICLE CONTAINER
    // --------------------------------------------------------

    const trailContainer =
        document.createElement('div');

    trailContainer.id =
        'matrix-trail-container';

    document.body.appendChild(trailContainer);


    // --------------------------------------------------------
    // MOUSE POSITION
    // --------------------------------------------------------

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;


    // --------------------------------------------------------
    // MATRIX CHARACTERS
    // --------------------------------------------------------

    const matrixCharacters = [
        '0',
        '1',
        '0',
        '1',
        'X',
        '>',
        '<',
        '/',
        '\\',
        '{',
        '}',
        '[',
        ']',
        '#',
        '$',
        '%'
    ];


    // --------------------------------------------------------
    // TRACK MOUSE
    // --------------------------------------------------------

    document.addEventListener(
        'mousemove',
        (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;


            // Create Matrix trail

            createMatrixParticle(
                mouseX,
                mouseY
            );

        }
    );


    // --------------------------------------------------------
    // SMOOTH CURSOR MOVEMENT
    // --------------------------------------------------------

    function animateCursor() {

        cursorX +=
            (mouseX - cursorX) * 0.18;

        cursorY +=
            (mouseY - cursorY) * 0.18;


        cursor.style.transform =
            `translate3d(${cursorX}px, ${cursorY}px, 0)`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    // ========================================================
    // CREATE MATRIX PARTICLE
    // ========================================================

    function createMatrixParticle(x, y) {

        // Reduce particle density for performance

        if (Math.random() > 0.35) {
            return;
        }


        const particle =
            document.createElement('span');


        particle.className =
            'matrix-particle';


        // Random Matrix character

        particle.textContent =
            matrixCharacters[
                Math.floor(
                    Math.random() *
                    matrixCharacters.length
                )
            ];


        // Random position around cursor

        const offsetX =
            (Math.random() - 0.5) * 18;

        const offsetY =
            (Math.random() - 0.5) * 18;


        particle.style.left =
            `${x + offsetX}px`;

        particle.style.top =
            `${y + offsetY}px`;


        // Random particle size

        particle.style.fontSize =
            `${Math.random() * 8 + 10}px`;


        // Random animation speed

        particle.style.animationDuration =
            `${Math.random() * 0.5 + 0.5}s`;


        // Add particle

        trailContainer.appendChild(
            particle
        );


        // Remove after animation

        setTimeout(() => {

            particle.remove();

        }, 1000);

    }


    // ========================================================
    // HOVER EFFECT
    // ========================================================

    const interactiveElements =
        document.querySelectorAll(
            'a, button, .project-card, .skill-card, .cert-item'
        );


    interactiveElements.forEach(element => {

        element.addEventListener(
            'mouseenter',
            () => {

                cursor.classList.add(
                    'cursor-hover'
                );

            }
        );


        element.addEventListener(
            'mouseleave',
            () => {

                cursor.classList.remove(
                    'cursor-hover'
                );

            }
        );

    });


    // ========================================================
    // CLICK MATRIX BURST
    // ========================================================

    document.addEventListener(
        'click',
        (event) => {

            // Create a burst of Matrix characters

            for (let i = 0; i < 8; i++) {

                createMatrixParticle(
                    event.clientX,
                    event.clientY
                );

            }

        }
    );

}
