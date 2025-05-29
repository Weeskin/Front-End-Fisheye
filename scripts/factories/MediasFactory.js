import { Image } from "../models/Image.js";
import { Video } from "../models/Video.js";

// --- Me permettra d'ajouter d'autres types de média ---
const mediaTypes = {
    image: Image,
    video: Video,
};

// --- Retourne me le bon média en fonction de son type ---
export const mediasFactory = (data) => {
    for (const type in mediaTypes) {
        if (data[type]) {
            return new mediaTypes[type](data);
        }
    }
    throw `Type de média inconnu : ${data}`;
};