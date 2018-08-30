const arrThunk=({dispatch,getState})=>next=>action=>{
  //如果是数组，遍历执行
  if (Array.isArray(action)) {
    return action.forEach(v=>dispatch(v))
  }
  return next(action)
}
export default arrThunk
