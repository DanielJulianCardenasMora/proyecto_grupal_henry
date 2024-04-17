import style from './Detail.module.css'
import fondo from '../../assets/Imagenes/Detail_fondo3_aplicar.png'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { getProductDetail } from '../../redux/actions/actions'
import shape from '../../assets/Imagenes/Detail_shape_aplicar.png'


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


 <div className= {style.content}>
 <div className={style.producto}>
 <div className={style.boton}>
          <div className={buttonClass ? style.boton_img : style.boton_img_hover }>   <button className={style.action} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleBackClick}></button></div>
         
        </div>
        <img src={images} alt=""  className={style.img1}/>  

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


        <select onChange={handleSizeChange} value={selectedSize} className={style.selectS}>
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
    </div>
  )
}

export default Detail


