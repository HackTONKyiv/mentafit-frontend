import './App.css'
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home.tsx";


function App() {
  const launchParams = retrieveLaunchParams();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
