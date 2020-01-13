import React, {useEffect, useState} from 'react';
import firebase from './firebase/index'



const App = () => {
  const [todos, setTodos] = useState([])
  const initstate = { title: '', description: ''}
  const [inputs, setInputs] = useState(initstate)

    useEffect( () => {
        getTodos()
   
        
    }, [])
    const getTodos = () => {
      firebase.db.collection('todo').get()
        .then(querySnapshot => {
        querySnapshot.forEach( doc => {
          
          setTodos(prev => ([...prev, doc.data()]))
        })
      })
      .catch(err => {
        console.log(err.message)
      })
    }
    
    
    const sendTodo = async (e) => {
      e.preventDefault()
      await firebase.db.collection('todo').add(inputs)
      .then( async documentReference => {
        console.log('document reference ID', documentReference.id)
        await setTodos([])
        getTodos()
      })
      .catch(error => {
        console.log(error.message)
      })
     
  }

  const handleChange = e => {
    const {name, value} = e.target
    setInputs(prev => ({...prev, [name]: value}))
  }

   
  return (
    <div>
      <h1>send todo</h1>
        <form onSubmit={sendTodo}>
          <input name='title'
            placeholder="title" 
            value={inputs.title}
            onChange={handleChange}/>
          <input 
            name='description'
            value={inputs.description} 
            placeholder="description" 
            onChange={handleChange}/>
            <button>send todo</button>
        </form>



         {todos.length === 0 ? <p>make  your first todo</p> : todos.map(todo => <h1 >{todo.title}</h1>) }
    </div>
  );
};

export default App;
