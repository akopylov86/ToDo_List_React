import React, {useContext, useState} from "react";
// import PropTypes from "prop-types"
import Context from "../context";

function useInputValue(defValue=''){
    let [value, setValue] = useState(defValue)

    return {
        value: () => value,
        clear: () => setValue(''),
        bind: {value, onChange: event => setValue(event.target.value)}
    }
}

function AddToDo(){

    const {createToDo} = useContext(Context);
    const inputValue = useInputValue();

    function submitNewToDo(event){
        event.preventDefault();
        if(inputValue.value().trim()) {
            createToDo(inputValue.value().trim());
            inputValue.clear()
        }
    }

    return (<form className="adding_line" onSubmit={submitNewToDo}>
                <input type="text" {...inputValue.bind}/>
                <button type="submit" >Add To_Do</button>
            </form>)
}

export default AddToDo

