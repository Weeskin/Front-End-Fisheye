import { Lightbox } from "../utils/lightbox.js";

export class PhotographerProfilMedias {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;
        this.lightbox = new Lightbox(photographer, medias);
    }

    createPhotographerProfileMedias() {
        const photographerMedias = document.querySelector('.photographer_profile_medias');

        if (!photographerMedias) {
            console.error('Elément ".photographer_profile_medias" introuvable.');
            return;
        }

        photographerMedias.innerHTML = `
            <section class="gallery">
                ${this.medias.map(media => `
                    <article class="gallery_card">
                        <a href="#" data-media="${media.id}" role="link" aria-label="View media large">
                            <figure>${media.getMediaElement(this.photographer)}</figure>
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
        this.attachLightboxEventListeners();
    }

    attachLightboxEventListeners() {
        const gallery = document.querySelector('.gallery');
        if (!gallery) {
            console.error('Elément ".gallery" introuvable.');
            return;
        }

        gallery.addEventListener('click', (e) => {
            const target = e.target.closest('a[data-media]');
            if (target) {
                e.preventDefault();
                const mediaId = target.dataset.media;
                this.lightbox.openLightbox(mediaId);
            }
        });


    }
}
