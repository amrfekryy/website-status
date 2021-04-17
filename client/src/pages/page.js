import React, { Fragment } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
export default function Page(props) {
  const {modalControl: {showContent}} = props
    
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Website Status</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => showContent({title: 'Login', body: {form: 'user'}})}>Login</Nav.Link>
            <Nav.Link onClick={() => showContent({title: 'Sign Up', body: {form: 'user'}})}>Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container style={{padding: '2rem'}}>
        {props.children}
      </Container>
    </>
  );
}
