(function() {
  var galleries = document.querySelectorAll('.gallery');

  galleries.forEach(function(gallery) {
    var items = gallery.querySelectorAll('.gallery__item a');
    var overlay = document.createElement('div');
    var overlayImageHolder = document.createElement('div');
    var overlayImage = document.createElement('img');
    var prevButton = document.createElement('div');
    var nextButton = document.createElement('div');
    var closeButton = document.createElement('div');
    var scrollingBody = document.documentElement || document.body;

    overlay.classList.add('gallery-overlay');
    overlayImageHolder.classList.add('gallery-overlay__image');
    prevButton.classList.add('gallery-overlay__prev');
    nextButton.classList.add('gallery-overlay__next');
    closeButton.classList.add('gallery-overlay__close');

    overlayImageHolder.appendChild(overlayImage);
    overlayImageHolder.appendChild(prevButton);
    overlayImageHolder.appendChild(nextButton);
    overlay.appendChild(overlayImageHolder);
    overlay.appendChild(closeButton);

    document.body.appendChild(overlay);

    var galleryObject = {
      element: gallery,
      overlay: overlay,
      overlayImage: overlayImage,
      items: items,
      index: 0,
      keyBoardHandler: function() {
        switch (event.keyCode) {
          case 37:
            galleryObject.prev();
            break;
          case 39:
            galleryObject.next();
            break;
          case 27:
            galleryObject.close.bind(galleryObject)(event);
            break;
        }
      },
      initKeyboardEvents: function() {
        document.addEventListener('keydown', this.keyBoardHandler);
      },
      destroyKeyboardEvents: function() {
        document.removeEventListener('keydown', this.keyBoardHandler);
      },
      open: function(event) {
        scrollingBody.classList.add('no-scroll');
        this.galleryObject.overlay.classList.add('is-open');
        this.galleryObject.overlayImage.src = this.getAttribute('href');
        this.galleryObject.initKeyboardEvents.bind(this.galleryObject)();
        event.preventDefault();
      },
      close: function(event) {
        if (event.target.classList.contains('gallery-overlay')
            || event.target.classList.contains('gallery-overlay__close')
            || event.keyCode == 27) {

          scrollingBody.classList.remove('no-scroll');
          this.overlay.classList.remove('is-open');
          this.destroyKeyboardEvents();
          event.preventDefault();
        }
      },
      prev: function(event) {
        this.index--;

        if (this.index < 0) {
          this.index = items.length - 1;
        }

        this.overlayImage.src = this.items[this.index].getAttribute('href');
      },
      next: function(event) {
        this.index++;

        if (this.index + 1 > items.length) {
          this.index = 0;
        }

        this.overlayImage.src = this.items[this.index].getAttribute('href');
      }
    };

    galleryObject.overlay.addEventListener('click', galleryObject.close.bind(galleryObject));
    prevButton.addEventListener('click', galleryObject.prev.bind(galleryObject));
    nextButton.addEventListener('click', galleryObject.next.bind(galleryObject));

    gallery.galleryObject = galleryObject;
    overlay.galleryObject = galleryObject;

    items.forEach(function(item) {
      item.galleryObject = galleryObject;
      item.addEventListener('click', galleryObject.open);
    });
  });
})();
