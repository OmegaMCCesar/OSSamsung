import { useState } from 'react';
import styles from '../styles/Searcher.module.css'
import search from './search';

const Search = () => {
  
    const [inp, setInput] = useState('')

    const handleSearchOnchange = (e) => {
       const value = e.target.value
       setInput(value)
    }


const result =(inp)=>{
   let res =  search(inp)
   alert(res)
}

  return (
    <div className={styles.container} >
    <button onClick={() => result(inp)} className={styles.buttonSearcher} >Buscar</button>
     <input onChange={handleSearchOnchange} value={inp} type='text' placeholder="Buscador" />
    </div>
  )
}

export default Search;