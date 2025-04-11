import Photographer from "../models/Photographer.js";
import MediasFactory from "../factories/MediasFactory.js";

export default class ApiPhotographer {
    constructor(url) {
        this.url = url;
    }

    async getPhotographers() {
        const response = await fetch(this.url);
        const data = await response.json();
        return {
            photographers: data.photographers.map(p => new Photographer(p)),
            medias: data.media
        };
    }

    async getPhotographerById(id) {
        const {photographers, medias} = await this.getPhotographers();
        let photographer = photographers.find(photographer => photographer.id === id);

        const photographerMedias = medias.reduce((acc, media) => {
            if (media.photographerId === id) {
                acc.push(new MediasFactory(media));
            }

            return acc
        }, [])

        return {photographer: new Photographer(photographer), medias: photographerMedias};
    }
}