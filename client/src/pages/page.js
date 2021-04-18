import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import {ModalContext} from 'contexts/modal_context'
import {UserContext} from 'contexts/user_context'

export default function Page(props) {

  const {modalControl: {showContent}} = useContext(ModalContext)
  
  // update user data (token, name) in application according to localStorage 
  const { updateUser } = useContext(UserContext)
  updateUser()

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Website Status</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link 
              onClick={() => showContent({title: 'Login', form: {type: 'login'}})}>Login</Nav.Link>
            <Nav.Link 
              onClick={() => showContent({title: 'Sign Up', form: {type: 'signup'}})}>Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container style={{padding: '2rem'}}>
        {props.children}
      </Container>
    </>
  );
}
