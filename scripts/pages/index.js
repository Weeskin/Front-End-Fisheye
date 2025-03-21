import { photographerTemplate } from "/scripts/templates/photographer.js";

export async function getPhotographers() {
    const response = await fetch("./data/photographers.json");
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data)
    return { photographers: data.photographers };
}

export async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

export async function init() {
    try {
        // Récupérer les datas des photographes
        const { photographers } = await getPhotographers();
        await displayData(photographers);
    } catch (error) {
        console.error('Error initializing photographers data:', error);
    }
}

init();