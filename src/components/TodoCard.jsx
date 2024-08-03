/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { fetchTodo } from "../redux/slices/todo.slice"
import { useEffect, useState, useContext } from "react"
import { globarVars } from "./ContextVars"
// import ContentLoader from "./ContentLoader"
function TodoCard() {
  const { setTodoFormActive, setTodoEditing, setEditTodoDetails } = useContext(globarVars)
  const { data, resStatus } = useSelector((state) => state.fetchTodoSlice)
  const [todos, setTodos] = useState([])
  const [activeCardClass, setActiveCardClass] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    if (!data) {
      dispatch(fetchTodo())
    } else {
      if (resStatus === 200) {
        setTodos(data)
      }
    }
  }, [dispatch, data, resStatus])

  const deleteTodo = (todoId) => {
    fetch(import.meta.env.VITE_DELETE_TODO, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todoId: todoId }),
      credentials: "include"
    })
    dispatch(fetchTodo())
    const newTodo = todos.filter(todo => {
      todo._id !== todoId
    })
    setTodos(newTodo)
  }

  const editTodo = (todoId, title, description) => {
    setTodoEditing(true)
    setTodoFormActive(true)
    setEditTodoDetails({
      todoId: todoId,
      todoTitle: title,
      todoDescription: description
    });
  }

  const viewTodo = (id) => {
    setActiveCardClass(id)
  }
  const closeTodo = () => {
    setActiveCardClass('')
  }
  return (
    <>
      {
        todos.map((item) => (
          <div className={`card ${(activeCardClass === item._id) ? 'active' : ''}`} key={item._id}>
            <div className="title">
              <p className="title-text">{item.title}</p>
            </div>
            <div className="descripition">
              <p className="description-text">{item.description}</p>
            </div>
            <div className="buttons">
              <button className="editbtn" onClick={() => editTodo(item._id, item.title, item.description)}><i className="fa-solid fa-pen-to-square"></i></button>
              <button className="viewbtn" onClick={() => viewTodo(item._id)}><i className="fa-solid fa-chevron-down"></i></button>
              <button className="closebtn" onClick={() => closeTodo(item._id)}><i className="fa-solid fa-chevron-down"></i></button>
              <button className="deletebtn" onClick={() => deleteTodo(item._id)}><i className="fa-solid fa-trash"></i></button>
            </div>
          </div>
        ))
      }

    </>

  )
}

export default TodoCard