import { useDispatch, useSelector } from 'react-redux'
import { sendLoginData } from '../redux/slices/Login.slice';

import { Link } from "react-router-dom"
import { useState } from "react"
import FullScreenLoader from './FullScreenLoader';
function Login() {
  const { isLoading } = useSelector((state) => state.loginSlice)
  const [formError, setFormError] = useState('');
  const [credError, setCredError] = useState('');
  const dispatch = useDispatch();
  const [userCred, setUserCred] = useState({ username: "", password: "" })
  const getValues = (event) => {
    setUserCred({
      ...userCred,
      [event.target.name]: event.target.value
    })
    setFormError('')
    setCredError('')
  }
  const login = async (event) => {
    event.preventDefault()
    dispatch(sendLoginData(userCred))
      .then((resStatus) => {
        if (resStatus !== 200) {
          setFormError('something went wrong')
          setCredError('check your credientials')
        }
      })
  }
  return (
    <>
      {
        (isLoading) ?
          (<>
            <FullScreenLoader />
          </>) :
          (<>
            <div className="formwrapper">
              <div className="textStuff">
                <div className="image">
                  <img src="https://res.cloudinary.com/doirhbfcd/image/upload/v1721783895/maintodoicon.png" alt="t4todo" />
                </div>
                <div className="text">
                  <p className="appName">T4Todo</p>
                  <p className="appIntro">A fully-functional todo app</p>
                  <p className="company">Introduced by T342-Security <strong>Prashant Kumar Tuhania</strong></p>
                  <p className="register">
                    <Link to='/user/register'><button className="regbtn">Register</button></Link> and use the NewGen Traditional Todo app</p>
                </div>
              </div>
              <div className="form">
                <form onSubmit={login}>
                  <h2>Login</h2>
                  <input type="text" placeholder="username" name="username" onChange={getValues} />
                  <br />
                  <input type="password" placeholder="password" name="password" onChange={getValues} />
                  <br />
                  <p className="accSuggestion">do not have an account ? <Link to='/user/register'>register</Link></p>
                  <button className="submitbtn login">Login</button>
                  <div className="horizontal"></div>
                  <Link to='/user/register'><button className="goTo register">Register here</button></Link>
                  <p className="err formerr">{formError}</p>
                  <p className="err crederr">{credError}</p>
                </form>
              </div>
            </div>
          </>)
      }

    </>
  )
}

export default Login