import style from "./Create_form.module.css";
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProduct } from '../../redux/actions/actions';

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
    images: []
  });

  const { name, description, price, stock, genero, category } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const onFileChange = (e) => {
    const imagesArray = [];
    const formDataObj = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      imagesArray.push(file);
      formDataObj.append(`images[${i}]`, file);
    }

    setFormData({ ...formData, images: imagesArray });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Verificar si formData.images está definido
    if (!formData.images || formData.images.length === 0) {
      console.error('No se han seleccionado imágenes');
      return;
    }

    // Create form data object
    const formDataObj = new FormData();
    formDataObj.append('name', name);
    formDataObj.append('description', description);
    formDataObj.append('price', price);
    formDataObj.append('stock', stock);
    formDataObj.append('genero', genero);
    formDataObj.append('category', category);

    // Iterar sobre las imágenes solo si formData.images está definido y no está vacío
    formData.images.forEach((image) => {
      formDataObj.append(`images`, image);
    });

    console.log('FormData object:', formDataObj);

    // Call action to add product
    try {
      const response = await addProduct(formDataObj);
      console.log('Nuevo producto añadido:', response);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };



  return (
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
        <label  className={style.genero} htmlFor="category">
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
              :null}
          </select>
</div>
        </div>

        <div className={style.formDiv}>
          <label>Images:</label>
          <input type="file" name="images" onChange={onFileChange} multiple />
        </div>

        <button type="submit" className={style.buttonForm}>Submit</button>
      </div>
    </form>
  );
};

Form.propTypes = {
  addProduct: PropTypes.func.isRequired
};

export default connect(null, { addProduct })(Form);
