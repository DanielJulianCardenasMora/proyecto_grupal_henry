import style from './Detail.module.css'
import fondo from '../../assets/Imagenes/Detail_fondo3_aplicar.png'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { getProductDetail } from '../../redux/actions/actions'
import shape from '../../assets/Imagenes/Detail_shape_aplicar.png'
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function Detail(props) {
  const dispatch = useDispatch()
  const { carrito, agregarProducto } = props
  const { id } = useParams()
  const navigate = useNavigate();
  const [buttonClass, setButtonClass] = useState(true);
  const { description, name, images, price, stock, genero } = useSelector((state) => state.Detail)
  const product = useSelector((state) => state.Detail)
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  let sizeWithoutTotal
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  if (product.size) {
    sizeWithoutTotal = Object.entries(product.size)
      .filter(([key]) => key !== 'total')
  };


  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };


  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };


  const selectProducts = () => {
    if (!selectedSize) {
      showSnackbar('error', 'Please select a size');
      return;
    }
    const stockSeleccionado = product.size[selectedSize];
    const productoEnCarrito = carrito.find(producto => producto.id === product.id && producto.size === selectedSize);

    if (!productoEnCarrito) {
      agregarProducto([...carrito, { ...product, size: selectedSize, quantity: selectedQuantity, stock: stockSeleccionado }]);
      showSnackbar('success', 'Product added');
    } else {

      const totalQuantity = productoEnCarrito.quantity + selectedQuantity;
      if (totalQuantity > stockSeleccionado) {
        showSnackbar('error', `There is not enough stock available. Current stock: ${stockSeleccionado}`);
        return;
      }


      agregarProducto(
        carrito.map(item =>
          item.id === product.id && item.size === selectedSize
            ? { ...item, quantity: totalQuantity }
            : item
        )
      );
      showSnackbar('success', 'Updated cart');
    }
  };


  ;

  useEffect(() => {

    dispatch(getProductDetail(id))
  }, [id, carrito])

  const [availableStock, setAvailableStock] = useState(0);
  const [quantityOptions, setQuantityOptions] = useState([]);

  // Actualiza el stock disponible y las opciones de cantidad cuando cambia el tamaño seleccionado
  useEffect(() => {
    if (selectedSize && product.size[selectedSize]) {
      const stockSeleccionado = parseInt(product.size[selectedSize]);
      setAvailableStock(stockSeleccionado);
      const newQuantityOptions = [...Array(stockSeleccionado).keys()].map(index => index + 1);
      setQuantityOptions(newQuantityOptions);
      // Restablecer la cantidad seleccionada si excede el nuevo stock disponible
      setSelectedQuantity(Math.min(selectedQuantity, stockSeleccionado));
    }
  }, [selectedSize]);



  return (
    <div className={style.container}>
      

      <div className={style.content}>
        <div className={style.producto}>
          <div className={style.boton}>

            <Link to={'/products'} className={style.boton_img} >  Back</Link>


          </div>
          <img src={images} alt="" className={style.img1} />

          <div className={style.des}>
            <span>About this</span>
            <br />
            <p>    {product.description}</p>

          </div>


        </div>



        <div className={style.box_derecha}>
          <h2>{name}</h2>
          <span> ${price}</span>


          <div className={style.buy}>


            <select onChange={handleSizeChange} value={selectedSize || ""} className={style.selectS}>
              <option value="all">SIZE</option>
              {sizeWithoutTotal?.map(([size]) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            {selectedSize && (
              <select value={selectedQuantity} onChange={handleQuantityChange}>
                {quantityOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}

            <button
              className={style.cart}
              type="button"
              onClick={() => selectProducts(product)}
            >Add to cart</button>
          </div>

          <div className={style.sizes}>

          </div>



        </div>
      </div>
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
  )
}

export default Detail


