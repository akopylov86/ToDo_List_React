import React, {useContext, useState} from "react";
import PropTypes from "prop-types"
import Context from "../context";

function ToDoItem({item}) {
    const {toggleToDo, removeToDo, changeToDo} = useContext(Context);

    let [txtValue, setTxtValue] = useState(item.title)

    let classes = ["todo_text"]
    if(item.completed){
        classes.push("done")
    }

    function submitChange(event){
        event.preventDefault()
        changeToDo(item.id, txtValue);
    }
    //
    // function cancelChanges(event) {
    //     console.log('cancel')
    // }

    return(
        <li>
        <input
            type="checkbox"
            checked={item.completed}
            name=""
            onChange={()=>{
                toggleToDo(item.id)}} />
         <form action="" onSubmit={submitChange}>
            <input
                type="text"
                value={txtValue}
                className={classes.join(' ')}
                onChange={event => setTxtValue(event.target.value)}
            />
         </form>

        <button className="delete_button" onClick={removeToDo.bind(null, item.id)}>&times;</button>
    </li>)
}

ToDoItem.propTypes ={
    item: PropTypes.object
}

export default ToDoItem