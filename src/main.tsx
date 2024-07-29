import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import Game from "./pages/game.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Game/>
    </Provider>
  </React.StrictMode>,
)
