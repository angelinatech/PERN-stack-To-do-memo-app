import Modal from '../Modal/Modal'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import Button from '../Button/Button.js';
import './ListHeader.css'

const ListHeader = ({ listName, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [showModal, setShowModal] = useState(false)


/* ~*~*~*~*~*~ Sign out by removing cookies & reloading to reset ~*~*~*~*~*~ */

  const signOut = (e) => {
    e.preventDefault()
    console.log('signout')
    removeCookie('Email')
    removeCookie('AuthToken')
    removeCookie('Username')
    window.location.reload()
  }

/* ~*~*~*~*~*~ Header + conditionally render Modal if showModal is clicked to true, or sign out if signout ~*~*~*~*~*~ */


  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <Button className="create" onClick={() => setShowModal(true)}>ADD NEW</Button>
        <Button className="signout" onClick={signOut}>SIGN OUT</Button>
      </div>

      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />}
    
    </div>
  )
}

export default ListHeader