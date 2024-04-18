import style from './SearchBar.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchByName } from '../../redux/actions/actions'

export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState("");
  const [inputsErrors, setInputsErrors] = useState();

  function validate(searchString) {

    const errors = {}


    if (!isNaN(searchString.search)) {
      errors.search = 'Formato incorrecto'
    }
    return errors
  }
  function handleSearch(e) {
    e.preventDefault();

    setInputsErrors(
      validate({
        ...searchString,
        [e.target.name]: e.target.value,
      })
    );

    setSearchString(e.target.value);
  }


  function handleSubmit(e) {
    e.preventDefault();

    // Verificar si inputsErrors tiene un valor antes de usar Object.keys
    if (inputsErrors) {
      let aux = Object.keys(inputsErrors);
      if (aux.length === 0) {
        setInputsErrors();
      } else {
        return alert('Check info');
      }
    }

    dispatch(searchByName(searchString));

    setSearchString({
      search: '',
    });
  }



  return (
    <div className={style.box} >

      <input className={style.inputS} name='search' type='search' placeholder='Search...' onChange={(e) => handleSearch(e)} />
      <button  className={style.boton} type='submit' onClick={(e) => handleSubmit(e)} >🔍︎</button>


    </div>

  );
}