import React, { useState } from 'react';
import { Router } from '@reach/router';
import Page from './page'
import Main from 'pages/main'
import Travolta from 'assets/travolta.gif'
import Modal from 'components/modal'
import ModalContextProvider from 'contexts/modal_context'
import UserContextProvider from 'contexts/user_context'

const NotFound = () => <img 
    src={Travolta} alt="Nothing Here!" 
    style={{ display:'block', margin:'auto'}}
  /> 

export default function Pages() {
  
  return (
    <UserContextProvider>
      <ModalContextProvider>
        <Page >
          <Router style={{width: '100%'}}>
            <Main      path="/" />
            <NotFound  default />
          </Router>
          <Modal />
        </Page>
      </ModalContextProvider>
    </UserContextProvider>
  );
}
