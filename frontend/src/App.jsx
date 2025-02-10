import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Portfolio from "./pages/Portfolio";

function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login/>} />
                    <Route path='/signup' element={<Signup/>} />
                    <Route path='/reset-password' element={<ForgotPassword/>} />
                    <Route path='/profile' element={<ProtectedProfile/>} />
                    <Route path='/portfolio/:username' element={<Portfolio/>} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    )
}

const ProtectedProfile = () =>{
    const token = sessionStorage.getItem('token');
    if(token){
        return <Profile/>
    }
    else{
        return <Navigate to='/' />
    }
}

export default App;