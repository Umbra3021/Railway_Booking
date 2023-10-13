import { BrowserRouter, Routes ,Route } from "react-router-dom";
import Register from "../src/components/register";
import Login from "../src/components/login";
import "./App.css";
import Home from "./components/home";

function App() {

  return <BrowserRouter >
  <Routes >
    <Route path="/register" element={<Register />}/>
    <Route path="/login" element={<Login />} />
    <Route path="/search" element={<Home />} />

    </Routes> 
  </BrowserRouter>
}



export default App;
