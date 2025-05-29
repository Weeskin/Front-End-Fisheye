import { Formulaire } from '../utils/formulaire.js';

export class PhotographerProfilHeader {
    constructor(photographer) {
        this.photographer = photographer;
        this.photographerHeaderSection = document.querySelector(".photographer_profile_header");
        this.contactButton = null;
        this.formulaire = new Formulaire(this.photographer.name);
    }

    createPhotographerProfileHeader() {
        if (!this.photographerHeaderSection) {
            console.error(`L'élément .photographer_profile_header est introuvable.`);
            return;
        }
        this.photographerHeaderSection.innerHTML = `
            <div class="photographer_profile__infos">
                <h1 class="photographer-card__name">${this.photographer.name}</h1>
                <p class="photographer-card__location">${this.photographer.city}, ${this.photographer.country}</p>
                <p class="photographer-card__tagline">${this.photographer.tagline}</p>
            </div>
            <button class="btn btn_cta" type="button">Contactez-moi</button>
            <img class="photographer_profile__img" src="assets/images/photographers/thumbnails/${this.photographer.portrait}" alt="${this.photographer.name}">
        `;
        this.initContactButton();
        this.createAndAppendForm();
    }

    initContactButton() {
        this.contactButton = this.photographerHeaderSection.querySelector(".btn_cta");
        if (this.contactButton) {
            this.contactButton.addEventListener('click', () => {
                if (this.formulaire) {
                    this.formulaire.showForm();
                }
            });
        }
    }

    createAndAppendForm() {
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.appendChild(this.formulaire.formWrapper);
        }
    }
}