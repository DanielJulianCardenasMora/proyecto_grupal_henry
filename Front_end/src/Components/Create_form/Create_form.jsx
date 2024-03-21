import style from "./Create_form.module.css";
import { useState } from "react";
import validacion from './validacion'
const URL_SERVER = ''
import axios from 'axios'
import { useSelector } from "react-redux";




const Create_form = () => {
  const genres = []
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    photo: '',
    price: '',
    categorie: '',
    genre: []
  });
  const [productGenreShow, setProductGenreShow] = useState([])
  const [errors, setErrors] = useState({});
  const handleChange = (evento) => {
    setErrors(
      validacion({ ...productData, [evento.target.name]: evento.target.value })
    );
    setProductData({ ...productData, [evento.target.name]: evento.target.value });
  };
  
  const handleFilter = (event) => {
    setProductData({
      ...productData,
      genre: [...productData.genre, event.target.value]
    })
    const selectedGenreId = event.target.value;
    const selectedGenre = genres.find(
      (genre) => genre.id === parseInt(selectedGenreId, 10)
      );
      setProductGenreShow([...productGenreShow, selectedGenre.Nombre])
  }



  const createproduct = async (productData) => {
    try {
      const { name, description, photo, price, categorie, genre } = productData;
      const { data } = await axios
        .post(`${URL_SERVER}videoproducts/?name=${name}&description=${description}&photo=${photo}&price=${price}&categorie=${categorie}&genre=${genre}`);
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
    <img className={style.bg2} src={'../../../src/z_imagesFonts/Images/robot.png'} alt={"fondo"} />
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



        {/* <label htmlFor="date">
          Creation date:
          <input
            className={style.inp}
            type="text"
            placeholder="DD/MM/AAAA"
            id="date"
            name="date"
            value={productData.date}
            onChange={handleChange}
          />
        </label>
        {errors.date && <p>{errors.date}</p>} */}



        {/* <label htmlFor="categorie">
          Categorie:
          <input
            className={style.inp}
            type="text"
            placeholder=""
            id="categorie"
            name="categorie"
            value={productData.categorie}
            onChange={handleChange}
          />
        </label>
        {errors.categorie && <p>{errors.categorie}</p>} */}

          


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
          <select className={style.select} defaultValue='All' onChange={handleFilter}>
            <option disabled='disabled' value='All'>- Gender -</option>
              {genres ? genres.map((option) => {
                return (
                  <option key={option.id} data-nombre={option.Nombre} value={option.id}>{option.Nombre}</option>
                )
              })
              :null}
          </select>
          </label>
          


        <label  className={style.genero} htmlFor="categorie">
          Categorie:{''}
          <select className={style.select} defaultValue='All' onChange={handleFilter}>
            <option disabled='disabled' value='All'>- Categorie -</option>
              {genres ? genres.map((option) => {
                return (
                  <option key={option.id} data-nombre={option.Nombre} value={option.id}>{option.Nombre}</option>
                )
              })
              :null}
          </select>
        </label>



        <label htmlFor="photo">
          Image link:
          <input
            className={style.inp}
            type="text"
            placeholder=""
            id="photo"
            name="photo"
            value={productData.photo}
            onChange={handleChange}
          />
        </label>
        {errors.photo && <p>{errors.photo}</p>}



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




        <button className={style.buttonForm}>Create</button>
        <h3 className={style.font}>Press the button when you are ready</h3>
        </form>
      </div>
    </div>
  );
};

export default Create_form;
