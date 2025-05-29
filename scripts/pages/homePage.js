import { ApiPhotographer } from "../api/Api.js";
import { Photographer } from "../models/Photographer.js";
import { PhotographerTemplate } from "../templates/photographerTemplate.js";

const photographersSection = document.querySelector(".photographer_section");
const photographersApi = new ApiPhotographer("./data/photographers.json");

async function displayPhotographers() {
    try {
        const { photographers } = await photographersApi.getPhotographers();

        photographers
            .map(photographer => new Photographer(photographer))
            .forEach(photographer => {
            const photographerTemplate = new PhotographerTemplate(photographer);
            const photographerCard = photographerTemplate.createPhotographerCard();
            photographersSection.appendChild(photographerCard);
        });
    } catch (error) {
        console.error(`Error displaying photographers: ${error}`);
    }
}

await displayPhotographers()