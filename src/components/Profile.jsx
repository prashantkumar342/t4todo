import { fetchLogout } from "../redux/slices/logout.slice";
import { fetchUser } from "../redux/slices/fetchuser.slice";
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { globarVars } from "./ContextVars"
import CustomPrompt from "./CustomPrompt"
import { useDispatch } from "react-redux";
function Profile() {
  const dispatch = useDispatch();
  const { customPrompt, setCustomPrompt, userDetail } = useContext(globarVars)
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])
  const logout = () => {
    setCustomPrompt(true)
  }
  const closeLogoutPrmpt = () => {
    setCustomPrompt(false)
  }
  const yesLogout = () => {
    dispatch(fetchLogout())
  }
  return (<>
    {
      (customPrompt) ?
        <CustomPrompt
          message="Are you sure want to logout ?"
          lbtn="yes logout"
          rbtn="cancle"
          lbg="red"
          lc="white"
          rbg="green"
          rc="white"
          rfunc={closeLogoutPrmpt}
          lfunc={yesLogout}
        /> :
        (<>
          <div className="profilewrapper">
            <div className="userdetails">
              <div className="avtaar">
                <img src="https://imgs.search.brave.com/CXjoyx8PWND-fW405kO_Di1j8vyUco_Jy8IUFQSj9_g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY2F0/LWFuZC1jdXRlLWJv/eS1jYXJ0b29uLTE4/YmN6bHdvYXIwbHNj/Z3QuanBn" alt="" />
              </div>
              <div className="user">
                <p className="username">{userDetail.username}</p>
                <p className="name">{(userDetail.firstname == undefined) ? '' : userDetail.firstname} {(userDetail.lastname == undefined) ? '' : userDetail.lastname}</p>
              </div>
              <div className="buttons">
                <button className="editbtn"><Link to="/edit/profile" >edit profile</Link></button>
                <button className="logoutbtn" onClick={logout}>Logout</button>
              </div>
            </div>
          </div>
        </>)
    }

  </>)
}

export default Profile