import { useContext, useState } from 'react'
import './styles.css'
import { generateMnemonic } from 'bip39'
import PopContext from '../../Context/PopContext'


function Card() {

    const [isPhrase, setIsPhrase] = useState(false)
    const [copied, setCopied] = useState(false)
    const { setVisible, setIsBlur, mnemonic, setMnemonic } = useContext(PopContext)

    const generatePhrase = () => {
        const mnArr = generateMnemonic().split(" ")
        setMnemonic(mnArr)
        console.log(mnArr);

        //hide the button and set phrase to true:
        setIsPhrase(true)
        setTimeout(() => { }, 1000)
    }

    const copyToClipboard = () => {
        const temp = mnemonic.join(" ");
        navigator.clipboard.writeText(temp).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    const displayPop = () => {
        setVisible(true)
        setIsBlur(true)
    }

    return (
        <div className="book">
            <span><h3 className='heading'>{isPhrase ? "Here is your secret phase:" : "Get started with your crypto wallet..."}</h3></span>
            <button onClick={generatePhrase} className={isPhrase ? 'button-none' : 'button'}><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>Create seed phrase</button>
            <div className={isPhrase ? 'phrase' : 'phrase-none'}>
                <div className="secret-inputs-container">
                    {mnemonic.map((mn, index) => (
                        <input key={index} className="secret-inputs" value={mn} style={{ fontSize: 'large' }} />
                    ))}
                    <button className='copy-btn' onClick={copyToClipboard}>{copied ? 'Copied!' : 'Copy'}</button>
                    <div>
                        <button className='next-button' onClick={() => displayPop()}>
                            Next
                        </button>
                    </div>

                </div>
            </div>
            <div className="cover">
                <p style={{ fontSize: 'xx-large' }}>Create your wallet</p>
            </div>
        </div>
    )
}

export default Card
