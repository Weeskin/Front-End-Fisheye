import Api from "../api/Api.js";
import Photographer from "../models/Photographer.js";
import PhotographerPageHeader from "../templates/PhotographerPageHeader.js";

const photographersApi = new Api("./data/photographers.json");
const photographerId = new URLSearchParams(window.location.search).get("id");

export default async function getPhotographerById(){
    try {
        const { photographers } = await photographersApi.getPhotographers();
        let photographer = photographers
            .find(photographer => photographer.id === photographerId);
        if (!photographer) {
            console.log("photographerId:", photographerId, "photographer:",  photographer);
        }

    } catch (error) {
        console.error('Error fetching photographer data:', error);
    }
}

async function displayProfilePage (){
    const photographer = await getPhotographerById();
    const headerTemplate = new PhotographerPageHeader(photographer);
    headerTemplate.createPhotographerPageHeader();
}

displayProfilePage();
