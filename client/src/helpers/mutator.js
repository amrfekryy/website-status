// import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, UPLOAD_FILE } from 'helpers/queries'
// import { useMutation } from '@apollo/client'
// import { useNavigate } from "@reach/router"
// import { client } from 'index'

// export default function useMutator(type, setState) {

//   const MUTATION = {
//     addItem: ADD_ITEM,
//     updateItem: UPDATE_ITEM,
//     deleteItem: DELETE_ITEM,
//     uploadFile: UPLOAD_FILE,
//   }[type]

//   const navigate = useNavigate()
  
//   const [triggerMutation, { data, loading, error }] = useMutation(MUTATION, {
    
//     onCompleted(data) {
//       const response = data[type]
//       const successfulMutation = response && response.success
//       if (successfulMutation) {
//         if (type === 'uploadFile') {
//           // alert(JSON.stringify(data))
//           // alert(`file uploaded successfully: ${response.photo}`)
//           setState(response.photo)
//         } else {
//           client.resetStore()
//           navigate('/')  
//         }
//       }
//       else alert(JSON.stringify(data));
//     }
//   });
//   // if (loading) // do something
//   // if (error) // do something
//   return triggerMutation
// }