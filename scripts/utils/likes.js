export const displayTotalLikes = (medias) => {
    const allBtnLike = document.querySelectorAll(".btn_like");
    const likesElement = document.querySelector(".photographer_likes_count"); // C'est l'élément qui affiche le total des likes en bas

    // Fonction pour mettre à jour le total général des likes
    const updateTotalLikes = () => {
        const totalLikes = medias.reduce((acc, media) => acc + media.likes, 0);
        likesElement.textContent = `${totalLikes}`;
    };

    // Appelle la fonction une première fois pour initialiser le total au chargement de la page
    updateTotalLikes();

    // Ajoute un écouteur d'événement à chaque bouton "J'aime"
    allBtnLike.forEach(btn => {
        btn.addEventListener("click", () => {
            // Trouve le média correspondant dans le tableau 'medias' grâce à l'ID stocké dans le dataset du bouton
            const media = medias.find(media => media.id == btn.dataset.id);

            if (media) { // S'assure que le média a été trouvé
                !btn.classList.contains("liked") ? media.likes++ : media.likes--;

                // Bascule la classe 'liked' sur le bouton pour changer son apparence (et son état)
                btn.classList.toggle("liked");

                // Met à jour le nombre de likes affiché pour ce média individuel
                const individualLikesElement = btn.previousElementSibling;
                individualLikesElement.textContent = `${media.likes}`;

                // Met à jour le total général des likes affiché en bas de page
                updateTotalLikes();
            }
        });
    });
};