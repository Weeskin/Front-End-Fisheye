export const focusTrap = (domElt) => {
    const focusableElements = domElt.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    domElt.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

export class Lightbox {
    constructor(photographer, medias) {
        this.mediasList = medias;
        this.photographer = photographer;
        this.currentIndex = 0;
        this.main = document.querySelector('main');
        this.lightboxWrapper = this.createLightbox();
        this.initEventListeners();
    }

    createLightbox() {
        const lightBoxWrapper = document.createElement('div');
        lightBoxWrapper.classList.add('lightbox_wrapper', 'wrapper');
        lightBoxWrapper.setAttribute('aria-modal', 'true');
        lightBoxWrapper.setAttribute('role', 'dialog');
        lightBoxWrapper.style.display = 'none';

        this.lightboxDiv = document.createElement('div');
        this.lightboxDiv.classList.add('lightbox');
        this.lightboxDiv.setAttribute('aria-label', 'Vue de plus près');

        this.btnClose = document.createElement('button');
        this.btnClose.classList.add('btn_close_lightbox', 'btn_close');
        this.btnClose.setAttribute('aria-label', 'Fermer la lightbox');

        this.btnPrevious = document.createElement('button');
        this.btnPrevious.classList.add('btn_previous');
        this.btnPrevious.setAttribute('aria-label', 'Image précédente');

        this.lightboxMedia = document.createElement('figure');
        this.lightboxMedia.classList.add('lightbox_media');
        this.lightboxMedia.setAttribute('aria-label','Image actuelle');
        this.lightboxMedia.setAttribute('role','media');

        this.btnNext = document.createElement('button');
        this.btnNext.classList.add('btn_next');
        this.btnNext.setAttribute('aria-label', 'Image suivante');

        this.lightboxDiv.appendChild(this.btnClose)
        this.lightboxDiv.appendChild(this.btnNext)
        this.lightboxDiv.appendChild(this.btnPrevious)
        this.lightboxDiv.appendChild(this.lightboxMedia)
        lightBoxWrapper.appendChild(this.lightboxDiv)

        this.main.appendChild(lightBoxWrapper);

        // Focus trap
        focusTrap(lightBoxWrapper);

        return lightBoxWrapper;
    }

    openLightbox(mediaId) {
        this.currentIndex = this.mediasList.findIndex(media => media.id === parseInt(mediaId));

        if (this.currentIndex !== -1) {
            this.currentMedia = this.mediasList[this.currentIndex];
            this.lightboxWrapper.style.display = 'flex';
            this.lightboxDiv.style.display = 'flex';
            this.btnClose.focus();
            this.lightboxTemplate();
        }
    }

    lightboxTemplate() {
        const mediaElement = this.currentMedia.getMediaElement(this.photographer);
        this.lightboxMedia.innerHTML = '';
        this.lightboxMedia.innerHTML = mediaElement;

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
    }

    nextMedia() {
        this.currentIndex++;
        if (this.currentIndex > this.mediasList.length - 1) this.currentIndex = 0;
        this.currentMedia = this.mediasList[this.currentIndex];
        this.lightboxTemplate();
        this.showActiveBtn(this.btnNext);
    }

    previousMedia() {
        this.currentIndex--;
        if (this.currentIndex < 0) this.currentIndex = this.mediasList.length - 1;
        this.currentMedia = this.mediasList[this.currentIndex];
        this.lightboxTemplate();
        this.showActiveBtn(this.btnPrevious);
    }

    showActiveBtn(btn) {
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 100);
    }

    initEventListeners() {
        this.btnClose.addEventListener('click', () => this.closeLightbox());
        this.btnPrevious.addEventListener('click', () => this.previousMedia());
        this.btnNext.addEventListener('click', () => this.nextMedia());

        document.addEventListener('keyup', e => {
            if (this.lightboxWrapper.style.display === 'flex') {
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
        });
    }
}
