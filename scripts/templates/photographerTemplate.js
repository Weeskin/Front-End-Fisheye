class PhotographerTemplate {
    constructor(photographer) {
        this.photographer = photographer;
    }

    createPhotographerCard() {
        const photographerCard = document.createElement("article");
        photographerCard.classList.add("photographer-card");
        photographerCard.innerHTML = `
            <a href="photographer.html?id=${this.photographer.id}"  role="link" class="photographer-card__link" aria-label="Voir le profil de ${this.photographer.name}">
                <img class="photographer-card__img" src="/assets/images/photographers/thumbnails/${this.photographer.portrait}" alt="${this.photographer.name}" >
                <h2 class="photographer-card__name">${this.photographer.name}</h2>
            </a>
            <p class="photographer-card__location">${this.photographer.city}, ${this.photographer.country}</p>
            <p class="photographer-card__tagline">${this.photographer.tagline}</p>
            <p class="photographer-card__price">${this.photographer.price}€/jour</p>
        `;
        return photographerCard;
    }
}

export { PhotographerTemplate };