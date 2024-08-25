import { useContext } from "react"
import SVGcomp from "./SVGcomp"
import './Popup.css'
import PopContext from "../../Context/PopContext"

function Popup() {

    const { visible, setVisible, setIsBlur } = useContext(PopContext)

    const handleDecline = () => {
        setVisible(false)
        setIsBlur(false)
    }

    return (
        <>
            <div className={visible ? "card" : "card-none"}>
                <SVGcomp />
                <p className="cookieHeading">Would you like to proceed ahead?</p>
                <p className="cookieDescription">Remember that the only way to recover your wallet it to have your seed phrase. If you lose your seed phrase, your wallet will be lost forever.</p>
                <div className="buttonContainer">
                    <button className="acceptButton" onClick={() => setVisible(!visible)}>Proceed</button>
                    <button className="declineButton" onClick={handleDecline}>Cancel</button>
                </div>

            </div>
            {/* <button className="acceptButton" onClick={() => setVisible(!visible)}>Proceed</button>
            <button className="declineButton">Cancel</button> */}
        </>
    )
}

export default Popup
