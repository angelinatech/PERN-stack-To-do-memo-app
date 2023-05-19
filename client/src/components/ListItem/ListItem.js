import { useState } from 'react'
import HeartIcon from "../TickIcon/HeartIcon.js"
import ProgressBar from "../ProgressBar/ProgressBar.js"
import Modal from "../Modal/Modal.js"
import ImageColour from "../ImageColor/ImageColor.js"
import Button from '../Button/Button.js';
import './ListItem.css'

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false)

/* ~*~*~*~*~*~ DELETE req, plus handle errors ~*~*~*~*~*~ */

const deleteItem = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      getData();
    } else {
      if (response.status === 404) {
        console.error("Sorry, we couldn't find that item");
      } else if (response.status === 401) {
        console.error("Unauthorised access");
      } else {
        console.error("Sorry, an error has occurred, please try again.");
      }
    }
  } catch (err) {
    console.error(err);
  }
};

/* ~*~*~*~*~*~ Render item, pass category to background bit, if showModal clicked to true, render modal, if delete delete function ~*~*~*~*~*~ */

  return (
    <li className="list-item">

    <ImageColour backgroundImage={`${task.category}`} listIndex={task.id} stateColor={'#FFFFFF'} />


      <div className="info-container">
        <div className="rip"></div>
      
        <p className="task-title">  <HeartIcon /> {task.title}</p>
        <div className="progress-bar"><ProgressBar progress={task.progress} /></div>
        <p className="category-title">{task.category}</p>
      </div>

      <div className="button-container">
        <Button className="edit" onClick={() => setShowModal(true)}>EDIT</Button>
        <Button className="delete" onClick={deleteItem}>DELETE</Button>
      </div>

      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}

    </li>
  )
}

export default ListItem