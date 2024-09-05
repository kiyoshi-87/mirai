import { useContext } from 'react'
import './App.css'
import Card from './components/Card/Card'
import Header from './components/Header/Header'
import Popup from './components/Popup/Popup'
import PopContext from './Context/PopContext'

function App() {
    const { isBlur } = useContext(PopContext)
    return (
        <>
            <div className={isBlur ? 'main-container-blur' : ''}>
                <Header />
                <div className='card-container'>
                    <Card />
                </div>
            </div>
            <Popup />
        </>
    )
}

export default App
