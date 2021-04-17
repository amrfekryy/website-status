import React, {useState, useEffect} from 'react';

export const ModalContext = React.createContext({});

export default (props) => {
  
  const [modalStatus, setModalStatus] = useState(false)
  const [modalContent, setModalContent] = useState({})
  const modalControl = {
    hide: () => setModalStatus(false),
    show: () => setModalStatus(true),
    setContent: (content) => setModalContent(content),
    showContent: (content) => {setModalStatus(true); setModalContent(content)}
  }

  return (
    <ModalContext.Provider value={{modalStatus, modalContent, modalControl}}>
      {props.children}
    </ModalContext.Provider>
  )
}
