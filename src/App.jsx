import { useDispatch, useSelector } from 'react-redux'
import { globarVars } from './components/ContextVars';
import { fetchDashboard } from './redux/slices/auth.slice'
import FullScreenLoader from './components/FullScreenLoader';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
function App() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.authSlice)
  const [editTodoDetails, setEditTodoDetails] = useState({})
  const [todoEditing, setTodoEditing] = useState(false)
  const [todoFormActive, setTodoFormActive] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDashboard())
  }, [dispatch])

  return (
    <>
      <globarVars.Provider value={{ todoFormActive, setTodoFormActive, todoEditing, setTodoEditing, editTodoDetails, setEditTodoDetails }}>
        <main>
          {
            (isLoading) ?
              (<>
                <FullScreenLoader />
              </>) :
              (<>
                <Routes>
                  <Route path='/user/login' element={(isAuthenticated) ? <Navigate to='/dashboard' /> : <Login />} />
                  <Route path='/dashboard' element={(isAuthenticated) ? <Dashboard /> : <Navigate to='/user/login' />} />
                  <Route path='/user/register' element={(isAuthenticated) ? <Navigate to='/dashboard' /> : <Register />} />
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