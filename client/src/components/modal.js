import React, {useContext} from 'react'
import Modal from 'react-bootstrap/modal'
import MyForm from 'components/form'
import {ModalContext} from 'contexts/modal_context'
import {get} from 'lodash'

export default function MyModal(props) {
  const {    
    modalStatus, 
    modalContent: { title='Modal Title',  body='Modal Body', footer, form }, 
    modalControl: {hide}
  } = useContext(ModalContext)

  return (
    <>
      <Modal show={modalStatus} onHide={hide}>
        <Modal.Header closeButton><Modal.Title>{title}</Modal.Title></Modal.Header>
        
        <Modal.Body>{form ? <MyForm form={form} /> : body}</Modal.Body>
        
        {footer? <Modal.Footer>{footer}</Modal.Footer>: <></>} 
      </Modal>
    </>
  );
}
