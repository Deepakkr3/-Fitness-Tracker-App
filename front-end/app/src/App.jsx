import { useReducer } from "react"
let initialState={count:0,name:""}
const reducer=(state,action)=>{
  switch(action?.type){
    case "inc":{
      return {count:state.count+1}
    }
    case "dec":{
      return {count:state.count-1}
    }
    case "name":{
      return {name:action.payload,count:state.count}
    }
    default:{
      return count
    }
  }
}
function App() {
 const [state,dispatch]=useReducer(reducer,initialState)

  


  return (
    <>
     <h1>{state.count}</h1>
     <h1>{state.name}</h1>
     <button onClick={()=>dispatch({type:"inc"})}>+</button>
     <button onClick={()=>dispatch({type:"dec"})}>-</button>
     <input type="text" onChange={(e)=>dispatch({type:"name",payload:e.target.value})} value={state.name}></input>
    
    </>
  )
}

export default App
