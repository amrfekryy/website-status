import React from 'react'
import Modal from 'react-bootstrap/modal'
import MyForm from 'components/form'

export default function _Modal(props) {
  const {
    modalStatus, 
    modalContent: {
      title='Modal Title', 
      body='Modal Body', 
      footer
    }, 
    modalControl: {hide, show}} = props

  return (
    <>
      <Modal show={modalStatus} onHide={hide}>
        <Modal.Header closeButton><Modal.Title>{title}</Modal.Title></Modal.Header>
        <Modal.Body>
          {body?.form ? <MyForm form={body.form} {...props}/> : body}
        </Modal.Body>
        {footer? <Modal.Footer>{footer}</Modal.Footer>: <></>} 
      </Modal>
    </>
  );
}
