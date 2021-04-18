import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {isEmpty} from 'lodash'

export const AppContext = React.createContext({});

export default (props) => {

  const [websites, setWebsites] = useState({})
  if (isEmpty(websites)) {
    axios.get('http://localhost:5000/websites').then(({data: {websites}}) => {
      alert(JSON.stringify(websites))
      setWebsites(websites)
    })
  }
  
  return (
    <AppContext.Provider value={{websites, setWebsites}}>
      {props.children}
    </AppContext.Provider>
  )
}
