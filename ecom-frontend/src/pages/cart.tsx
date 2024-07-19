import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItems from "../components/cartItems";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: "S1",
    photo: "https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=300",
    name: "Red Checked Shirt",
    price: 200,
    quantity: 5,
    stock: 40,
  },
];


const subtotal = 4000;
const tax = Math.round(subtotal*0.18);
const shipping = 120;
const total = subtotal+tax+shipping;
const discount = 50;


const Cart = () => {
    const [couponCode, setCouponCode]=useState<string>("");
    const [isValidCouponCode, setIsValidSetCouponCode]=useState<boolean>(false);

    useEffect(()=>{
      const timeoutid = setTimeout(() => {
        if(Math.random()>0.5) setIsValidSetCouponCode(true);
        else setIsValidSetCouponCode(false);
      }, 500);

      return()=>{
        clearTimeout(timeoutid)
        setIsValidSetCouponCode(false);
      }
    },[couponCode])

  return (

    <div className="cart">

      <main>
        {
          cartItems.length > 0 ? ( cartItems.map((i, idx)=><CartItems key={idx} cartItem={i}/>)
        ):(
          <h1>No Items are added</h1>
        )
      }
      </main>

        <aside>
            <p>Subtotal: ${subtotal}</p>
            <p>Shipping Charges: ${shipping}</p>
            <p>Tax: ${tax}</p>
            <p>
                Discount: <em> - ${discount}</em>
            </p>
            <p>
                <b> Total: ${total}</b>
            </p>
            <input 
                type="text"   
                placeholder="Coupon Code"
                value={couponCode} 
                onChange={(e)=>setCouponCode(e.target.value)}
            />
            {couponCode && (isValidCouponCode?
                <span className="green"> ${discount} OFF using the  code 
                    <code> {couponCode}</code>
                </span> : <span className="red"> Invalid Coupon Code <VscError/></span>
           )}

           {
            cartItems.length > 0 && <Link to="/shipping"> Checkout </Link>
           }

        </aside>

    </div>
  )
}

export default Cart;
