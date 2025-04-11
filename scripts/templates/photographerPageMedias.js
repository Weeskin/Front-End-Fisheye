export default class PhotographerPageMedias {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;
    };

    createPhotographerMedias(){
        const photographerMedias = document.querySelector('.photographer-medias');
        this.medias.forEach((media) => {
            const mediaCard = document.createElement('div');
            mediaCard.classList.add('media-card');
            mediaCard.innerHTML = `
                <img src="${media.image}" alt="${media.title}" class="media-image">
                <h2 class="media-title">${media.title}</h2>
                <p class="media-likes">${media.likes}</p>
            `;
            photographerMedias.appendChild(mediaCard);
        });

    }
}