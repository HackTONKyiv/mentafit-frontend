import './App.css'
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';


function App() {
  const launchParams = retrieveLaunchParams();
  return (
    <>
      <header>
        <h1>MentalFit</h1>
      </header>
      <h2>Hello, {launchParams.initData?.user?.firstName}</h2>
    </>
  )
}

export default App
