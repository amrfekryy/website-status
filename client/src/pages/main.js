import React, {useContext} from 'react';
import List from 'components/list'
import {AppContext} from 'contexts/app_context'
import {UserContext} from 'contexts/user_context'
import {pick, omit} from 'lodash'

export default function Main(props) {

  const {websites} = useContext(AppContext)
  const {websites:userWebsites=[], isLoggedIn} = useContext(UserContext)

  return <>
    {isLoggedIn && <List 
      header={'Your Websites'} 
      websites={pick(websites, userWebsites)}
      canEdit={true}
    />}    
    <List header={'All Websites'} websites={omit(websites, userWebsites)} />    
  </>
}
    
    
    
