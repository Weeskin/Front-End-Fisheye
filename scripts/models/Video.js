import { MediaInfos } from "./MediaInfos.js";

export class Video extends MediaInfos {
    constructor(data) {
        super(data);
        this.video = data.video;
    }

    getMediaElement(photographer) {
        return `
            <video class="gallery_thumbnail" aria-label="${this.alt}">
                <source src="./assets/images/photographers/samplePhotos-Small/${photographer.name}/${this.video}" type="video/mp4">
            </video>
        `;
    }
}