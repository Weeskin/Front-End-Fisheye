import MediaInfos from "./MediaInfos";

export default class Video extends MediaInfos{
    constructor(data) {
        super(data);
        this.video = data.video;
    }

    getDomElement() {
        return `
            <video >
             <source src=${this.video} type="video/mp4">
            </video>
        `
    }
}