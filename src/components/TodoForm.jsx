import { useState, useContext } from "react"
import { useDispatch } from "react-redux"
import { saveTodo } from "../redux/slices/sendTodo.slice";
import { globarVars } from "./ContextVars";
import { fetchTodo } from "../redux/slices/todo.slice";

function TodoForm() {
  const [formErr, setFormErr] = useState('')
  const [err, setErr] = useState("")
  const { todoFormActive, setTodoFormActive, todoEditing, editTodoDetails } = useContext(globarVars)
  const [todoFormData, setTodoFormData] = useState({ title: "", description: "" })
  const [editTodoData, setEditTodoData] = useState({ title: editTodoDetails.todoTitle, description: editTodoDetails.todoDescription })
  const dispatch = useDispatch();
  const getTodoValues = (event) => {
    setTodoFormData({
      ...todoFormData,
      [event.target.name]: event.target.value
    })
    setFormErr("")
    setErr("")
  }
  const getNewData = (event) => {
    setEditTodoData({
      ...editTodoData,
      [event.target.name]: event.target.value
    })
    setFormErr("")
    setErr("")
  }
  const submitTodo = (e) => {
    e.preventDefault()
    if (todoFormData.title == "" || todoFormData == "") {
      setFormErr("Fill all the field to save todo")
    } else {
      dispatch(saveTodo(todoFormData))
        .then(resp => {
          if (resp.payload == 200) {
            setTodoFormActive(false)
            dispatch(fetchTodo())
          } else {
            setErr("Something went wrong, todo may already exists or any field is empty")
          }
        })
    }
  }
  const submitNewTodo = (e) => {
    e.preventDefault()
    if (editTodoData.title == "" || editTodoData == "") {
      setFormErr("Fill all the field to save todo")
    }
    else {
      const modifiedTodo = {
        ...editTodoData,
        todoId: editTodoDetails.todoId,
      }
      dispatch(saveTodo(modifiedTodo))
        .then(resp => {
          if (resp.payload == 200) {
            setTodoFormActive(false)
            dispatch(fetchTodo())
          } else {
            setErr("Something went wrong, todo may already exists or any field is empty")
          }
        })
    }

  }
  const todoFormDeactivate = () => {
    setTodoFormActive(false)
  }
  return (<>
    {
      (todoEditing) ?
        (<>
          {
            (todoFormActive) ?
              (<>
                <div className="todoformcontainer">
                  <form id="todoForm" onSubmit={submitNewTodo}>
                    <input type="text" placeholder="Todo Title" name="title" onChange={getNewData} value={editTodoData.title} />
                    <textarea name="description" id="tododescription" onChange={getNewData} value={editTodoData.description} placeholder="write the todo description here"></textarea>
                    <div className="buttons">
                      <input className="createbtn" type="submit" value="Save" />
                      <input type="button" value="cancle" onClick={todoFormDeactivate} className="canclebtn" />
                    </div>
                    <div className="errwrapper">
                      <p className="err">{err}</p>
                      <p className="formErr">{formErr}</p>
                    </div>
                  </form>
                </div>
              </>) :
              (<>

              </>)
          }
        </>) : (<>
          {
            (todoFormActive) ?
              (<>
                <div className="todoformcontainer">
                  <form id="todoForm" onSubmit={submitTodo}>
                    <input type="text" placeholder="Todo Title" name="title" onChange={getTodoValues} />
                    <textarea name="description" id="tododescription" onChange={getTodoValues} placeholder="write the todo description here"></textarea>
                    <div className="buttons">
                      <input className="createbtn" type="submit" value="create" />
                      <input type="button" value="cancle" onClick={todoFormDeactivate} className="canclebtn" />
                    </div>
                    <div className="errwrapper">
                      <p className="err">{err}</p>
                      <p className="formErr">{formErr}</p>
                    </div>

                  </form>
                </div>
              </>) :
              (<>

              </>)
          }
        </>)
    }

  </>)
}

export default TodoForm


