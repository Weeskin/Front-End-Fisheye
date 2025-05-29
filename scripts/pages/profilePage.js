import { ApiPhotographer } from "../api/Api.js";
import { PhotographerProfilHeader } from "../templates/photographerProfileHeader.js";
import { PhotographerProfilMedias } from "../templates/photographerProfileMedias.js";
import { Filter } from "../utils/filter.js";
import { displayTotalLikes } from "../utils/likes.js";

async function displayProfilePage() {
    // --- Récupère l'ID du photographe depuis l'URL ---
    const photographerId = Number(new URLSearchParams(window.location.search).get("id"));

    // --- Crée une instance de ApiPhotographer pour accéder aux données ---
    const photographersApi = new ApiPhotographer("./data/photographers.json");

    // try {
        // --- Tente de récupérer les données du photographe et de ses médias via l'Api ---
        const { photographer, medias } = await photographersApi.getPhotographerById(photographerId);

        // --- Vérifie si les données du photographe et des médias ont été récupérées avec succès ---
        if (photographer && medias) {
            // --- Crée et affiche l'en-tête du profil du photographe ---
            const profileHeader = new PhotographerProfilHeader(photographer);
            profileHeader.createPhotographerProfileHeader();

            // --- Crée et affiche les médias du profil du photographe et gère l'ouverture de la lightbox ---
            const profilMedias = new PhotographerProfilMedias(photographer, medias);
            profilMedias.createPhotographerProfileMedias();

            // --- Crée et affiche le filtre des médias du profil du photographe ---
            const profilFilter = new Filter(photographer, profilMedias);
            profilFilter.createFilter();

            displayTotalLikes(medias)
        } else {
            // --- Si les données du photographe ou des médias sont manquantes, affiche un message d'erreur ---
            console.error("Erreur : Données du photographe ou des médias manquantes.");
            const mainElement = document.querySelector('main');
            if (mainElement) {
                mainElement.innerHTML = `<p class="error-message">Erreur lors du chargement des données du photographe.</p>`;
            }
        }
    // } catch (error) {
    //     // --- Capture les erreurs qui se produisent lors de la récupération ou de l'affichage des données ---
    //     console.error("Erreur lors de l'affichage de la page de profil :", error);
    //     // --- Affiche un message d'erreur à l'utilisateur ---
    //     const mainElement = document.querySelector('main');
    //     if (mainElement) {
    //         mainElement.innerHTML = `<p class="error-message">Erreur lors du chargement de la page.</p>`;
    //     }
    // }
}

// --- Exécute la fonction displayProfilePage ---
await displayProfilePage();