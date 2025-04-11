export default class PhotographerPageHeader {
    constructor(photographer) {
        this.photographer = photographer;
    }

    createPhotographerPageHeader() {
        const photographHeader = document.querySelector(".photograph-header");
        photographHeader.innerHTML = `
            <div class="photographer_profile__infos">
                <h1 class="photographer-card__name">${this.photographer.name}</h1>
                <p class="photographer-card__location">${this.photographer.city}, ${this.photographer.country}</p>
                <p class="photographer-card__tagline">${this.photographer.tagline}</p>
            </div>
            <button class="btn btn_cta" type="button">Contactez-moi</button>
            <img class="photographer-card__img" src="assets/images/photographers/thumbnails/${this.photographer.portrait}" alt="${this.photographer.name}">
        `;
    }
}