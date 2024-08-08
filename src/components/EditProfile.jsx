import { Link } from "react-router-dom"
import Useredit from "./Useredit"
import { globarVars } from "./ContextVars"
import { useContext } from "react"
import { useSelector } from "react-redux"
import FullScreenLoader from "./FullScreenLoader"
function EditProfile() {
  const { settingNavClass, setSettingNavClass } = useContext(globarVars)
  const userEditLoading = useSelector((state) => state.editUserSlice.isLoading)
  const settingNav = () => {
    setSettingNavClass(!settingNavClass)
  }
  console.log(userEditLoading)
  return (<>
    {
      (userEditLoading) ?
        (<><FullScreenLoader /></>) :
        (<>
          <div className="editdetailswrapper">
            <div className="toppanel">
              <p className="logo">T4Todo <i className="fa-solid fa-clipboard"></i></p>
              <p className="more" onClick={settingNav}><i className="fa-solid fa-ellipsis-vertical"></i></p>
            </div>
            <div className="main">
              <div className={`navmenu ${(settingNavClass) ? 'active' : ''}`}>
                <div className="links">
                  <button><Link to='user/details'>user</Link></button>
                </div>
              </div >
              <div className="settings">
                <Useredit />
              </div>
            </div>
          </div >
        </>)
    }
  </>)
}

export default EditProfile