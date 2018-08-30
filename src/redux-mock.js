export function createStore(reducer,enhancer){
  if(enhancer){
    return enhancer(createStore)(reducer)
  }
  let currentState = {}
  let currentListeners = []

  function getState(){
    console.log('getState!');
    return currentState
  }
  function subscribe(listener){
    console.log('subcribe!');
    currentListeners.push(listener)
  }
  function dispatch(action){
    console.log('dispatch!');
    currentState=reducer(currentState,action)
    currentListeners.forEach(v=>v())
    return action
  }
  dispatch({type:'@@REDUX_MOCK/REDUX'})
  return {getState,subscribe,dispatch}
}

//中间件处理
export function applyMiddleWare(middleware){
  return createStore=>(...args)=>{
    const store = createStore(...args)
    let dispatch = store.dispatch
    const midApi = {
      getState:store.getState,
      dispatch:(...args)=>dispatch(...args)
    }
    dispatch = middleware(midApi)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
function bindActionCreator(creator,dispatch){
  return (...args)=>dispatch(creator(...args))
}
export function bindActionCreators(creators,dispatch){
  let bound={}
  Object.keys(creators).forEach(v=>{
    let creator = creators[v]
    bound[v] = bindActionCreator(creator,dispatch)
  })
  return bound
}
