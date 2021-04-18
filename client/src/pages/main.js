import React from 'react';
import List from 'components/list'


export default function Main(props) {

  const websites = [
    'success',
    'success',
    'success',
    'danger',
    'success',
    'success',
    'success',
    'success',
  ]

  return <>
    <List header={'Your Websites'} websites={websites} canEdit={true}/>    
    <List header={'All Websites'} websites={websites} />    
  </>
}
    
    
    
