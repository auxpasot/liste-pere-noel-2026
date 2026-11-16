
const maPhoto = document.getElementById("ma-photo");

if (maPhoto) {

    maPhoto.addEventListener("click", function() {

        maPhoto.style.pointerEvents = "none";

        maPhoto.classList.add("tourne");

        setTimeout(function() {
            window.location.href = "liste.html";
        }, 1200);

    });

}
