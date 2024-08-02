import { useEffect, useState } from "react";
import { addNewProduct, fetchProducts } from "../../firebase/firebase";
import { IoAddCircleOutline } from "react-icons/io5";
import TableRow from "./TableRow";

function DashbordContent() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchProducts(setProducts);
  }, []);

  return (
    <>
      {isOpen ? (
        <>
          <div
            className="overlay w-screen h-screen absolute left-0 top-0 z-40"
            style={{ background: "rgba(0,0,0,0.9)" }}
            onClick={() => setIsOpen(false)}
          ></div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addNewProduct(e.target);
            }}
            className="w-1/2 h-fit py-4 bg-primary rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="w-11/12 m-auto flex flex-col gap-2">
              <input
                type="text"
                className="w-full h-10 rounded-md outline-none px-2 line-clamp-2"
                name="title"
                placeholder="Title"
              />
              <input
                type="number"
                className="w-full h-10 rounded-md outline-none px-2"
                name="price"
                placeholder="Price"
              />
              <input
                type="file"
                className="w-full h-10 rounded-md outline-none px-2"
                name="image"
                accept="image/*"
              />
              <input
                type="text"
                className="w-full h-10 rounded-md outline-none px-2"
                name="category"
                placeholder="Category"
              />
              <input
                type="file"
                className="w-full h-10 rounded-md outline-none px-2"
                name="big_image"
                accept="image/*"
              />
              <button className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md">
                Submit
              </button>
            </div>
          </form>
        </>
      ) : null}
      <section className="dashbord-content w-4/5 h-full bg-white rounded-md overflow-scroll">
        <div className="w-full h-1/5 border-b border-primary">
          <div className="w-11/12 h-full m-auto flex items-center justify-between font-bold text-primary">
            <h1 className="text-4xl">Dashbord</h1>
            <button
              className="bg-primary text-white px-4 py-2 rounded-md font-semibold flex gap-2 items-center"
              onClick={() => setIsOpen(true)}
            >
              <span>Add Products</span>
              <span className="text-xl">
                <IoAddCircleOutline />
              </span>
            </button>
          </div>
        </div>
        <div className="w-full h-4/5 overflow-hidden my-4">
          <table className="w-11/12 m-auto">
            <thead className="w-full h-10">
              <tr className="w-full h-full">
                <th className="w-1/6 text-start">Product</th>
                <th className="w-1/6 text-start">Image</th>
                <th className="w-1/6 text-start">Title</th>
                <th className="w-1/6 text-start">Price</th>
                <th className="w-1/6 text-start">Category</th>
                <th className="w-1/6 text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0
                ? products.map((product) => {
                    return <TableRow product={product} />;
                  })
                : null}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default DashbordContent;
