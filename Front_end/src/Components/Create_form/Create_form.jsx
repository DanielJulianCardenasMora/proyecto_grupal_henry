import style from "./Create_form.module.css";
import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addProduct } from '../../redux/actions/actions';
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { resetErrors } from "../../redux/actions/actions";

const Form = ({ addProduct }) => {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const errors = useSelector((state) => state.productError)
  const Genres = ['Men', 'Women', 'Unisex']
  const Category = [
    "Pants",
    "Tshirts",
    "Jackets",
    "Divers",
    "Skirts",
    "Shirts"];
  const Sizes = ['S', 'M', 'L', 'Xl', 'XXL'];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    genero: '',
    category: '',
    images: "",
    size: []
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
  const { name, description, price, stock, genero, category, images, size } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!UrlImagen) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Choose a image');
      setSnackbarOpen(true);
      return;
    }

    if (errors.length === 0) {
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        genero: '',
        category: '',
        images: "",
        size: []
      })
      setUrlImagen("");
      resetErrors()
      setSnackbarSeverity('success');
      setSnackbarMessage("Product added");
      setSnackbarOpen(true);
    }

    const data = {
      name,
      description,
      price: parseInt(price),
      stock: parseInt(stock),
      genero,
      category,
      images: UrlImagen,
      size: formData.size.reduce((acc, curr) => {
        acc[curr.size] = parseInt(curr.stock);
        return acc;
      }, {})
    };
    try {
      await addProduct(data);
      if (errors.length === 0) {
        setFormData({
          name: '',
          description: '',
          price: '',
          stock: '',
          genero: '',
          category: '',
          images: "",
          size: []
        });
        setUrlImagen("");
        resetErrors()
        setSnackbarSeverity('success');
        setSnackbarMessage("Product added");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  const sizeChange = (event, index) => {
    const newSizes = [...size];
    newSizes[index] = { ...newSizes[index], [event.target.name]: event.target.value };
    setFormData({ ...formData, size: newSizes });
  };
  const addSize = () => {
    setFormData({ ...formData, size: [...formData.size, { size: '', stock: '' }] });
  }

  const removeSize = (index) => {
    const newSizes = [...size];
    newSizes.splice(index, 1);
    setFormData({ ...formData, size: newSizes });
  };

  useEffect(() => {
    if (errors.length > 0) {
      setSnackbarSeverity('error');
      setSnackbarMessage(errors[0]);
      setSnackbarOpen(true);
    }
  }, [errors])


  return (
    <div className={style.background}>
      <form className={style.background} onSubmit={onSubmit}>
        <div className={style.cont}>
          <div className={style.formDiv}>
            <label>Name:</label>
            <div className={style.input}>
              <input
                className={style.inp}
                type="text"
                name="name"
                value={name}
                onChange={onChange}
              />
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
              <input
                type="number"
                className={style.inp}
                name="price"
                value={price}
                onChange={onChange}
              />
            </div>
          </div>

          <div className={style.formDiv}>
            <label>Images:</label>
            <input className={style.addImage} type="file" name="images" onChange={uploadtImage} multiple />
          </div>


          <div className={style.formDiv}>
            <label>Size and Stock</label>
            <button className={style.addSize} type="button" onClick={addSize}>
              Add
            </button>
            <div className={style.stock}>
              {size.map((item, index) => (
                <div key={index} className={style.inputSizeBox}>
                  <select className={style.sizeSelect}
                    name="size"
                    value={item.size}
                    onChange={(event) => sizeChange(event, index)}
                  >
                    <option value="">SIZE</option>
                    {Sizes.map((size, idx) => (
                      <option key={idx} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <input
                    className={style.sizeInput}
                    type="number"
                    name="stock"
                    value={item.stock}
                    onChange={(event) => sizeChange(event, index)}
                  />
                  <button
                    className={style.sizeButton}
                    type="button"
                    onClick={() => removeSize(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={style.formDiv}>
            <label className={style.genero} htmlFor="genre">
              Genre:
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
              <select
                className={style.select}
                name="category"

                value={category}
                onChange={onChange}
              >
                <option value="">Category</option>
                {Category
                  ? Category.map((option, i) => {
                    return (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    );
                  })

                  : null}
              </select>
            </div>
          </div>

          <button type="submit" className={style.buttonForm}>
            Submit
          </button>
        </div>
      </form>
      {UrlImagen ? (
        <div className={style.imageContainer}>
          <h4>Preview</h4>
          <img src={UrlImagen} className={style.imgForm} />
          <button onClick={() => deleteImagen()} className={style.buttonImage}>
            X
          </button>
        </div>
      ) : (
        <div className={style.imageContainer}>
          <h4>Preview</h4>
          <p>select an image</p>
        </div>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

Form.propTypes = {
  addProduct: PropTypes.func.isRequired
};

export default connect(null, { addProduct })(Form);
