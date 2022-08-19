import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import {Document, Page, pdfjs} from "react-pdf";
import React, {startTransition, useCallback, useEffect, useId, useLayoutEffect, useRef, useState} from "react";

function useFullScreen() {
  const fullscreenRef = useRef();
  const [isFullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    fullscreenRef.current.addEventListener('fullscreenchange', _ => {
      setFullScreen(document.fullscreenElement !== null);
    });
  }, [fullscreenRef, setFullScreen])

  function makeFullScreen() {
    if (typeof fullscreenRef.current !== "undefined") {
      fullscreenRef.current.requestFullscreen();
    }
  }

  return { fullscreenRef, isFullScreen, makeFullScreen };
}

export default function PdfViewer(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { fullscreenRef, isFullScreen, makeFullScreen } = useFullScreen();

  const slideHeightId = useId();
  const [slideHeight, setSlideHeight] = useState(null);

  const hasNotes = props.notes !== null;
  const notes = (props.notes ?? [])[pageNumber - 1] ?? null;

  const heightStyle = typeof CSS !== "undefined" ? `
    .${CSS.escape(slideHeightId)} {
      height: ${slideHeight}px;
    }
  ` : null;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onRenderSuccess() {
    console.log(document.querySelector(`.${CSS.escape(slideHeightId)} canvas`));

    const slideCanvas = document.querySelector(`.${CSS.escape(slideHeightId)} canvas`) ?? null;
    if (slideCanvas) {
      setSlideHeight(prev => prev === null ? slideCanvas.clientHeight : prev);
    }
  }

  const changePage = useCallback(
  function changePage(offset) {
    startTransition(
      () => setPageNumber(prevPageNumber => Math.min(Math.max(prevPageNumber + offset, 1), numPages))
    )
  }, [setPageNumber, numPages]);

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  useEffect(() => {
    const onKeyPress = evt => {
      if (evt.key === "ArrowRight") {
        changePage(1)
      }
      else if (evt.key === "ArrowLeft") {
        changePage(-1)
      }
    };
    document.addEventListener('keydown', onKeyPress)

    return () => document.removeEventListener('keydown', onKeyPress);
  }, [changePage])

  // We do not use useEffect because this must run before Document is rendered
  // and it can also run multiple times
  if (typeof window !== "undefined") {
    pdfjs.GlobalWorkerOptions.workerSrc = `/utils/pdf.worker.min.js`
  }

  return (
    <div className={"flex flex-col relative hover-parent"} ref={fullscreenRef}>
      {!isFullScreen
        ? <button className={'absolute top-4 right-4 z-10 not-prose p-2 rounded-xl bg-white border-gray-800 border-2 hover-target'} onClick={makeFullScreen}>
            <img src={"/images/fullscreen.png"} alt={"View Fullscreen"} width={36} />
          </button>
        : null}
      {slideHeight && !isFullScreen ? <style>{heightStyle}</style> : null}
      <Document {...props} className={"flex justify-center mt-auto " + slideHeightId} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} width={isFullScreen ? undefined : 812} onRenderSuccess={onRenderSuccess} />
      </Document>
      <div className={"flex justify-between mt-auto" + (isFullScreen ? " text-white" : "")}>
        <button
          type="button"
          disabled={pageNumber <= 1}
          style={{ opacity: pageNumber <= 1 ? 0 : 1 }}
          onClick={previousPage}
        >
          Previous
        </button>
        {
          numPages !== null
          ? <p>
              Page {pageNumber} of {numPages}
            </p>
          : null
        }
        <button
          type="button"
          disabled={pageNumber >= numPages}
          style={{ opacity: pageNumber >= numPages ? 0 : 1 }}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
      {hasNotes
        ? <div className={"not-prose p-2 border-2" + (isFullScreen ? " text-white" : "")}>
            <h3 className='font-bold'>Presenter notes</h3>
            <div className={'prose' + (isFullScreen ? " text-white" : "")} dangerouslySetInnerHTML={{ __html: notes}} />
          </div>
        : null}
    </div>
  );
}
