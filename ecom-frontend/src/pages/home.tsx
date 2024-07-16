import { Link } from "react-router-dom";
import ProductCard from "../components/productCard";

const Home = () => {
  const addToCartHandler=()=>{};

  return (
    <div className="homePage">
        
    <section></section>
    <h1>Latest Products
      <Link to="/search" className="more">
          More
      </Link>
    </h1>

    <main>
      <ProductCard
        productId="SC1"
        name="Allen Solly Checked Shirt"
        price={21}
        stock={100}
        handler={addToCartHandler}
        photo="https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=300"
      />

    </main>

    </div>
  );
};

export default Home;