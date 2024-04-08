import style from "./Create_form.module.css";
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProduct } from '../../redux/actions/actions';
import axios from 'axios'

const Form = ({ addProduct }) => {
  const Genres = ['Masculino', 'Femenino', 'Unisex']
  const Category = [
    "Pantalones",
    "Remeras",
    "Chaquetas",
    "Buzos",
    "Faldas",
    "Camisas",
  ];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    genero: '',
    category: '',
    images: ""
  });
  const [UrlImagen, setUrlImagen] = useState("");


  const uploadtImage = async (event) => {
    const file = event.target.files[0];

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Presents_react");

    const response = await axios.post('https://api.cloudinary.com/v1_1/dzrqdsfio/image/upload', data);

    setUrlImagen(response.data.secure_url);
    setFormData({ ...formData, images: response.data.secure_url });
  }
  const deleteImagen = () => {
    setUrlImagen("");
  }
  const { name, description, price, stock, genero, category, images } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log('onchange se actualiza', formData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!UrlImagen) {
      alert('No se ha seleccionado una imagen');
      return;
    }


    const data = {
      name,
      description,
      price: parseInt(price),
      stock: parseInt(stock),
      genero,
      category,
      images: UrlImagen
    };

    if(data.name == null){
      
    }
    try {
      const response = await addProduct(data);

      alert('Nuevo producto añadido');
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        genero: '',
        category: '',
        images: ""
      })
    setUrlImagen("");
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };



  return (
    <div className={style.background} >
      <form className={style.background} onSubmit={onSubmit}>
        <div className={style.cont}>
          <div className={style.formDiv}>
            <label>Name:</label>
            <div className={style.input}>
              <input className={style.inp} type="text" name="name" value={name} onChange={onChange} />
            </div>

          </div>

          <div className={style.formDiv}>
            <label>Description:</label>
            <div className={style.input}>
              <textarea
                className={style.desc}
                name="description"
                value={description}
                onChange={onChange}
              />

            </div>

          </div>

          <div className={style.formDiv}>
            <label>Price:</label>
            <div className={style.input}>
              <input type="number" className={style.inp} name="price" value={price} onChange={onChange} />
            </div>

          </div>

          <div className={style.formDiv}>
            <label>Stock:</label>
            <div className={style.input}>

              <input className={style.inp} type="number" name="stock" value={stock} onChange={onChange} />
            </div>
          </div>

          <div className={style.formDiv}>
            <label className={style.genero} htmlFor="genre">
              Genre:{""}
            </label>
            <div className={style.input}>
              <select
                className={style.select}
                name="genero"
                value={genero}
                onChange={onChange}
              >
                <option> Gender </option>

                {Genres
                  ? Genres.map((option, i) => {
                    return (
                      <option key={i} name={option} value={option}>
                        {option}
                      </option>
                    );
                  })
                  : null}
              </select>
            </div>
          </div>

          <div className={style.formDiv}>
            <label className={style.genero} htmlFor="category">
              Category:

            </label>
            <div className={style.input}>
              <select className={style.select} name='category' defaultValue='All' onChange={onChange}>
                <option name='category' value={category}> Category </option>
                {Category ? Category.map((option, i) => {
                  return (
                    <option key={i} name={category} value={option}>{option}</option>
                  )
                })
                  : null}
              </select>
            </div>
          </div>

          <div className={style.formDiv}>
            <label>Images:</label>
            <input type="file" name="images" onChange={uploadtImage} multiple />
          </div>

          <button type="submit" className={style.buttonForm}>Submit</button>
        </div>
      </form>
      {UrlImagen && (
        
        <div className={style.imageContainer}>
          <h4>Preview</h4>
          <img src={UrlImagen} className={style.imgForm} />
          <button onClick={() => deleteImagen() } className={style.buttonImage}>X</button>
        </div>
      )}

    </div>
  );
};

Form.propTypes = {
  addProduct: PropTypes.func.isRequired
};

export default connect(null, { addProduct })(Form);
