import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Admin from "./components/Admin/Admin";
import Product from "./components/Products/Product";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/products/:productId" element={<Product />} />
    </Routes>
  );
}

export default App;
