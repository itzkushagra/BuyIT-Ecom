import { FaPlus } from "react-icons/fa";

type ProductProperty={
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler:()=> void;
}

const source = "ASdasdasda";

const ProductCard = (
  {
    productId,
    name,
    price,
    photo,
    stock,
    handler,
  }:ProductProperty) => {

  return (
    <div className="product-card">
      <img src={photo} alt={name} />
      <p>{name}</p>
      <span>${price}</span>

      <div className="productcardoverlay">
        <button onClick={()=>handler()}>
          <FaPlus/>
        </button>
      </div>
    </div>
  );  
  
};

export default ProductCard;