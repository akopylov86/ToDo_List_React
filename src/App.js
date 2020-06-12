import React, {useEffect} from 'react';
import './App.css';
import ToDoList from "./ToDo/ToDoList";
import Context from "./context";
import Loader from "./Loader";
import {db_getToDoList, db_deleteToDo, db_createToDo, db_changeToDo} from "./DBOperations";


function App() {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    useEffect(()=> {
        // //set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
        db_getToDoList()
            .then(data => {
                 setTimeout(setData(data), 2000);
                 setLoading(false);
        });
        // new Promise(()=>setTimeout(()=>{
        //     setData([
        //         {id:1, text:"Купить хлеб", completed:false},
        //         {id:2, text:"Купить воды", completed:true},
        //         {id:3, text:"Купить мясо", completed:false}
        //     ]);
        //     setLoading(false);
        //     }, 1000))
    }, [])

    function pushToDB(func, ...params){
        return func.call(null, ...params);
    }


    function toggleToDo(id) {
        setData(data.map(todo => {
            if(todo.id === id) {
                if (pushToDB(db_changeToDo, id, {completed:!todo.completed}))
                    todo.completed = !todo.completed
            }
            return todo
        }));
    }

    function removeToDo(id){
        if(pushToDB(db_deleteToDo,id))
            setData(data.filter(todo => todo.id !== id))
    }

    function createToDo(title){
        const newObj = {
            userId: 1,
            id: Date.now(),
            title,
            completed: false}

        if (pushToDB(db_createToDo, newObj))
            setData(
                data.concat(
                    [newObj,]
                )
            )
    }

    function changeToDo(id, title){
        if (pushToDB(db_changeToDo, id, {title}))
            setData(
                data.map((todo) => {
                    if (todo.id === id){
                        todo.title = title
                    }
                    return todo
                })
            )
    }

  return (
      <Context.Provider value={{toggleToDo, removeToDo, createToDo, changeToDo}}>
        <div className="App">
         <div className="title">To_Do List APP</div>
            { loading && <Loader/> }
            <ToDoList todos={data} loading={loading}/>
        </div>
      </Context.Provider>
  );


}

export default App;
