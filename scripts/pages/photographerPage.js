import ApiPhotographer from "../api/Api.js";
import PhotographerPageHeader from "../templates/PhotographerPageHeader.js";
import PhotographerPageMedias from "../templates/photographerPageMedias.js";

const photographersApi = new ApiPhotographer("./data/photographers.json");
const photographerId = Number(new URLSearchParams(window.location.search).get("id"));

export default async function getPhotographerById() {
    try {
        const { photographers, medias } = await photographersApi.getPhotographers();
        let photographer = photographers.find(photographer => photographer.id === photographerId);
        let photographerMedias = medias.filter(media => media.photographerId === photographerId);
        return { photographer, medias: photographerMedias };
    } catch (error) {
        console.error("Error fetching photographer data:", error);
    }
}

async function displayProfilePage() {
    const { photographer, medias } = await photographersApi.getPhotographerById(photographerId);
    const headerTemplate = new PhotographerPageHeader(photographer);
    headerTemplate.createPhotographerPageHeader();
    const mediasTemplate = new PhotographerPageMedias(photographer, medias);
    mediasTemplate.createPhotographerMedias();
}

displayProfilePage();