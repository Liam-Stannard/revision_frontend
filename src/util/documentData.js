import { useRef, useEffect } from 'react'

function UseDocumentTitle(title) {

  useEffect(() => {
    document.title = title;
  }, [title]);

}

export default UseDocumentTitle