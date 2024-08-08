import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { editUser } from "../redux/slices/edituser.slice"
import { fetchUser } from "../redux/slices/fetchuser.slice";
import { useState, useContext } from "react";
import { globarVars } from "./ContextVars";
function Useredit() {
  const { userDetail, setUserDetail } = useContext(globarVars)
  const navigate = useNavigate();
  const [inputPass, setInputPass] = useState(false)
  const dispatch = useDispatch();
  const [err, setErr] = useState('')
  const [changes, setChanges] = useState({ username: userDetail.username, email: userDetail.email, firstname: userDetail.firstname, lastname: userDetail.lastname, password: '' })
  const getValues = (e) => {
    setChanges({
      ...changes,
      [e.target.name]: e.target.value
    })
    setErr('')
  }

  const saveChanges = (e) => {
    e.preventDefault()
    setInputPass(true)
  }
  const confirmChanges = (e) => {
    e.preventDefault()
    try {
      if (changes.email == "" | changes.username == "" || changes.firstname == "" || changes.lastname == "" || changes.password == "") {
        setErr(`details can't be empty`)
      } else {
        dispatch(editUser(changes))
          .then(res => {
            if (res.payload == 201) {
              navigate('/dashboard/profile')
              dispatch(fetchUser())
                .then(resp => setUserDetail(resp.payload.userData))
            } else if (res.payload == 409) {
              setErr('credentials may exists alreay, retry please')
            }
            else if (res.payload == 401) {
              setErr('something went wrong, please reenter password or try after some time')
            }
          })
      }
    } catch (error) {
      console.err("something went wrong", error)
    }
  }
  return (
    <div className="usereditform">
      <form> <p className="heading">Edit your user details here</p>
        <input type="text" placeholder="username" name="username" onChange={getValues} value={changes.username} />
        <input type="email" placeholder="email" name="email" onChange={getValues} value={changes.email} />
        <input type="text" placeholder="firstname" name="firstname" onChange={getValues} value={changes.firstname} />
        <input type="text" placeholder="lastname" name="lastname" onChange={getValues} value={changes.lastname} />
        {
          (inputPass) ?
            (<>
              <p className="lablePass">please enter your password to verify</p>
              <input type="password" placeholder="password" name="password" onChange={getValues} />
            </>) :
            (<></>)
        }

        <div className="buttons">
          {
            (inputPass) ?
              (<>
                <button className="confirmPass" onClick={confirmChanges}>Confirm</button>
              </>) :
              (<>
                <button className="savebtn" onClick={saveChanges}>save</button>
              </>)
          }
          <button className="closebtn"><Link to="/dashboard/profile">close</Link></button>
        </div>
        <div className="errs">
          <p className="err">{err}</p>
        </div>
      </form>
    </div>
  )
}

export default Useredit