import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home.tsx";
import {TonConnectUIProvider} from "@tonconnect/ui-react";

const manifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';

function App() {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </TonConnectUIProvider>
  )
}

export default App
