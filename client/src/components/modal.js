import React, {useContext} from 'react'
import Modal from 'react-bootstrap/modal'
import MyForm from 'components/form'
import {ModalContext} from 'contexts/modal_context'


export default function MyModal(props) {
  const {    
    modalStatus, 
    modalContent: { title='Modal Title',  body='Modal Body', footer }, 
    modalControl: {hide, show}
  } = useContext(ModalContext)

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
