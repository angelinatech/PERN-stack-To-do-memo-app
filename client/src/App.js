import ListHeader from './components/ListHeader/ListHeader.js'
import ListItem from './components/ListItem/ListItem.js'
import Auth from './components/Auth/Auth.js'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const username = cookies.Username
  const [ tasks, setTasks] = useState([])



/* ~*~*~*~*~*~ GET req to fetch task data using email param & token ~*~*~*~*~*~ */

  const getData = async () => {
    try {
      const token = authToken;
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };
  

/* ~*~*~*~*~*~ Only run if authToken present ~*~*~*~*~*~ */

useEffect(() => {
  if (authToken) {
    getData()
  }}
, [])

  console.log(tasks)


/* ~*~*~*~*~*~ If array of tasks, use sort method to arrange by date ~*~*~*~*~*~ */

const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

/* ~*~*~*~*~*~ Just need bc body:before bg needs diff prop for diff screens (dynamic gen list) ~*~*~*~*~*~ */

if (!authToken) {
  document.body.classList.add('app-login');
  document.body.classList.remove('app-main');
} else {
  document.body.classList.remove('app-login');
  document.body.classList.add('app-main');
}

/* ~*~*~*~*~*~ Conditional rendering, if no authToken - Auth, if token - access app ~*~*~*~*~*~ */

  return (
    <div className="app">
        {!authToken && <Auth/>}
        
        {authToken &&
          <>
          <ListHeader listName={'Memory Bank'} getData={getData} />
          <p className="user-email">Welcome back {username}</p>
          <div className="list-grid">
          {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
          </div>
          </>}
          
      <p className="copyright">© Angelina Tech</p>
    </div>
  )
}

export default App