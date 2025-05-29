export class Filter {
    constructor(photographer, profilMedias) {
        // --- Stocke les informations du profil des médias ---
        this.profilMedias = profilMedias;
        // --- Stocke les informations du photographe ---
        this.photographer = photographer;
        // --- Initialise les éléments du menu de filtrage ---
        this.filterMenu = null;
        this.filterMenuButton = null;
        this.filterButtons = [];
        this.currentFilterElement = null;
        this.allFilters = [];
        this.filterAlreadySelected = null;
    }

    createFilter() {
        // --- Sélectionne la section du filtre dans le DOM ---
        const photographerFilterSection = document.querySelector('.photographer_profile_filter');
        // --- Vérifie si la section du filtre existe ---
        if (!photographerFilterSection) {
            // --- Affiche une erreur si la section du filtre est introuvable ---
            console.error('Elément ".photographer_profile_filter" introuvable.');
            return;
        }

        // --- Définit les options de tri ---
        let options = ["Titre", "Popularité", "Date"];

        // --- Crée le conteneur principal du filtre ---
        const mainContentFilter = document.createElement('div');
        mainContentFilter.classList.add('main_content_filter');

        // --- Crée le titre de la section de tri ---
        const h2 = document.createElement('h2');
        h2.textContent = 'Trier par';
        mainContentFilter.appendChild(h2);

        // --- Crée la section du filtre ---
        const filterSection = document.createElement('div');
        filterSection.classList.add('filter_section');

        // --- Crée le conteneur du menu déroulant ---
        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');

        // --- Crée le bouton du menu déroulant ---
        this.filterMenuButton = document.createElement('button');
        this.filterMenuButton.classList.add('btn_drop');
        this.filterMenuButton.type = 'button';
        this.filterMenuButton.role = 'button';
        this.filterMenuButton.setAttribute('aria-haspopup', 'listbox');
        this.filterMenuButton.setAttribute('aria-expanded', 'false');
        this.filterMenuButton.setAttribute('aria-controls', 'filter options');
        this.filterMenuButton.setAttribute('aria-label', 'Sort by');

        // --- Crée l'élément d'affichage du filtre actuel ---
        this.currentFilterElement = document.createElement('span');
        this.currentFilterElement.id = 'current_filter';
        this.currentFilterElement.textContent = options[0];
        this.filterMenuButton.appendChild(this.currentFilterElement);

        // --- Crée l'icône de chevron pour le menu déroulant ---
        const chevronUp = document.createElement('span');
        chevronUp.classList.add('fa-solid', 'fa-chevron-up');
        chevronUp.setAttribute('aria-hidden', 'true');
        this.filterMenuButton.appendChild(chevronUp);

        // --- Ajoute le bouton au conteneur du menu déroulant ---
        dropdown.appendChild(this.filterMenuButton);

        // --- Crée le conteneur des options du menu déroulant ---
        this.filterMenu = document.createElement('ul');
        this.filterMenu.classList.add('dropdown_content');
        this.filterMenu.setAttribute('aria-hidden', 'true');

        // --- Crée les options du menu déroulant ---
        options.forEach(optionText => {
            const li = document.createElement('li');
            li.role = 'option';
            const button = document.createElement('button');
            button.type = 'button';
            button.tabIndex = -1;
            button.setAttribute('aria-label', `Sort by ${optionText.toLowerCase()}`);
            button.textContent = optionText;
            li.appendChild(button);
            this.filterMenu.appendChild(li);
        });

        // --- Ajoute les options au conteneur du menu déroulant ---
        dropdown.appendChild(this.filterMenu);
        // --- Ajoute le menu déroulant à la section du filtre ---
        filterSection.appendChild(dropdown);
        // --- Ajoute la section du filtre au conteneur principal ---
        mainContentFilter.appendChild(filterSection);
        // --- Ajoute le conteneur principal à la section du photographe ---
        photographerFilterSection.appendChild(mainContentFilter);

        // --- Sélectionne les boutons de filtre ---
        this.filterButtons = this.filterMenu.querySelectorAll('button');
        // --- Convertit les boutons de filtre en tableau ---
        this.allFilters = Array.from(this.filterMenu.querySelectorAll('li button'));

        // --- Initialise les écouteurs d'événements ---
        this.initEventListeners();
    }

    initEventListeners() {
        // --- Initialise l'écouteur d'événement pour ouvrir/fermer le menu ---
        this.openCloseFilterMenu();
        // --- Initialise l'écouteur d'événement pour afficher les médias avec le filtre ---
        this.displayMediaWithFilter();
    }

    openCloseFilterMenu() {
        // --- Ajoute un écouteur d'événement au bouton du menu ---
        this.filterMenuButton.addEventListener("click", () => {
            // --- Appelle la fonction pour basculer l'affichage du menu ---
            this.toggleMenuDisplay();
        });
    };

    toggleMenuDisplay() {
        // --- Vérifie si le menu est actuellement ouvert ---
        const isExpanded = this.filterMenuButton.getAttribute("aria-expanded") === "true" || false;
        // --- Inverse l'état d'ouverture du menu ---
        this.filterMenuButton.setAttribute("aria-expanded", !isExpanded);
        // --- Bascule la classe CSS pour l'effet de rideau ---
        this.filterMenu.classList.toggle("curtain_effect");
        // --- Bascule la classe CSS pour la rotation de l'icône ---
        document.querySelector(".fa-chevron-up").classList.toggle("rotate");

        // --- Définit la nouvelle valeur de aria-hidden pour le menu ---
        const newAriaHiddenValue = this.filterMenu.classList.contains("curtain_effect") ? "false" : "true";
        this.filterMenu.setAttribute("aria-hidden", newAriaHiddenValue);

        // --- Définit la nouvelle valeur de tabindex pour les boutons du menu ---
        const newTabIndexValue = this.filterMenu.classList.contains("curtain_effect") ? "0" : "-1";
        this.filterButtons.forEach(button => button.setAttribute("tabindex", newTabIndexValue));
    };


    displayMediaWithFilter() {
        // --- Trouve le filtre actuellement sélectionné ---
        this.filterAlreadySelected = this.allFilters.find(filter => filter.textContent === this.currentFilterElement.textContent);
        // --- Masque le filtre actuellement sélectionné ---
        if (this.filterAlreadySelected) {
            this.filterAlreadySelected.style.display = 'none';
        }

        // --- Ajoute un écouteur d'événement à chaque filtre ---
        this.allFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // --- Met à jour l'élément d'affichage du filtre actuel ---
                this.currentFilterElement.textContent = filter.textContent;
                // --- Affiche le filtre précédemment sélectionné ---
                if (this.filterAlreadySelected) {
                    this.filterAlreadySelected.style.display = 'block';
                }
                // --- Met à jour le filtre actuellement sélectionné ---
                this.filterAlreadySelected = filter;
                // --- Masque le filtre actuellement sélectionné ---
                this.filterAlreadySelected.style.display = 'none';
                // --- Trie les médias en fonction du filtre sélectionné ---
                this.sortByFilter(filter.textContent);
                // --- Bascule l'affichage du menu ---
                this.toggleMenuDisplay();
            });
        });
    };

    sortByFilter = (filterValue) => {
        // --- Affiche les informations de profil des médias ---
        console.log(this.profilMedias);
        // --- Trie les médias en fonction de la valeur du filtre ---
        switch (filterValue) {
            case 'Titre':
                this.profilMedias.medias.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'Popularité':
                this.profilMedias.medias.sort((a, b) => b.likes - a.likes);
                break;
            case 'Date':
                this.profilMedias.medias.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
        }

        // --- Met à jour l'affichage des médias ---
        this.profilMedias.createPhotographerProfileMedias();

        // --- Sélectionne les éléments de média dans la galerie ---
        const mediaElements = document.querySelectorAll('.gallery_card');
        // --- Ajoute une animation à chaque élément de média ---
        mediaElements.forEach((media, index) => {
            setTimeout(() => {
                media.classList.add('animeCard');
            }, 100 * index);
        });
    };


}