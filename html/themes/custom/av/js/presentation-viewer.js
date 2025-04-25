(function (Drupal, drupalSettings) {
  'use strict';

  class PresentationViewer {
    booted = false;
    currentPage = 0;
    totalPages = 0;

    constructor(url, viewer, navigation, presenterNotes) {
      this.url = url;
      this.viewerEl = viewer;
      this.navigation = navigation;
      this.presenterNotes = presenterNotes;
    }

    async init() {
      if (this.booted) {
        return;
      }
      this.booted = true;

      // Loading the document.
      const loadingTask = pdfjsLib.getDocument({
        url: this.url,
      });
      this.pdfDocument = await loadingTask.promise;

      const eventBus = new pdfjsViewer.EventBus();
      const pdfLinkService = new pdfjsViewer.PDFLinkService({
        eventBus,
      });

      const pdfPage = await this.pdfDocument.getPage(1);

      const scale = this.viewerEl.clientWidth / pdfPage.getViewport({ scale: 1 }).width / pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS;
      const viewport = pdfPage.getViewport({ scale });
      this.viewerEl.height = viewport.height * pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS;

      this.pdfViewer = new pdfjsViewer.PDFPageView({
        container: this.viewerEl,
        eventBus,
        scale,
        defaultViewport: viewport,
        linkService: pdfLinkService,
      });

      this.navigation.totalPage.innerText = this.totalPages = this.pdfDocument.numPages;
      this.navigation.currentPage.innerText = this.currentPage;

      if (this.presenterNotes) {
        let maxHeight = 0;
        this.presenterNotes.querySelectorAll('[data-page]').forEach(el => {
          maxHeight = Math.max(maxHeight, el.clientHeight);
        })
        this.presenterNotes.style.height = `${maxHeight}px`;
      }

      this.navigation.next?.addEventListener('click', this.next.bind(this));
      this.navigation.previous?.addEventListener('click', this.previous.bind(this));
    }

    async next() {
      if (this.currentPage >= this.totalPages) {
        return;
      }

      await this.viewPage(this.currentPage+1);
    }

    async previous() {
      if (this.currentPage <= 1) {
        return;
      }

      await this.viewPage(this.currentPage-1);
    }

    async viewPage(page) {
      if (!this.booted) {
        throw new Error("Can not viewPage before calling .init");
      }

      this.navigation.currentPage.innerText = this.currentPage = page;
      if (this.currentPage >= this.totalPages) {
        this.navigation.next?.setAttribute('disabled', "disabled");
      }
      else {
        this.navigation.next?.removeAttribute('disabled');
      }
      if (this.currentPage <= 1) {
        this.navigation.previous?.setAttribute('disabled', true);
      }
      else {
        this.navigation.previous?.removeAttribute('disabled');
      }

      this.presenterNotes?.querySelectorAll("[data-page]").forEach(el => {
        el.style.display = 'none';
      });
      this.presenterNotes?.querySelectorAll(`[data-page='${this.currentPage}']`).forEach(el => {
        el.style.removeProperty('display');
      });

      const pdfPage = await this.pdfDocument.getPage(this.currentPage);
      this.pdfViewer.setPdfPage(pdfPage);
      this.pdfViewer.draw();

    }
  }

  Drupal.behaviors.presentationViewer = {
    attach: function (context) {
      if (typeof pdfjsLib.GlobalWorkerOptions.workerSrc === "undefined" || pdfjsLib.GlobalWorkerOptions.workerSrc === "") {
        console.log(drupalSettings)
        pdfjsLib.GlobalWorkerOptions.workerSrc = drupalSettings.presentationViewer.workerSrc;
      }

      once('presentationViewer', '.presentationViewer', context).forEach(async presentation => {
        const url = presentation.getAttribute('data-pdf-url');
        if (url === null) {
          console.error("Presentation Viewer element dit not specify a data-pdf-url property", el);
          return;
        }

        const container = presentation.querySelector('.pdfViewer');
        if (container === null) {
          console.error("Presentation Viewer element must have a child with .pdfViewer class. The PDF.js library applies styles based on that class.");
          return;
        }

        const navigation = presentation.querySelector('.navigation');
        if (navigation === null) {
          console.error("Presentation Viewer element must have a child with .navigation class.");
          return;
        }

        const presenterNotes = presentation.querySelector('.presenter-notes');
        const viewer = new PresentationViewer(
          url,
          container,
          {
            totalPage: navigation.querySelector('.totalPage'),
            currentPage: navigation.querySelector('.curPage'),
            previous: navigation.querySelector('.prev'),
            next: navigation.querySelector('.next'),
          },
          presenterNotes
        );
        await viewer.init();

        await viewer.viewPage(1);
      });
    }
  };

})(Drupal, drupalSettings);
