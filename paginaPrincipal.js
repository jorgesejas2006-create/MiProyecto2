document.addEventListener('DOMContentLoaded', () => {

    /* ===================== CARRUSELES ===================== */
    const carruseles = document.querySelectorAll('.carousel');

    carruseles.forEach(carrusel => {
        const cont = carrusel.querySelector('.cards.scroll');
        const btnLeft = carrusel.querySelector('.arrow.left');
        const btnRight = carrusel.querySelector('.arrow.right');

        // Clonar contenido para scroll infinito real
        cont.innerHTML += cont.innerHTML;

        const card = cont.querySelector('article');
        const cardWidth = card.offsetWidth + 30; // 30px = gap

        let autoScroll;

        // → Botón derecha
        btnRight.addEventListener('click', () => {
            cont.scrollBy({ left: cardWidth, behavior: "smooth" });
        });

        // ← Botón izquierda
        btnLeft.addEventListener('click', () => {
            cont.scrollBy({ left: -cardWidth, behavior: "smooth" });
        });

        // Efecto bucle infinito
        cont.addEventListener("scroll", () => {
            if (cont.scrollLeft >= cont.scrollWidth / 2) {
                cont.scrollLeft = 0;
            }
        });

        // Auto scroll (OPCIONAL)
        function activarAutoScroll() {
            autoScroll = setInterval(() => {
                btnRight.click();
            }, 2500);
        }

        cont.addEventListener("mouseenter", () => clearInterval(autoScroll));
        cont.addEventListener("mouseleave", activarAutoScroll);

        activarAutoScroll();
    });


    /* ===================== MENÚ HAMBURGUESA ===================== */
    const btnMenu = document.getElementById('botonHamburguesa');
    const menu = document.getElementById('menuHamburguesa');

    btnMenu.addEventListener('click', () => {
        btnMenu.classList.toggle('abrir');
        menu.classList.toggle('mostrar');
    });

    // Cerrar al hacer click en un enlace
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            btnMenu.classList.remove('abrir');
            menu.classList.remove('mostrar');
        });
    });

    // Cerrar si se toca fuera del menú
    document.addEventListener("click", e => {
        if (!menu.contains(e.target) && !btnMenu.contains(e.target)) {
            menu.classList.remove('mostrar');
            btnMenu.classList.remove('abrir');
        }
    });

});
/* ===================== BUSCADOR ===================== */

document.addEventListener("DOMContentLoaded", () => {

    const inputBuscador = document.querySelector(".search input");
    const secciones = document.querySelectorAll("section");

    inputBuscador.addEventListener("input", () => {

        const texto = inputBuscador.value.toLowerCase().trim();

        secciones.forEach(section => {

            let coincidencias = 0;
            const juegos = section.querySelectorAll("article");

            juegos.forEach(juego => {

                const titulo = juego.querySelector("h3").textContent.toLowerCase();
                const genero = juego.querySelector("span").textContent.toLowerCase();
                const descripcion = juego.querySelector("p").textContent.toLowerCase();

                if (
                    titulo.includes(texto) ||
                    genero.includes(texto) ||
                    descripcion.includes(texto)
                ) {
                    juego.style.display = "block";
                    coincidencias++;
                } else {
                    juego.style.display = "none";
                }

            });

            // Si no hay coincidencias, ocultamos la sección completa
            if (coincidencias === 0) {
                section.style.display = "none";
            } else {
                section.style.display = "block";
            }

        });

    });
});
