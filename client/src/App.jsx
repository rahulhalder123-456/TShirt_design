import React from 'react'
import Home from './pages/Home'
import Customizer from "./pages/Customizer.jsx";
import Canvas from "./canvas/index.jsx";

export default function App() {
    return (
        <main className="app transition-all ease-in">
            <Home/>
            <Canvas/>
            <Customizer/>
        </main>
    );
}

