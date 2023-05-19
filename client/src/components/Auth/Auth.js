import { useState } from 'react'
import { useCookies} from 'react-cookie'
import Button from '../Button/Button.js'
import './Auth.css'

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [isLogIn, setIsLogin] = useState(true)
  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)


/* ~*~*~*~*~*~ Clear errors and pass status to set the isLogin ~*~*~*~*~*~ */

  const viewLogin = (status) => {
    setError(null)
    setIsLogin(status)
  }
  
/* ~*~*~*~*~*~ Endpoint either signup or login, will make these endpoints in server ~*~*~*~*~*~ */

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()
    
/* ~*~*~*~*~*~ Error if password & confirm password don't match on the signup pg (not login) ~*~*~*~*~*~ */

    if (!isLogIn && password !== confirmPassword) {
    setError('Make sure passwords match!')
    return
  }
/* ~*~*~*~*~*~ POST req using endpoint var, send the signup data get response object from server ~*~*~*~*~*~ */

  const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({username, email, password}),
  })
  console.log("response is" + response)

  const data = await response.json()
  console.log("data is" + data)

/* ~*~*~*~*~*~ If detail in response, display the error, otherwise set cookies & reload to update ~*~*~*~*~*~ */

  if (data.detail) {
    setError(data.detail)
    console.log(data.detail)
  } else {
    console.log(data.username)
    setCookie('Username', data.username)
    setCookie('Email', data.email)
    setCookie('AuthToken', data.token)

    window.location.reload()
  }
}

/* ~*~*~*~*~*~ Login true show login bits, click between isLogin true/false to otherwise show signup bits, set details from inputs, submit based on isLogin~*~*~*~*~*~ */

return (
  <div className="auth-container">
    <div className="auth-container-box">
      <form>
            <h2>{isLogIn  ? 'Please log in' : 'Please sign up!'}</h2>
            {!isLogIn &&<input
            type="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />}
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogIn && <input
            type="password"
            placeholder="confirm password"
            onChange={(e) =>setConfirmPassword(e.target.value)}
          />}

          <input type="submit" className="Submit" onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} />
          {error && <p>{error}</p>}
        </form>


        <div className="auth-options">
          <Button
            onClick={() => viewLogin(false)}
            style={{backgroundColor : !isLogIn ? 'rgb(230, 159, 148)' : 'rgb(118, 124, 155)'}}
          >Sign Up</Button>
          <Button
            onClick={() => viewLogin(true)}
            style={{backgroundColor : isLogIn ? 'rgb(230, 159, 148)' : 'rgb(118, 124, 155)'}}
          >Login</Button>
        </div>

      </div>
    </div>
  )
}

export default Auth