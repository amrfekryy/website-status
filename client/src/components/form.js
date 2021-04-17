import React, {useState} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import useMutator from 'helpers/mutator'


export default function FormControl(props) {
  const {modalContent: {title}, modalControl: {hide}, website={}, form} = props

  // // see if item is passed
  // const item = 
  //   props.location && 
  //   props.location.state &&
  //   props.location.state.item
  //   ? props.location.state.item : null
  
  // // determine form action
  // const action = item ? 'Update' : 'Add'
  
  // get item data
  const { id, url: URL=''} = website

  // set initial values
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [url, setURL] = useState(URL)



  // // get mutators
  // const addItem = useMutator('addItem')
  // const updateItem = useMutator('updateItem')
  // const uploadFile = useMutator('uploadFile', setPhoto)

  const fields = {
    username: {type: 'text', placeholder:'Username', onChange: e => setUsername(e.target.value)},
    password: {type: 'password', placeholder:'Password', onChange: e => setPassword(e.target.value)},
    url: {type: 'text', placeholder:'Website URL', onChange: e => setURL(e.target.value), defaultValue: url},
  }
  const forms = {
    user: ['username', 'password'],
    website: ['url']
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 
    alert(JSON.stringify({username, password, url}))
    // if (action === 'Update') 
    //   updateItem({variables: {id, type, name, price: +price, photo}})
    // else addItem({variables: {type, name, price: +price, photo}})

    hide()
  }

  const deletion = title == 'delete'

  return (
    <Form>  
      { 
        deletion 
          ? <div>{`Are you sure you want to delete ${url}?`}</div>
          : forms[form].map(field => <Form.Control {...fields[field]}/>)
      }

      <div style={{
                display: 'flex',
                flexDirection: 'row',          
                justifyContent: 'center',
                padding: '1rem'
              }}>
        <Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>
          {title}
        </Button>
      </div>    
    </Form>
  );
}
