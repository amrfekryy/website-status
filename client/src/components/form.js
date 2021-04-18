import React, {useState, useContext} from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {ModalContext} from 'contexts/modal_context'
import {UserContext} from 'contexts/user_context'
import {AppContext} from 'contexts/app_context'
import {map, get, pick, omit} from 'lodash'
import axios from 'axios'

export default function FormControl(props) {
  const { form: {type: formType, website={}} } = props
  const { id:websiteId, url: URL=''} = website
  
  const { modalContent: {title}, modalControl: {hide: hideForm} } = useContext(ModalContext)
  const { token, loginUser, updateUserWebsites, websites:userWebsites } = useContext(UserContext)
  const { websites, setWebsites } = useContext(AppContext)
  
  // set initial values
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [url, setURL] = useState(URL)

  const fields = {
    username: {type: 'text', placeholder:'Username', onChange: e => setUsername(e.target.value)},
    password: {type: 'password', placeholder:'Password', onChange: e => setPassword(e.target.value)},
    url: {type: 'text', placeholder:'Website URL', onChange: e => setURL(e.target.value), defaultValue: url},
  }

  const formSettings = get({
    signup: {
      fields: ['username', 'password'],
      submit: () => axios.post('http://localhost:5000/signup', {name:username, password})
        .then(({data: {message}}) => message)
    },
    login: {
      fields: ['username', 'password'],
      submit: () => axios.post('http://localhost:5000/login', {name:username, password})
        .then( ({data: {token, user: {name, websites}, message}}) => {
          // alert(JSON.stringify({token, name, websites}))
          loginUser({token, name, websites})
          return message
        })
    },
    addWebsite: {
      fields: ['url'],
      submit: () => {
        return axios.post(
          'http://localhost:5000/website', {url}, {headers: {token}})
          .then(({data: {website, message}}) => {
            setWebsites({...websites, [website.id]: website})
            updateUserWebsites([...userWebsites, website.id])
            return message
          })
      }
    },
    editWebsite: {
      fields: ['url'],
      submit: () => axios.put(
        `http://localhost:5000/website/${websiteId}`, {url}, {headers: {token}})
        .then(({data: {website, message}}) => {
          setWebsites({...websites, [website.id]: website})
          return message
        })
    },
    deleteWebsite: {
      warning: `Are you sure you want to delete ${url}?`,
      submit: () => axios.delete(
        `http://localhost:5000/website/${websiteId}`, {headers: {token}})
        .then(({data: {message}}) => {
          setWebsites(omit(websites, [websiteId]))
          return message
        })

    }
  }, formType, {})

  const handleSubmit = (e) => {
    e.preventDefault()
    formSettings.submit()
    .then((message) => alert(message))
    .catch((error) => alert(JSON.stringify({error})))
    hideForm()
  }

  return (
    <Form>  
      { formSettings.warning 
          ? <div>{formSettings.warning}</div>
          : map(pick(fields, formSettings.fields), field => 
              <Form.Control style={{marginTop: '1rem'}} {...field}/>)
      }

      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '1rem'}}>
        <Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>
          {title}
        </Button>
      </div>    
    </Form>
  );
}
