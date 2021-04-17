// import { gql } from "@apollo/client";

// export const ITEM_DATA = gql`
//   fragment ITEM_DATA on Item {
//     id
//     type
//     name
//     price
//     photo
//   }
// `;

// export const GET_ITEMS = gql`
//   ${ITEM_DATA}

//   query getItems {
//     getItems {
//       success
//       resMessage
//       items {
//         ...ITEM_DATA
//       }
//     }
//   }
// `;


// export const GET_ITEM = gql`
//   ${ITEM_DATA}

//   query getItem($id: ID!) {
//     getItem(id: $id) {
//       success
//       resMessage
//       item {
//         ...ITEM_DATA
//       }
//     }
//   }
// `;

// export const ADD_ITEM = gql`
//   ${ITEM_DATA}

//   mutation addItem($name: String!, $type: String!, $price: Float!, $photo: String) {
//     addItem(name: $name, type: $type, price: $price, photo: $photo) {
//       success
//       resMessage
//       item {
//         ...ITEM_DATA
//       }
//     }
//   }
// `;

// export const UPDATE_ITEM = gql`
//   ${ITEM_DATA}

//   mutation updateItem($id: ID!, $name: String!, $type: String!, $price: Float!, $photo: String) {
//     updateItem(id: $id, name: $name, type: $type, price: $price, photo: $photo) {
//       success
//       resMessage
//       item {
//         ...ITEM_DATA
//       }
//     }
//   }
// `;

// export const DELETE_ITEM = gql`
//   mutation deleteItem($id: ID!){
//     deleteItem(id: $id) {
//       success,
//       resMessage,
//     }
//   }
// `;

// export const UPLOAD_FILE = gql`
//   mutation uploadFile($file: Upload!) {
//     uploadFile(file: $file) {
//       success
//       photo
//     }
//   }
// `