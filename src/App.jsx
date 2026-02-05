import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";


import DefaultLayout from "./layout/DefaultLayout"


import Home from "./pages/Home"
import Products from "./pages/Products.jsx"
import Wishlist from './pages/Wishlist.jsx';


import DetailProduct from './components/DetailProduct.jsx';
import Cart from './pages/Cart.jsx';
import About from './pages/About.jsx';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:slug" element={<DetailProduct />} />


          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;