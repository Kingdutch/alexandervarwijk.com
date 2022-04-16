import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import {Document, Page, pdfjs} from "react-pdf";
import {startTransition, useState} from "react";

export default function PdfViewer(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    startTransition(
      () => setPageNumber(prevPageNumber => prevPageNumber + offset)
    )
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  // We do not use useEffect because this must run before Document is rendered
  // and it can also run multiple times
  if (typeof window !== "undefined") {
    pdfjs.GlobalWorkerOptions.workerSrc = `/utils/pdf.worker.min.js`
  }

  return (
    <div className={"flex flex-col"}>
      <Document {...props} className={"flex justify-center"} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} width={812} />
      </Document>
      <div className={"flex justify-between"}>
        <button
          type="button"
          disabled={pageNumber <= 1}
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
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
