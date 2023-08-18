
import './App.css';
import Nav from './components/nav';
import Footer from './components/footer';
import AddProduct from './components/addproduct'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/profile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
     <Routes>
      <Route element={<PrivateComponent />}>
      <Route path="/" element={<ProductList />} />
      <Route path="/add" element={<AddProduct/>}  />
      <Route path="/update/:id" element={<UpdateProduct />}  />
      <Route path="/logout" element={<h1>Logout Product Listing Component</h1>}  />
      <Route path="/profile" element={<Profile />}  />
      </Route>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login />} />
     </Routes>
     </BrowserRouter>
     <Footer />
    </div>
  );
}

export default App;
