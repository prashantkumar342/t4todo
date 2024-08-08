
import { useSelector } from "react-redux";
import FullScreenLoader from "./FullScreenLoader";
import TodoCard from "./TodoCard";
import { useContext, useState } from 'react';
import TodoForm from "./TodoForm";
import { globarVars } from "./ContextVars";
import { Link } from "react-router-dom";
function Dashboard() {
  const { todoFormActive, setTodoFormActive, setTodoEditing, userDetail } = useContext(globarVars)
  const { isLoading } = useSelector((state) => state.logoutSlice)
  const [navMenuClass, setNavMenuClass] = useState(false)

  const createTodo = () => {
    setTodoFormActive(true)
    setTodoEditing(false)
  }

  const activeNavMenu = () => {
    setNavMenuClass(!navMenuClass)
  }
  const closeMenu = () => {
    setNavMenuClass(false)
  }


  return (
    <>

      {
        (isLoading) ?
          (<>
            <FullScreenLoader />
          </>) :
          (<>
            <div className="dashboardContainer">
              {
                (todoFormActive) ?
                  (<>
                    <TodoForm />
                  </>) : (<></>)
              }
              <div className={`NavMenu ${navMenuClass === false ? '' : 'active'}`}>
                <div className="navClose"><button onClick={closeMenu}><p><i className="fa-solid fa-square-xmark"></i></p></button></div>
                <div className="links">
                  <button onClick={createTodo}>create new <i className="fa-solid fa-list-check"></i></button>
                </div>
              </div>
              <div className="content">
                <div className="topPanel">
                  <button className="menubtn" onClick={activeNavMenu}><p><i className="fa-solid fa-bars"></i></p></button>
                  <h2>T4Todo <i className="fa-solid fa-clipboard"></i></h2>
                  <div className="profileIcon">
                    <Link to='/dashboard/profile'><p className="username"><i className="fa-solid fa-user"></i> {userDetail.username}</p></Link>
                  </div>
                </div>
                <div className="cards">
                  <TodoCard />
                </div>
              </div>
            </div>
          </>)
      }

    </>
  )
}

export default Dashboard

