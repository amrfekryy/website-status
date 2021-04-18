import React, {useState, useContext} from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {ModalContext} from 'contexts/modal_context'
import {map, get, pick} from 'lodash'


export default function FormControl(props) {
  const { form: {type: formType, website={}} } = props
  const { id, url: URL=''} = website
  
  const { modalContent: {title}, modalControl: {hide} } = useContext(ModalContext)
  
  // set initial values
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [url, setURL] = useState(URL)

  const fields = {
    username: {type: 'text', placeholder:'Username', onChange: e => setUsername(e.target.value)},
    password: {type: 'password', placeholder:'Password', onChange: e => setPassword(e.target.value)},
    url: {type: 'text', placeholder:'Website URL', onChange: e => setURL(e.target.value), defaultValue: url},
  }
  const forms = {
    login: {
      fields: ['username', 'password'],

    },
    signup: {
      fields: ['username', 'password'],

    },
    addWebsite: {
      fields: ['url'],

    },
    editWebsite: {
      fields: ['url'],

    },
    deleteWebsite: {

    }
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

  return (
    <Form>  
      { formType == 'deleteWebsite' ? <div>{`Are you sure you want to delete ${url}?`}</div>
          : map(pick(fields, get(forms, `${formType}.fields`, [])), field => 
            <Form.Control style={{marginTop: '1rem'}} {...field}/>)
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
