export const debounce = (fn, t=1000) => {
    let i
    return function(...args){
      clearTimeout(i);
      i = setTimeout(()=> {
        fn.apply(this, args);
      }, t)
    }
}