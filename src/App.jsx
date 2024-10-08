import { useDispatch, useSelector } from 'react-redux'
import { globarVars } from './components/ContextVars';
import { fetchDashboard } from './redux/slices/auth.slice'
import { fetchUser } from './redux/slices/fetchuser.slice';
import FullScreenLoader from './components/FullScreenLoader';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
function App() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.authSlice)
  const [editTodoDetails, setEditTodoDetails] = useState({})
  const [userDetail, setUserDetail] = useState({})
  const [todoEditing, setTodoEditing] = useState(false)
  const [customPrompt, setCustomPrompt] = useState(false)
  const [settingNavClass, setSettingNavClass] = useState(false)
  const [todoFormActive, setTodoFormActive] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDashboard())
  }, [dispatch])
  useEffect(() => {
    if (userDetail) {
      dispatch(fetchUser())
        .then(resp => {
          setUserDetail(resp.payload.userData)
        })
    }

  }, [dispatch])
  return (
    <>
      <globarVars.Provider value={{ todoFormActive, setTodoFormActive, todoEditing, setTodoEditing, editTodoDetails, setEditTodoDetails, settingNavClass, setSettingNavClass, customPrompt, setCustomPrompt, userDetail, setUserDetail }}>
        <main>
          {
            (isLoading) ?
              (<>
                <FullScreenLoader />
              </>) :
              (<>
                <Routes>
                  <Route path='/user/login' element={(isAuthenticated) ? <Navigate to='/dashboard' /> : <Login />} />
                  <Route path='/user/register' element={(isAuthenticated) ? <Navigate to='/dashboard' /> : <Register />} />
                  <Route path='/dashboard' element={(isAuthenticated) ? <Dashboard /> : <Navigate to='/user/login' />} />
                  <Route path='/dashboard/profile' element={(isAuthenticated) ? <Profile /> : <Navigate to='/user/login' />} />
                  <Route path='/edit/profile' element={(isAuthenticated) ? <EditProfile /> : <Navigate to='/user/login' />} />
                  <Route path='*' element={(isAuthenticated) ? <Navigate to='/dashboard' /> : <Navigate to='/user/login' />} />
                </Routes>
              </>)
          }
        </main>
      </globarVars.Provider>
    </>
  )
}

export default App