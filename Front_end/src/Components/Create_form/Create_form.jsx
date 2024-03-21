import style from "./Create_form.module.css";
import { useState } from "react";
import validacion from './validacion'
const URL_SERVER = 'localhost:3001/'
import axios from 'axios'
import { useSelector } from "react-redux";




const Create_form = () => {
  const genres = ['genro1', 'genero2']
  const [errors, setErrors] = useState({});
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    category: '',
    image: '',
    genre: []
  });

  const handleChange = (evento) => {
    setErrors(
      validacion({ ...productData, [evento.target.name]: evento.target.value })
    );
    setProductData({ ...productData, [evento.target.name]: evento.target.value });
  };
  
  // Esta funcion suma multiples genero escogidos al estado local.
  const handleFilterGenre = (event) => {
    setProductData({
      ...productData,
      genre: [...productData.genre, event.target.value]
    })
    const selectedGenreId = event.target.value;
  }


  const createproduct = async (productData) => {
    try {
      const { name, description, image, price, category, genre } = productData;
      const obj = {name:name.value}
      const { data } = await axios
        .post(`${URL_SERVER}products, obj   `);
      alert(data)
    }
    catch (error) {
      alert(error.response.data.message)
    }
  }

  const handleSubmit = (evento) => {
    evento.preventDefault();
    createproduct(productData);
  };



  return (
    <div className={style.background}>
    <div className={style.cont}>
      
      <form className={style.formCont} onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            className={style.inp}
            type="text"
            placeholder=""
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
          />
        </label>
        {errors.name && <p>{errors.name}</p>}



        <label htmlFor="price">
          Price:
          <input
            className={style.inp}
            type="text"
            placeholder=""
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
        </label>
        {errors.price && <p>{errors.price}</p>}


          
        <label  className={style.genero} htmlFor="genre">
          Genre:{''}
<<<<<<< HEAD
          <select className={style.select} defaultValue='All' onChange={handleFilter}>
            <option disabled='disabled' value='All'>- Gender -</option>
              {genres ? genres.map((option) => {
=======
          <select className={style.select} defaultValue='All' onChange={handleFilterGenre}>
            <option disabled='disabled' value='All'>- Genre -</option>
              {genres ? genres.map((option, i) => {
>>>>>>> 5462b9daace9b701ba293d8c06df48a3e5cf101c
                return (
                  <option key={i} data-nombre={i} value={i}>{option}</option>
                )
              })
              :null}
          </select>
          </label>
          


        <label  className={style.genero} htmlFor="category">
          Category:{''}
          <select className={style.select} defaultValue='All' onChange={handleFilterGenre}>
            <option disabled='disabled' value='All'>- Category -</option>
              {genres ? genres.map((option) => {
                return (
                  <option key={option.id} data-nombre={option.Nombre} value={option.id}>{option.Nombre}</option>
                )
              })
              :null}
          </select>
        </label>



        <label htmlFor="image">
          Image link:
          <input
            className={style.inp}
            type="text"
            placeholder=""
            id="image"
            name="image"
            value={productData.image}
            onChange={handleChange}
          />
        </label>
        {errors.image && <p>{errors.image}</p>}



        <label htmlFor="description">
          Description:
          <input
            className={style.inp}
            type="text"
            placeholder=""
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </label>
        {errors.description && <p>{errors.description}</p>}




<<<<<<< HEAD
        <button className={style.buttonForm}>Create</button>
=======
        <button type='submit' className={style.buttonForm}>Create product</button>
>>>>>>> 5462b9daace9b701ba293d8c06df48a3e5cf101c
        <h3 className={style.font}>Press the button when you are ready</h3>
        </form>
      </div>
    </div>
  );
};

export default Create_form;
