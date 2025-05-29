export class Formulaire {
    constructor(photographerName) {
        // --- Stocke le nom du photographe pour l'afficher dans le formulaire ---
        this.photographerName = photographerName;
        // --- Crée l'élément HTML du formulaire modal ---
        this.formWrapper = this.createForm();
        // --- Initialise les écouteurs d'événements pour le formulaire ---
        this.initEventListeners();
        // --- Ajoute un écouteur d'événement pour fermer le formulaire en cliquant en dehors ---
        this.addBackgroundClickListener();
    }

    createForm() {
        // --- Crée le conteneur principal du formulaire modal ---
        const modalWrapper = document.createElement('div');
        modalWrapper.classList.add('modal_wrapper', 'wrapper');
        modalWrapper.setAttribute('aria-modal', 'true');
        modalWrapper.setAttribute('role', 'dialog');
        // --- Définit le contenu HTML du formulaire modal ---
        modalWrapper.innerHTML = `
            <div class="modal_form" aria-describedby="formTitle">
                <div class="modal_form_title">
                    <h2 id="formTitle">Contactez-moi <button class="btn_close" type="button" aria-label="Fermer le formulaire de contact"></button></h2>
                    <p class="modal_form_name">${this.photographerName}</p>
                </div>
                <form novalidate>
                    ${this.createFormField('firstname', 'Prénom', 'Minimum 3 caractères, maximum 15 caractères. Les chiffres et caractères spéciaux différents de - ne sont pas autorisés.', 'text', 15, true)}
                    ${this.createFormField('lastname', 'Nom', 'Minimum 3 caractères, maximum 15 caractères. Les chiffres et caractères spéciaux différents de - ne sont pas autorisés.', 'text', 15, true)}
                    ${this.createFormField('email', 'Email', 'Veuillez renseigner une adresse mail valide.', 'email', 100, true)}
                    ${this.createFormField('message', 'Votre message', 'Votre message doit contenir entre 20 et 200 caractères.', 'textarea', 200, true)}
                    <button class="btn btn_submit" type="submit" aria-label="Envoyer">Envoyer</button>
                </form>
            </div>
        `;
        return modalWrapper;
    }

    createFormField(id, labelText, errorMessage, type = 'text', maxLength = null, required = false) {
        // --- Crée le code HTML pour un champ de formulaire individuel ---
        return `
            <div class="form_content">
                <label id="${id}-label" for="${id}">${labelText} <span aria-hidden="true">*</span></label>
                <${type === 'textarea' ? 'textarea' : 'input'}
                    class="formField"
                    aria-labelledby="${id}-label"
                    type="${type === 'textarea' ? undefined : type}"
                    id="${id}"
                    name="${id}"
                    ${maxLength ? `maxlength="${maxLength}"` : ''}
                    data-error="${errorMessage}"
                    ${required ? 'required' : ''}
                ></${type === 'textarea' ? 'textarea' : 'input'}>
                <span></span>
            </div>
        `;
    }

    initEventListeners() {
        // --- Sélectionne les éléments interactifs du formulaire ---
        const closeModalButton = this.formWrapper.querySelector(".btn_close");
        const form = this.formWrapper.querySelector('form');
        const firstNameInput = this.formWrapper.querySelector("#firstname");
        const lastNameInput = this.formWrapper.querySelector("#lastname");
        const emailInput = this.formWrapper.querySelector("#email");
        const messageInput = this.formWrapper.querySelector("#message");

        // --- Ajoute les écouteurs d'événements aux éléments interactifs ---
        document.addEventListener('keyup', e => { if(e.key === 'Escape')  this.hideForm(); });
        closeModalButton.addEventListener('click', () => this.hideForm()); // Ferme le formulaire
        form.addEventListener('input', () => this.displayCustomMessage()); // Affiche les messages d'erreur personnalisés
        form.addEventListener('submit', (event) => this.handleSubmit(event, firstNameInput, lastNameInput, emailInput, messageInput)); // Gère la soumission du formulaire
    }

    addBackgroundClickListener() {
        // --- Ajoute un écouteur d'événement au conteneur du formulaire pour permettre la fermeture en cliquant en dehors ---
        this.formWrapper.addEventListener('click', (event) => {
            if (event.target === this.formWrapper) {
                this.hideForm();
            }
        });
    }

    showForm() {
        // --- Affiche le formulaire modal ---
        this.formWrapper.style.display = "flex";
        // --- Ajoute une classe pour l'animation d'ouverture et met le focus sur le bouton de fermeture ---
        setTimeout(() => {
            this.formWrapper.classList.add('open');
            this.formWrapper.querySelector(".btn_close").focus();
        }, 0);
    }

    hideForm() {
        // --- Cache le formulaire modal ---
        this.formWrapper.style.display = "none";
    }

    handleSubmit(event, firstName, lastName, email, message) {
        // --- Gère la soumission du formulaire ---
        event.preventDefault();
        // --- Vérifie la validité du formulaire ---
        if (!event.target.checkValidity()) {
            // --- Si le formulaire n'est pas valide, affiche les messages d'erreur ---
            this.displayCustomMessage();
        } else {
            // --- Si le formulaire est valide, crée un objet avec les données du formulaire ---
            const formDatas = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                message: message.value,
            };
            // --- Affiche les données du formulaire dans la console (à remplacer par une action réelle, comme l'envoi à un serveur) ---
            console.log(JSON.stringify(formDatas));
            // --- Réinitialise les classes de validité des champs ---
            this.formWrapper.querySelectorAll('.formField').forEach(input => input.classList.remove('valid'));
            // --- Réinitialise le formulaire ---
            event.target.reset();
            // --- Cache le formulaire après la soumission réussie ---
            this.hideForm();
        }
    }

    checkInputValidity(input, regex) {
        // --- Vérifie la validité d'un champ de formulaire individuel en utilisant une expression régulière ---
        const errorMessage = input.dataset.error;
        const messageProvider = input.nextElementSibling;
        const isValid = regex.test(input.value);

        // --- Si le champ est valide, efface le message d'erreur et supprime les attributs d'accessibilité ---
        if (isValid) {
            messageProvider.innerHTML = "";
            messageProvider.removeAttribute("role");
            input.removeAttribute("aria-invalid");
        } else {
            // --- Si le champ n'est pas valide, affiche le message d'erreur et ajoute les attributs d'accessibilité ---
            messageProvider.innerHTML = errorMessage;
            messageProvider.setAttribute("role", "alert");
            input.setAttribute("aria-invalid", "true");
        }

        // --- Ajoute ou supprime les classes CSS pour indiquer la validité du champ ---
        input.classList.toggle('invalid', !isValid);
        input.classList.toggle('valid', isValid);
    }

    displayCustomMessage() {
        // --- Définit les expressions régulières pour la validation des champs ---
        const regexName = /^([A-Za-z|\s]{3,15})?([-]{0,1})?([A-Za-z|\s]{3,15})$/;
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const regexMessage = /^[A-Za-z0-9|\s]{20,200}$/;

        // --- Vérifie la validité de chaque champ et affiche les messages d'erreur correspondants ---
        this.checkInputValidity(this.formWrapper.querySelector("#firstname"), regexName);
        this.checkInputValidity(this.formWrapper.querySelector("#lastname"), regexName);
        this.checkInputValidity(this.formWrapper.querySelector("#email"), regexEmail);
        this.checkInputValidity(this.formWrapper.querySelector("#message"), regexMessage);
    }
}