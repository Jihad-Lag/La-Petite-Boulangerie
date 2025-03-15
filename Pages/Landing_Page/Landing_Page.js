// ---- Animation_Avis_Clients_Par_Jihad_laglil ----
document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.testimonials-container');
    let isMouseOver = false;
    container.addEventListener('mouseenter', function() {
        isMouseOver = true;
        moveTestimonials();
    });

    container.addEventListener('mouseleave', function() {
        isMouseOver = false;
        resetPosition();
    });

    function moveTestimonials() {
        if (isMouseOver) {
            const totalWidth = container.scrollWidth;
            const visibleWidth = container.clientWidth;
            const scrollPosition = container.scrollLeft;
            container.scrollLeft = scrollPosition + 20;

        
            if (scrollPosition >= totalWidth - visibleWidth) {
                container.scrollLeft = 0;
            }
        }

        if (isMouseOver) {
            requestAnimationFrame(moveTestimonials);
        }
    }


    function resetPosition() {
        container.scrollLeft = 0;
    }
});

// --------------- Navigation_Bar_Animation_Par_Hossam_Eddine_Aberaich -------------------

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const sticknavbar = document.querySelector(".navbar-sticky");
    const halfcircle = document.querySelector(".half-circle");
    const dropdownmenu = document.querySelector('.dropdown_menu');
    const toggles = document.querySelectorAll('.toggle');
    const togglesvg1 = document.querySelector('.toggle-big svg path');
    const togglesvg2 = document.querySelector('.toggle-sticky svg path');

    window.addEventListener("scroll", function () {
        if (window.scrollY > 1) {
            halfcircle.classList.add("scrolled");
            navbar.classList.add("scrolled");
            sticknavbar.classList.add("scrolled");
        } else {
            halfcircle.classList.remove("scrolled");
            navbar.classList.remove("scrolled");
            sticknavbar.classList.remove("scrolled");
        }
    });

    dropdownmenu.classList.remove('open');

    toggles.forEach((toggle) => {
        toggle.addEventListener("click", function () {
            dropdownmenu.classList.toggle('open');
            const isOpen = dropdownmenu.classList.contains('open');

            const openIcon = 'M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z';
            const closeIcon = 'M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z';

            togglesvg1.setAttribute('d', isOpen ? openIcon : closeIcon);
            togglesvg2.setAttribute('d', isOpen ? openIcon : closeIcon);
        });
    });
});


