import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import {ModalContext} from 'contexts/modal_context'
import {map, isEmpty} from 'lodash'

export default function List(props) {
  const {header, websites={}, canEdit} = props
  const {modalControl: {showContent}} = useContext(ModalContext)

  const renderButton = (action, website) => {
    return canEdit ? <Button variant="link" 
      onClick={()=>showContent({
        title: action, form: {type: `${action}Website`, website}
        })}>{action}</Button> 
      : <></>
  }
 
  return <>
    <div style={{ display: 'flex', flexDirection: 'row'}}>
      <h5>{header}</h5>{renderButton('add')}
    </div>    
    
    <Row>
      { !isEmpty(websites)
        ? map(websites, (website, idx) => 
          <Col key={idx} xs={12} md={6} style={{paddingTop: '0.1rem'}}>
              
              <Alert variant={website.status || 'success'} 
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
              >
               
                <div>
                  <Alert.Link href={website.url}>{website.url}</Alert.Link> works
                </div>
                <div>
                  {renderButton('edit', website)}{renderButton('delete', website)}
                </div>
              
              </Alert>
          
          </Col>)
        : <p>No websites!</p>
      }      
    </Row>
  </>
}