import Api from "../api/Api.js";
import Photographer from "../models/Photographer.js";
import PhotographerCard from "../templates/photographerCard.js";

const photographersSection = document.querySelector(".photographer_section");
const photographersApi = new Api("./data/photographers.json");

async function displayPhotographers() {
    try {
        const { photographers } = await photographersApi.getPhotographers();

        photographers
            .map(photographer => new Photographer(photographer))
            .forEach(photographer => {
            const photographerCard = new PhotographerCard(photographer);
            const photographerArticle = photographerCard.createPhotographerCard();
            photographersSection.appendChild(photographerArticle);
        });
    } catch (error) {
        console.error('Error displaying photographers:', error);
    }
}

displayPhotographers();