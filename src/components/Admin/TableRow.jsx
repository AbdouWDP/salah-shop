import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { BsTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { deleteProduct } from "../../firebase/firebase";

function TableRow({ product }) {
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();

  return (
    <tr
      key={product.id}
      className={`w-full h-14 font-semibold rounded-sm relative ${
        isSelected ? "bg-selected" : "bg-white"
      } hover:bg-selected`}
    >
      <td>
        <input type="checkbox" onChange={() => setIsSelected(!isSelected)} />
      </td>
      <td>
        <div>
          <img
            src={product.image}
            alt=""
            className="w-12 h-12 object-contain"
          />
        </div>
      </td>
      <td>
        <p>{product.title}</p>
      </td>
      <td>
        <p>{product.price}</p>
      </td>
      <td>
        <p>{product.category}</p>
      </td>
      <td>
        <div className="w-full h-full flex gap-2">
          <button className="edit-product w-10 h-10 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xl flex justify-center items-center">
            <RiEdit2Fill />
          </button>
          <button
            className="edit-product w-10 h-10 rounded-sm bg-red-500 hover:bg-red-600 text-white text-xl flex justify-center items-center"
            onClick={() => deleteProduct(product)}
          >
            <BsTrash3Fill />
          </button>
        </div>
      </td>
      <div
        className="navigation-button w-fit h-fit cursor-pointer text-xl text-primary absolute top-1/2 right-2 -translate-y-1/2"
        onClick={() => navigate("/products/" + product.id)}
      >
        <FaExternalLinkAlt />
      </div>
    </tr>
  );
}

export default TableRow;
