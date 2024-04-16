import style from './Detail.module.css'
import fondo from '../../assets/Imagenes/Detail_fondo_aplicar.png'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { getProductDetail } from '../../redux/actions/actions'
import shape from '../../assets/Imagenes/Detail_shape_aplicar.png'
import ItemCount from '../Cart/ItemCount';

function Detail(props) {
  const dispatch = useDispatch()
  const {carrito, agregarProducto}=props 
  const { id } = useParams()
  const navigate = useNavigate();
  const [buttonClass, setButtonClass] = useState(true);
  const {description, name, images, price, stock, genero} = useSelector((state) => state.Detail)
  const product = useSelector((state)=>state.Detail)
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  let sizeWithoutTotal




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
      alert("Por favor, selecciona un tamaño");
      return;
    }
    const stockSeleccionado = product.size[selectedSize]; 
    const productoEnCarrito = carrito.find(producto => producto.id === product.id && producto.size === selectedSize);
  
    if (!productoEnCarrito) {
      agregarProducto([...carrito, { ...product, size: selectedSize, quantity: selectedQuantity, stock:stockSeleccionado }]);
      alert('Producto agregado');
    } else {
    
      const totalQuantity = productoEnCarrito.quantity + selectedQuantity;
      if (totalQuantity > stockSeleccionado) {
        alert(`No hay suficiente stock disponible. Stock actual: ${stockSeleccionado}`);
        return;
      }
  
    
      agregarProducto(
        carrito.map(item =>
          item.id === product.id && item.size === selectedSize
            ? { ...item, quantity: totalQuantity }
            : item
        )
      );
      alert('Carrito actualizado');
    }
  };
  
  
console.log(product);

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

  const handleMouseEnter = () => {
    setButtonClass(!buttonClass);
  };

  const handleMouseLeave = () => {
    setButtonClass('default');
  };

  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div className={style.container}>

      <h1 className={style.texto2}>DETAIL</h1>
      <h1 className={style.texto3}>STORE</h1>
      <h1 className={style.texto4}>IN</h1>

      <div className={style.box_fondo}>
        <img className={style.fondo} src={fondo} />
      </div>

      <div className={style.producto}>
        <img src={images} alt="" />  
        <div className={style.shape}>
          <img className={style.shape} src={shape} alt="" />  
        </div>
        <div className={style.texto5_cont}>
          <h1 className={style.texto5}>C</h1>
          <h1 className={style.texto5}>O</h1>
          <h1 className={style.texto5}>L</h1>
          <h1 className={style.texto5}>E</h1>
          <h1 className={style.texto5}>C</h1>
          <h1 className={style.texto5}>T</h1>
          <h1 className={style.texto5}>I</h1>
          <h1 className={style.texto5}>O</h1>
          <h1 className={style.texto5}>N</h1>
        </div>
      </div>


      <div className={style.box2}>
        <div className={style.difuminado2}>{description}</div>
      </div>

      <div className={style.box_derecha}>
        <h1 className={style.name}>{name}</h1>
        <div className={style.boxDetalle}>
          <h1 className={style.detalle1}>Category</h1>
          <h1 className={style.detalle2}>{genero}</h1>
          <h1 className={style.detalle3}>${price}</h1>
        </div>
        
      
        <div className={style.boton}>
          <div className={buttonClass ? style.boton_img : style.boton_img_hover }></div>
          <div className={style.action} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleBackClick}></div>
        </div>
        <div className={style.buy}>


        <select onChange={handleSizeChange} value={selectedSize}>
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
          type="button"
          onClick={() => selectProducts(product)}
          >Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default Detail


