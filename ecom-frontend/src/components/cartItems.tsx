import { FaTrash } from "react-icons/fa";
import {Link} from "react-router-dom";

type CartItem = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
  };
  
  type CartItemsProps = {
    cartItem: CartItem;
  };

const CartItems = ({cartItem}: CartItemsProps) => {

    const {productId,photo,name,price,quantity} = cartItem;

  return (
    <div className="cart-item">
        <img src={photo} alt={name}/>
        <article>
            <Link to={`/product/${productId}`}>{name}</Link>
            <span>${price}</span>
        </article>
        <div>
            <button>-</button>
            <p>{quantity}</p>
            <button>+</button>
        </div>
        

        <button>
            <FaTrash/>
        </button>
    </div>
  );
};

export default CartItems;
