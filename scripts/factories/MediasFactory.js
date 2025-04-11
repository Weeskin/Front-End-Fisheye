import Image from "../models/Image.js"
import Video from "../models/Video.js"

export default class MediasFactory {
    constructor(data) {
        switch (true) {
            case !!data.image:
                return new Image(data);
            case !!data.video:
                return new Video(data);
            default:
                throw 'Data type not recognized';
        }
    }
}