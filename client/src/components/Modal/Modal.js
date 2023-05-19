import { useState } from 'react'
import { useCookies } from 'react-cookie'
import DropDown from '../DropDown/DropDown.js'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './Modal.css'

const Modal = ({ mode, setShowModal, getData, task }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [selectedOption, setSelectedOption] = useState('');
  const editMode = mode === 'edit' ? true : false

/* ~*~*~*~*~*~ If in edit mode data from user inputs, if not data object values set to this ~*~*~*~*~*~ */

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 0,
    category: editMode ? task.category : selectedOption,
    date: editMode ? task.date : new Date()
  })

/* ~*~*~*~*~*~ POST req eg new + error handling. If good hide modal run getData to update ~*~*~*~*~*~ */

  const postData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        console.log('WORKED')
        setShowModal(false)
        getData()
      }
      else {
        if (response.status === 404) {
          console.error("Sorry, we couldn't find that item");
        } else if (response.status === 401) {
          console.error("Unauthorised access");
        } else {
          console.error("Sorry, an error has occurred, please try again.");
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

/* ~*~*~*~*~*~ PUT req eg edit, + error handling, if good hide modal, run getData to update ~*~*~*~*~*~ */

  const editData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        setShowModal(false)
        getData()
      }
      else {
        if (response.status === 404) {
          console.error("Sorry, we couldn't find that item");
        } else if (response.status === 401) {
          console.error("Unauthorised access");
        } else {
          console.error("Sorry, an error has occurred, please try again.");
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  /* ~*~*~*~*~*~ whatever event object, update data with input, if dropdown selects none, put nothing, otherwise value ~*~*~*~*~*~ */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData(prevData => ({
      ...prevData,
      [name]: value === "none" ? "" : value
    }));
  };



  /* ~*~*~*~*~*~ Render modal, either edit or post data inputed based on editMode ~*~*~*~*~*~ */

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>{mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeholder=" Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="inputTask"
          />
          <br />
          <DropDown
            options={['none', 'Buy a Gift', 'Chores', 'Coding Fun', 'Coffee Shop Work', 'Date', 'Delivery', 'Drink Water',
            'Education', 'Go for a Coffee', 'Go for a Drink', 'Groceries', 'Home Visit', 'Jog', 'Laundry',
            'Make a Call', 'Medicine or Doctors', 'Reading', 'Reminder', 'Seaside Walk', 'Shopping',
            'Trip', 'Woodland Walk', 'Work', 'Writing']}
            defaultOption=""
            onSelect={(option) => handleChange({ target: { name: 'category', value: option } })}
            value={data.category}
          />
          <br />
          <Slider
            min={0}
            max={100}
            name="progress"
            value={data.progress}
            onChange={(value) => handleChange({ target: { name: 'progress', value: value } })}
            railStyle={{ backgroundColor: '#ffc9c7', height: '8px', borderRadius: '4px' }}
            trackStyle={{ backgroundImage: 'linear-gradient(145deg, #8c94b8, #767c9b)', height: '8px', borderRadius: '4px' }}
            handleStyle={{ backgroundColor: '#767c9b', border: 'none', borderRadius: '50%', height: '20px' }}
          />

          <input className={mode} id="submit" type="submit" onClick={editMode ? editData : postData} />
        </form>

      </div>
    </div>
  )
}

export default Modal




