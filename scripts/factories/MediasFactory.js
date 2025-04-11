import Image from "../models/Image.js"
import Video from "../models/Video.js"

export default class MediasFactory {
    constructor(data) {
        if (data.image) {
            return new Image(data)
        }
        if (data.video) {
            return new Video(data)
        } else {
            throw 'Data type not recognized'
        }
    }
}