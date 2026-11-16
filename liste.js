
const fenetre = document.getElementById("fenetre");
const cadeaux = document.querySelectorAll(".cadeau");
const compteur = document.getElementById("compteur");

let indexActuel = 0;
let debutX = 0;
let positionX = 0;
let enCours = false;
let carteActive = null;

// AFFICHER LE CADEAU

function afficherCadeau() {

    cadeaux.forEach((cadeau, index) => {
        cadeau.classList.toggle("actif", index === indexActuel);
    });

    compteur.textContent =
        String(indexActuel + 1).padStart(2, "0") +
        " / " +
        String(cadeaux.length).padStart(2, "0");
}

// DEBUT DU GLISSEMENT

fenetre.addEventListener("pointerdown", (e) => {

    carteActive = cadeaux[indexActuel];

    if (!carteActive) return;

    debutX = e.clientX;
    positionX = 0;
    enCours = true;

    carteActive.style.transition = "none";

    fenetre.setPointerCapture(e.pointerId);

});

// MOUVEMENT DU DOIGT

fenetre.addEventListener("pointermove", (e) => {

    if (!enCours) return;

    positionX = e.clientX - debutX;

    const rotation = positionX * 0.08;

    carteActive.style.transform =
        `translateX(${positionX}px) rotate(${rotation}deg)`;

});

// FIN DU GLISSEMENT

fenetre.addEventListener("pointerup", () => {

    if (!enCours) return;

    enCours = false;

    const seuil = 100;

    if (Math.abs(positionX) > seuil) {

        const direction = positionX > 0 ? 1 : -1;

        carteActive.style.transition =
            "transform 0.4s ease, opacity 0.4s ease";

        carteActive.style.transform =
            `translateX(${direction * window.innerWidth}px) rotate(${direction * 30}deg)`;

        carteActive.style.opacity = "0";

        setTimeout(() => {

            indexActuel = (indexActuel + 1) % cadeaux.length;

            carteActive.style.transition = "";
            carteActive.style.transform = "";
            carteActive.style.opacity = "";

            afficherCadeau();

        }, 400);

    } else {

        carteActive.style.transition = "transform 0.4s ease";
        carteActive.style.transform = "";

    }

});

// INITIALISATION

afficherCadeau();
