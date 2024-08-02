import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../firebase/firebase";

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetchSingleProduct(productId, setProduct);
  }, []);

  return Object.keys(product).length > 0 ? (
    <section className="w-screen bg-selected">
      <div className="container w-full h-screen flex">
        <div className="w-1/2 h-4/5">
          <img
            src={product.image}
            alt={product.image_name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="product-content text-primary w-1/2 h-4/5">
          <div className="h-full m-auto" style={{ width: "98%" }}>
            <h1 className="text-4xl font-bold">{product.title}</h1>
            <h2 className="text-2xl font-semibold">{product.price}</h2>
            <p>{product.category}</p>
            <button className="w-full h-14 bg-primary rounded-md text-white font-semibold">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <div className="big-image w-screen h-fit">
        <img
          src={product.big_image}
          alt={product.big_image_name}
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  ) : null;
}

export default Product;
