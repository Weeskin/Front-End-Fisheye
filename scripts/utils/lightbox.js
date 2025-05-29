import { createFocusTrap } from "./focusTrap.js";

export class Lightbox {
    constructor(photographer, medias) {
        this.mediasList = medias;
        this.photographer = photographer;
        this.currentIndex = 0;
        this.main = document.querySelector('main');
        this.lightboxWrapper = this.createLightbox();
        this.focusTrapInstance = createFocusTrap(this.lightboxWrapper);
        this.initEventListeners();
        this.lastFocusedElement = null;
        this.scrollPosition = 0;
    }

    createLightbox() {
        const lightBoxWrapper = document.createElement('div');
        lightBoxWrapper.classList.add('lightbox_wrapper', 'wrapper');
        lightBoxWrapper.setAttribute('aria-modal', 'true');
        lightBoxWrapper.setAttribute('role', 'dialog');
        lightBoxWrapper.style.display = 'none';

        this.lightboxDiv = document.createElement('div');
        this.lightboxDiv.classList.add('lightbox');
        this.lightboxDiv.setAttribute('aria-label', 'Vue de plus près du média');

        this.btnClose = document.createElement('button');
        this.btnClose.classList.add('btn_close_lightbox', 'btn_close');
        this.btnClose.setAttribute('aria-label', 'Fermer la lightbox');

        this.btnPrevious = document.createElement('button');
        this.btnPrevious.classList.add('btn_previous');
        this.btnPrevious.setAttribute('aria-label', 'Image précédente');

        this.btnNext = document.createElement('button');
        this.btnNext.classList.add('btn_next');
        this.btnNext.setAttribute('aria-label', 'Image suivante');

        this.lightboxMedia = document.createElement('figure');
        this.lightboxMedia.classList.add('lightbox_media');
        this.lightboxMedia.setAttribute('role','group');

        this.lightboxDiv.appendChild(this.btnClose)
        this.lightboxDiv.appendChild(this.btnPrevious)
        this.lightboxDiv.appendChild(this.lightboxMedia)
        this.lightboxDiv.appendChild(this.btnNext)

        lightBoxWrapper.appendChild(this.lightboxDiv)
        this.main.appendChild(lightBoxWrapper);

        return lightBoxWrapper;
    }

    openLightbox(mediaId) {
        this.lastFocusedElement = document.activeElement;
        this.currentIndex = this.mediasList.findIndex(media => media.id === parseInt(mediaId));

        if (this.currentIndex !== -1) {
            this.currentMedia = this.mediasList[this.currentIndex];
            this.lightboxWrapper.style.display = 'flex';
            this.lightboxDiv.style.display = 'flex';

            this.scrollPosition = window.scrollY;
            document.body.style.top = `-${this.scrollPosition}px`;
            document.body.classList.add('no-scroll');

            this.lightboxTemplate();
            this.focusTrapInstance.activate();
            this.addKeyboardListeners();
        }
    }

    lightboxTemplate() {
        const mediaElement = this.currentMedia.getMediaElement(this.photographer);
        this.lightboxMedia.innerHTML = '';
        if (mediaElement) {
            this.lightboxMedia.innerHTML = mediaElement;
        }

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = this.currentMedia.title;
        this.lightboxMedia.appendChild(figcaption);

        const currentMediaElement = this.lightboxMedia.querySelector('video, img');
        if (currentMediaElement && currentMediaElement.tagName === 'VIDEO') {
            // Si c'est une vidéo, ajoute l'attribut 'controls'
            currentMediaElement.setAttribute('controls', '');
        }
    }

    closeLightbox() {
        this.lightboxWrapper.style.display = 'none';
        this.lightboxMedia.innerHTML = '';

        document.body.classList.remove('no-scroll');
        document.body.style.top = '';
        window.scrollTo(0, this.scrollPosition);

        this.focusTrapInstance.deactivate();
        this.removeKeyboardListeners();
    }

    nextMedia() {
        this.currentIndex++;
        if (this.currentIndex > this.mediasList.length - 1) this.currentIndex = 0;
        this.currentMedia = this.mediasList[this.currentIndex];
        this.lightboxTemplate();
        this.showActiveBtn(this.btnNext);
        this.focusTrapInstance.activate();
    }

    previousMedia() {
        this.currentIndex--;
        if (this.currentIndex < 0) this.currentIndex = this.mediasList.length - 1;
        this.currentMedia = this.mediasList[this.currentIndex];
        this.lightboxTemplate();
        this.showActiveBtn(this.btnPrevious);
        this.focusTrapInstance.activate();
    }

    showActiveBtn(btn) {
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 100);
    }

    initEventListeners() {
        this.btnClose.addEventListener('click', () => this.closeLightbox());
        this.btnPrevious.addEventListener('click', () => this.previousMedia());
        this.btnNext.addEventListener('click', () => this.nextMedia());
    }

    // --- Gère les écouteurs clavier globaux pour la lightbox ---
    handleGlobalKeyboard = (e) => {
        if (this.lightboxWrapper.style.display === 'flex') { // S'assure que la lightbox est ouverte
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.previousMedia();
                    break;
                case 'ArrowRight':
                    this.nextMedia();
                    break;
            }
        }
    }

    addKeyboardListeners() {
        document.addEventListener('keyup', this.handleGlobalKeyboard);
    }

    removeKeyboardListeners() {
        document.removeEventListener('keyup', this.handleGlobalKeyboard);
    }
}
