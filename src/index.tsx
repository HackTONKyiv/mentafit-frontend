import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

import Home from './Home.tsx';
import { EnvUnsupported } from './components/EnvUnsupported.tsx';
import { init } from './init.ts';

import '@telegram-apps/telegram-ui/dist/styles.css';
import './Home.css';



// Mock the environment in case, we are outside Telegram.
import './mockEnv.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
  // Configure all application dependencies.
  init(retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV);
  console.log(retrieveLaunchParams());

  root.render(
    <StrictMode>
      <Home/>
    </StrictMode>,
  );
} catch (e) {
  root.render(<EnvUnsupported/>);
}