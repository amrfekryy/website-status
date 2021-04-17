import React, { useState } from 'react';
import { Router } from '@reach/router';
// import { Home, Form, NotFound } from './pages'
import Page from './page'
import Main from 'pages/main'
import Form from 'components/form'
import Travolta from 'assets/travolta.gif'
import Modal from 'components/modal'

const NotFound = () => <img 
    src={Travolta} alt="Nothing Here!" 
    style={{ display:'block', margin:'auto'}}
  /> 


export default function Pages() {
  // modal settings
  const [modalStatus, setModalStatus] = useState(false)
  const [modalContent, setModalContent] = useState({})
  const modalControl = {
    hide: () => setModalStatus(false),
    show: () => setModalStatus(true),
    setContent: (content) => setModalContent(content),
    showContent: (content) => {setModalStatus(true); setModalContent(content)}
  }
  
  return (
    <Page modalControl={modalControl}>
      <Router style={{width: '100%'}}>
        <Main      path="/" modalControl={modalControl} />
        {/* <Form      path="/form" />                  */}
        <NotFound  default />
      </Router>
      <Modal {...{modalStatus, modalContent, modalControl}}/>
    </Page>
  );
}
