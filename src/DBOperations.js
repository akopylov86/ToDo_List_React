const baseUrl = 'https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/todos';

export async function db_createToDo(toDo){
   const res = fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(toDo),
      headers: {
         "Content-type": "application/json; charset=UTF-8"
      }
   })
       // .then(response => response.json())
       // .then(json => console.log(json))

   return res.ok && res.status === 200
}

export async function db_changeToDo(id, obj){
   let sObj = JSON.stringify(obj);
   let res = await fetch(baseUrl + `/${id}`, {
      method: 'PUT',
      body: sObj,
      headers: {
         "Content-type": "application/json; charset=UTF-8"
      }
   })
       // .then(response => response.json())
       // .then(json => console.log('change', json))

   return res.ok && res.status === 200
}

export async function db_deleteToDo(id){
   let res = await fetch(baseUrl + `/${id}`, {
      method: 'DELETE'
   })
   return res.ok && res.status === 200
}

export function db_getToDoList(){
   return fetch(baseUrl + '?_limit=5')
        .then(response => response.json(), reject => console.log(reject))
}

