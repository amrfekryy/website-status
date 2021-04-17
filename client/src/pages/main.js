import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from '@reach/router';
import Alert from 'react-bootstrap/Alert'
import List from 'components/list'
// import { GET_ITEMS } from 'helpers/queries'
// import { useQuery } from '@apollo/client'


export default function Main(props) {

  // const { data, loading, error } = useQuery(GET_ITEMS)
  // if (loading) return <div>Loading</div>
  // if (error) return <div>Error</div> 
  // const items = data && data.getItems.success ? data.getItems.items : []
  // // alert(JSON.stringify(data))
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
    {/* <div style={{
      display: 'flex',
      flexDirection: 'row',          
      justifyContent: 'space-between',
      margin: '3rem 0 2rem 0'
    }}>
      <h4>Menu</h4>
      <Button as={Link} to='/form' variant="primary">
          Add Menu Item
      </Button>
    </div> */}

    <List header={'Your Websites'} websites={websites} canEdit={true}/>    
    <List header={'All Websites'} websites={websites} />    
  </>
}
    
    
    
