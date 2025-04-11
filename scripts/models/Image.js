import MediaInfos from "./MediaInfos";

export default class Image implements MediaInfos{
    constructor(data) {
        super(data);
        this.image = data.image;
    }

    getDomElement() {
        return `
            <img src=${this.image}} />
        `
    }
}
