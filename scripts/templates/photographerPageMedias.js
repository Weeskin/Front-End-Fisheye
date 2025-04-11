export default class PhotographerPageMedias {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;
    }

    createPhotographerMedias() {
        const photographerMedias = document.querySelector('.photograph-medias');
        if (!photographerMedias) {
            console.error('Elément ".photographer-medias" introuvable.');
            return;
        }
        photographerMedias.innerHTML = `
        <section class="gallery">
            ${this.medias.map(media => `
                <article class="gallery_card">
                    <a href="#" data-media="${media.id}" role="link" aria-label="View media large">
                        <figure>${media.getDomElement(this.photographer)}</figure>
                    </a>
                    <figcaption>
                        <h2>${media.title}</h2>
                        <div role="group" aria-label="Like button and number of likes">
                            <span class="nbLike">${media.likes}</span>
                            <button class="btn_like" type="button" aria-label="Like" data-id="${media.id}">
                                <span class="fas fa-heart" aria-hidden="true"></span>
                            </button>
                        </div>
                    </figcaption>
                </article>
            `).join('')}
        </section>
        <aside>
            <p class="photographer_Likes">
                <span class="photographer_likes_count"></span>
                <span class="fas fa-heart" aria-hidden="true"></span>
            </p>
            <span>${this.photographer.price}€ / jour</span>
        </aside>
        `;
    }
}