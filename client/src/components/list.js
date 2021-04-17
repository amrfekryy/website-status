import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from '@reach/router';
import Alert from 'react-bootstrap/Alert'
import {ModalContext} from 'contexts/modal_context'

export default function List(props) {
  const {header, websites=[], canEdit} = props
  const {modalControl: {showContent}} = useContext(ModalContext)

  const renderButton = (name, content={}) => {
    return canEdit ? <Button variant="link" 
      onClick={()=>showContent({title: name, body: {form: 'website'}})}>{name}</Button> 
      : <></>
  }
  return <>
    <div style={{ display: 'flex', flexDirection: 'row'}}>
      <h5>{header}</h5>{renderButton('add')}
    </div>    
    <Row>
      {websites.length > 0 
        ? websites.map((variant, idx) => 
          <Col key={idx} xs={12} md={6} style={{paddingTop: '0.1rem'}}>
              <Alert variant={variant} style={{
                display: 'flex',
                flexDirection: 'row',          
                justifyContent: 'space-between',
                // margin: '3rem 0 2rem 0'
              }}>
                <div>
                  <Alert.Link href="#">website name</Alert.Link> works
                </div>
                <div>
                  {renderButton('edit')}
                  {renderButton('delete')}
                </div>
              </Alert>
          </Col>)
        : <p>No websites!</p>
      }      
    </Row>
  </>
}