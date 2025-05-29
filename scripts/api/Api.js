import { Photographer } from "../models/Photographer.js";
import { mediasFactory } from "../factories/MediasFactory.js";

export class ApiPhotographer {
    constructor(url) {
        this.url = url;
    }

    async getPhotographers() {
        try {
            // --- Tente de récupérer les données des photographes depuis l'URL ---
            const response = await fetch(this.url);

            // --- Vérifie si la requête a réussi ---
            if (!response.ok) {
                // --- Si la requête a échoué, lance une erreur avec le statut HTTP ---
                const message = `Erreur HTTP ! Statut : ${response.status}`;
                throw new Error(message);
            }

            // --- Parse la réponse JSON ---
            const data = await response.json();

            // --- Transforme les données des photographes en instances de la classe Photographer ---
            const photographers = data.photographers.map(
                (photographerData) => new Photographer(photographerData)
            );

            // --- Retourne les photographes et les médias ---
            return { photographers, medias: data.media };

        } catch (error) {
            // --- Capture les erreurs qui se produisent lors de la récupération des données ---
            console.error("Erreur lors de la récupération des photographes :", error);
            throw error; // --- Propage l'erreur pour qu'elle soit gérée par le code appelant ---
        }
    }

    async getPhotographerById(photographerId) {
        try {
            // --- Récupère tous les photographes et médias ---
            const { photographers, medias } = await this.getPhotographers();

            // --- Trouve le photographe avec l'ID spécifié ---
            const foundPhotographer = photographers.find(
                (photographer) => photographer.id === photographerId
            );

            // --- Vérifie si le photographe a été trouvé ---
            if (!foundPhotographer) {
                // --- Si le photographe n'a pas été trouvé, lance une erreur ---
                const message = `Photographe avec l'ID ${photographerId} non trouvé`;
                throw new Error(message);
            }

            // --- Filtre les médias associés à ce photographe et les transforme avec la factory dans un tableau ---
            const photographerMedias = medias.reduce(
                (mediaItems, mediaData) => {
                    if (mediaData.photographerId === photographerId) {
                        mediaItems.push(mediasFactory(mediaData));
                    }
                    return mediaItems;
                },
                []
            );

            // --- Crée une instance de Photographer avec les données trouvées ---
            const photographer = new Photographer(foundPhotographer);

            // --- Retourne le photographe et ses médias ---
            return { photographer, medias: photographerMedias };

        } catch (error) {
            // --- Capture les erreurs qui se produisent lors de la récupération du photographe par ID ---
            console.error("Erreur lors de la récupération du photographe par ID :", error);
            throw error; // --- Propage l'erreur pour qu'elle soit gérée par le code appelant ---
        }
    }
}