import { MediaInfos } from "./MediaInfos.js";

export class Image extends MediaInfos {
    constructor(data) {
        super(data);
        this.image = data.image;
    }

    getMediaElement(photographer) {
        return `
            <img class="gallery_thumbnail" src="./assets/images/photographers/samplePhotos-Small/${photographer.name}/${this.image}" alt="${this.alt}">
        `;
    }
}
