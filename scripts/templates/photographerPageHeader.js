export default class PhotographerPageHeader {
    constructor(photographer) {
        this.photographer = photographer;
        console.log("photographerPageHeader", photographer);
    }

    createPhotographerPageHeader() {
        const photographHeader = document.querySelector(".photograph-header");

        const aboutSection = `
            <div class="photograph-header-infos">
                <h1 class="photograph-header-name">${this.photographer.name}</h1>
                <p class="photograph-header-location">${this.photographer.city}, ${this.photographer.country}</p>
                <p class="photograph-header-tagline">${this.photographer.tagline}</p>
            </div>
            <button class="btn_cta" type="button">Contactez-moi</button>
            <img class='photograph-header-thumbnail' src='assets/images/photographers/thumbnails/${this.photographer.portrait}' alt='${this.photographer.name}'>
        `;
        photographHeader.innerHTML = aboutSection;
    }
}