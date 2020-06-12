import React from "react";
import ToDoItem from "./ToDoItem";
import propTypes from "prop-types";
import AddToDo from "./AddToDo";

function ToDoList(props) {
    return (
           <div className="list">
               {props.loading || <AddToDo/>}
               {props.todos.length ?
                   <ul>
                       {props.todos.map((element) => <ToDoItem item={element} key={element.id}/>)}
                    </ul>
                   : props.loading ? "" :<p>No TO_DO left :)</p>}
           </div>
       )
}

ToDoList.propTypes = {
    todos: propTypes.arrayOf(propTypes.object).isRequired,
    loading: propTypes.bool,
}

export default ToDoList