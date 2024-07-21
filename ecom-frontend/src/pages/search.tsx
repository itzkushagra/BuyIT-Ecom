import { useState } from "react";
import ProductCard from "../components/productCard";


const Search = () => {

  const [search, setSearch]= useState("");
  const [sort, setSort]= useState("");
  const [maxPrice, setMaxPrice]= useState(100000);
  const [category, setCategory]= useState("");
  const [page, setPage]= useState("");
  
  const addToCartHandler=()=>{};

  const isNextPage = page < 4;
  const isPreviousPage = page > 1;

  return (
    <div className="searchpage">
      <aside>
        <h2> Filters </h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e)=> setSort(e.target.value)}>
            <option value="">None</option>
            <option value="ascending">Price (Low to High)</option>
            <option value="dscending">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price:{maxPrice || ""}</h4>
          <input type="range"
          min={100}
          max={100000}
          value={maxPrice}
          onChange={(e)=>setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e)=> setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="ascending">Tshirt</option>
            <option value="dscending">Shirt</option>
          </select>
        </div>

      </aside>

      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        <div className="searchproduct">
          <ProductCard 
            productId="SC1"
            name="Allen Solly Checked Shirt"
            price={21}
            stock={100}
            handler={addToCartHandler}
            photo="https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=300"
          />
        </div>
        <article>
          <button disabled={!isPreviousPage}
          onClick={()=> setPage((prev)=> prev - 1)}
          >
            Previous</button>

          <span>
            {page} of {4}
          </span>

          <button disabled={!isNextPage}
          onClick={()=> setPage((prev)=> prev + 1)}
          >Next</button>

        </article>
      </main>

    </div>
  )
} 

export default Search;