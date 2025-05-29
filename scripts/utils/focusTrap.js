export const createFocusTrap = (containerElement) => {
    let focusableElements = [];
    let firstFocusableElement = null;
    let lastFocusableElement = null;
    let originalFocusedElement = null; // Stocke l'élément qui avait le focus avant l'activation du trap

    /**
     * Met à jour la liste des éléments focalisables à l'intérieur du conteneur.
     * Exclut les éléments désactivés ou avec tabindex="-1".
     */
    const updateFocusableElements = () => {
        focusableElements = containerElement.querySelectorAll(
            'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
        );
        // Convertit NodeList en Array pour faciliter la manipulation
        focusableElements = Array.from(focusableElements).filter(el => {
            // Vérifie la visibilité de l'élément
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden';
        });

        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];
    };

    /**
     * Gère l'événement keydown pour le trap de focus.
     * @param {KeyboardEvent} e - L'événement clavier.
     */
    const handleKeydown = (e) => {
        if (e.key === 'Tab') {
            // S'assure que les éléments focalisables sont à jour avant de gérer la tabulation
            updateFocusableElements(); // Mettre à jour au cas où le contenu a changé

            if (e.shiftKey) { // Shift + Tab (tabulation arrière)
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus();
                }
            } else { // Tab (tabulation avant)
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
    };

    /**
     * Active le trap de focus.
     * Sauvegarde l'élément actuellement focusé et déplace le focus vers le premier élément focalisable du conteneur.
     */
    const activate = () => {
        originalFocusedElement = document.activeElement; // Sauvegarde l'élément focusé avant d'ouvrir la modale
        updateFocusableElements(); // Initialise la liste des éléments focalisables

        if (firstFocusableElement) {
            firstFocusableElement.focus(); // Déplace le focus vers le premier élément de la modale
        }
        containerElement.addEventListener('keydown', handleKeydown);
    };

    /**
     * Désactive le trap de focus.
     * Retire l'écouteur d'événements et restaure le focus à l'élément qui l'avait avant l'activation.
     */
    const deactivate = () => {
        containerElement.removeEventListener('keydown', handleKeydown);
        if (originalFocusedElement) {
            originalFocusedElement.focus(); // Restaure le focus à l'élément d'origine
        }
        // Réinitialise les références
        focusableElements = [];
        firstFocusableElement = null;
        lastFocusableElement = null;
        originalFocusedElement = null;
    };

    return { activate, deactivate };
};