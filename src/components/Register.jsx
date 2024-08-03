import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from '../redux/slices/register.slice'
import FullScreenLoader from "./FullScreenLoader"
function Register() {
  const { isLoading } = useSelector((state) => state.registerSlice)
  const [formError, setFormError] = useState('')
  const [credError, setCredError] = useState('')
  const dispatch = useDispatch();
  const Navigate = useNavigate()
  const [userCred, setUserCred] = useState({ username: "", email: "", password: "" })
  const getValues = (event) => {
    setUserCred({
      ...userCred,
      [event.target.name]: event.target.value.trim()
    })
    setFormError('')
    setCredError('')
  }
  const sendData = async (event) => {
    // event.preventDefault()
    event.preventDefault()
    console.log(userCred)
    if (userCred.email == "" || userCred.password == "" || userCred.username == "") {
      alert('all fields are required')
    } else {
      dispatch(registerUser(userCred))
        .then((resStatus) => {
          if (resStatus.payload == 200) {
            Navigate('/user/login')
          } else {
            setCredError("account may exists")
            setFormError("something went wrong")
          }
        })
    }
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
                <form onSubmit={sendData}>
                  <h2>Register</h2>
                  <input type="text" placeholder="username" name="username" onChange={getValues} />
                  <br />
                  <input type="email" placeholder="email" name="email" onChange={getValues} />
                  <br />
                  <input type="password" placeholder="password" name="password" onChange={getValues} />
                  <br />
                  <p className="accSuggestion">already have an account ? <Link to='/user/login'>login</Link></p>
                  <button className="submitbtn register">Submit</button>
                  <div className="horizontal"></div>
                  <Link to='/user/login'><button className="goTo login">Login here</button></Link>
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

export default Register