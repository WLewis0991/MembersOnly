import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import MessageBoard from "./pages/MessageBoard"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {

  return (
    <>
    <BrowserRouter>
      <div className="flex flex-col h-dvh w-full bg-white">
        <Navbar />
          <Routes>
            <Route path="/" element={<MessageBoard />} />
            <Route path="/log-in" element={<Login />} /> 
            <Route path="/register" element={<Register />} />
          </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
