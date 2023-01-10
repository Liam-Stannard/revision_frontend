import React from 'react'
import UseDocumentTitle from '../util/documentData'

function BasePage(props) {
    const titlePrefix = 'revis.io | '
    UseDocumentTitle(`${titlePrefix}${props.title}`)
    return <>{props.content}</>
  }

  export default BasePage;