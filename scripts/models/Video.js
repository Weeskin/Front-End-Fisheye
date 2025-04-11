import MediaInfos from "./MediaInfos.js";

export default class Video extends MediaInfos{
    constructor(data) {
        super(data);
        this.video = data.video;
        this.alt = data.alt;
    }

    getDomElement(photographer) {
        this.photographer = photographer;
        return `
            <video class="gallery_thumbnail" aria-label="${this.alt}">
                <source src="./assets/images/photographers/samplePhotos-Small/${this.photographer.name}/${this.video}" type="video/mp4">
            </video>
        `
    }
}