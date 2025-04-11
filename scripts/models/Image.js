import MediaInfos from "./MediaInfos.js";

export default class Image extends MediaInfos{
    constructor(data) {
        super(data);
        this.image = data.image;
    }

    getDomElement(photographer) {
        this.photographer = photographer;
        return `
            <img class="gallery_thumbnail" src="./assets/images/photographers/samplePhotos-Small/${this.photographer.name}/${this.image}" alt="${this.alt}">
        `
    }
}