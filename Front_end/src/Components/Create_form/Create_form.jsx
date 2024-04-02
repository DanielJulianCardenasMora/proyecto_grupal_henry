// import style from "./Create_form.module.css";
// import { useState } from "react";
// import validacion from './validacion'
// const URL_SERVER = 'http://localhost:3001/products/create'
// import axios from 'axios'
// import { useSelector } from "react-redux";




// const Create_form = () => {
//   const genres = ['Masculino', 'Femenino', 'Unisex']
//   const category = ['Pantalones', 'Remeras', 'Chaquetas', 'Buzos', 'Faldas', 'Camisas']
//   const [errors, setErrors] = useState({});
//   const [productData, setProductData] = useState({
//     name: '',
//     description: '',
//     image: '',
//     price: '',
//     category: '',
//     image: '',
//     genero: ''
//   });

//   const handleChange = (evento) => {
//     setErrors(
//       validacion({ ...productData, [evento.target.name]: evento.target.value })
//     );
//     setProductData({ ...productData, [evento.target.name]: evento.target.value });
//   };

//   const createproduct = async (productData) => {
//     try {
//       const { name, description, image, price, category, genero } = productData;
//       const obj = {
//         name: name,
//         description: description,
//         image: image,
//         price: price,
//         category: category,
//         genero: genero
//       }
//       await axios
//         .post(`${URL_SERVER}`, obj);
//         alert(`Producto añadido con exito:  ${obj.name}`)
//     }
//     catch (error) {
//       alert(error.response.data.message)
//     }
//   }

//   const handleSubmit = (evento) => {
//     evento.preventDefault();
//     createproduct(productData);
//   };



//   return (
//     <div className={style.background}>
//     <div className={style.cont}>

//       <form className={style.formCont} onSubmit={handleSubmit}>
//         <label htmlFor="name">
//           Name:
//           <input
//             className={style.inp}
//             type="text"
//             placeholder=""
//             id="name"
//             name="name"
//             value={productData.name}
//             onChange={handleChange}
//           />
//         </label>
//         {errors.name && <p>{errors.name}</p>}



//         <label htmlFor="price">
//           Price:
//           <input
//             className={style.inp}
//             type="text"
//             placeholder=""
//             id="price"
//             name="price"
//             value={productData.price}
//             onChange={handleChange}
//           />
//         </label>
//         {errors.price && <p>{errors.price}</p>}



//         <label  className={style.genero} htmlFor="genre">
//           Genre:{''}

//           <select className={style.select} name='genero' value={productData.genero} onChange={handleChange}>
//             <option disabled='disabled' >- Gender -</option>

//               {genres ? genres.map((option, i) => {
//                 return (
//                   <option key={i} name={option} value={option}>{option}</option>
//                 )
//               })
//               :null}
//           </select>
//           </label>



//         <label  className={style.genero} htmlFor="category">
//           Category:{''}
//           <select className={style.select} name='category' defaultValue='All' onChange={handleChange}>
//             <option disabled='disabled' name='category' value={productData.category}>- Category -</option>
//               {category ? category.map((option, i) => {
//                 return (
//                   <option key={i} name={category} value={option}>{option}</option>
//                 )
//               })
//               :null}
//           </select>
//         </label>



//         <label htmlFor="image">
//           Image link:
//           <input
//             className={style.inp}
//             type="text"
//             placeholder=""
//             id="image"
//             name="image"
//             value={productData.image}
//             onChange={handleChange}
//           />
//         </label>
//         {errors.image && <p>{errors.image}</p>}



//         <label htmlFor="description">
//           Description:
//           <input
//             className={style.inp}
//             type="text"
//             placeholder=""
//             id="description"
//             name="description"
//             value={productData.description}
//             onChange={handleChange}
//           />
//         </label>
//         {errors.description && <p>{errors.description}</p>}




//         <button className={style.buttonForm}>Create</button>
//         <h3 className={style.font}>Press the button when you are ready</h3>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Create_form;

import style from "./Create_form.module.css";
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProduct } from '../../redux/actions/actions';

const Form = ({ addProduct }) => {
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
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={onChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={description} onChange={onChange} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={price} onChange={onChange} />
      </div>
      <div>
        <label>Stock:</label>
        <input type="number" name="stock" value={stock} onChange={onChange} />
      </div>
      <div>
        <label>Genero:</label>
        <input type="text" name="genero" value={genero} onChange={onChange} />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" name="category" value={category} onChange={onChange} />
      </div>
      <div>
        <label>Images:</label>
        <input type="file" name="images" onChange={onFileChange} multiple />
      </div>
      <button type='submit'>Submit</button>
      </div>
      
    </form>
  );
};

Form.propTypes = {
  addProduct: PropTypes.func.isRequired
};

export default connect(null, { addProduct })(Form);
