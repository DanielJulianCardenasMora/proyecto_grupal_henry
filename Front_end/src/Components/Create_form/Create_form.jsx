import style from "./Create_form.module.css";
import { useState } from "react";
import validacion from './validacion'
const URL_SERVER = 'http://localhost:3001/products/create'
import axios from 'axios'
import { useSelector } from "react-redux";




const Create_form = () => {
  const genres = ['Masculino', 'Femenino', 'Unisex']
  const category = ['Pantalones', 'Remeras', 'Chaquetas', 'Buzos', 'Faldas', 'Camisas']
  const [errors, setErrors] = useState({});
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    images: [],
    price: '',
    category: '',
    image: '',
    genero: ''
  });

  const handleChange = (evento) => {
    setErrors(
      validacion({ ...productData, [evento.target.name]: evento.target.value })
    );
    setProductData({ ...productData, images: image });
  };

  const handleImage = (evento) => {
    const image = evento.target.files[0];
    setProductData({ ...productData, images: [...productData.images, image] });
  }

  const createproduct = async (productData) => {
    try {
      console.log(productData.images)
      const { name, description, images, price, category, genero } = productData;
      const obj = {
        name: name,
        description: description,
        images: images,
        price: price,
        category: category,
        genero: genero
      }
      await axios
        .post(`${URL_SERVER}`, obj);
        alert(`Producto añadido con exito:  ${obj.name}`)
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
          Genre:

          <select className={style.select} name='genero' value={productData.genero} onChange={handleChange}>
            <option disabled='disabled' >- Gender -</option>

              {genres ? genres.map((option, i) => {
                return (
                  <option key={i} name={option} value={option}>{option}</option>
                )
              })
              :null}
          </select>
          </label>
          


        <label  className={style.genero} htmlFor="category">
          Category:{''}
          <select className={style.select} name='category' defaultValue='All' onChange={handleChange}>
            <option disabled='disabled' name='category' value={productData.category}>- Category -</option>
              {category ? category.map((option, i) => {
                return (
                  <option key={i} name={category} value={option}>{option}</option>
                )
              })
              :null}
          </select>
        </label>



        <label htmlFor="images" enctype="multipart/form-data">
          Images:
          <input
            className={style.inp}
            type="file"
            placeholder=""
            id="images"
            name="images"
            value={productData.images}
            onChange={handleImage}
            multiple
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




        <button className={style.buttonForm}>Create</button>
        <h3 className={style.font}>Press the button when you are ready</h3>
        </form>
      </div>
    </div>
  );
};

export default Create_form;
