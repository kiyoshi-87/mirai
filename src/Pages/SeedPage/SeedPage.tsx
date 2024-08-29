import { Keypair } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useContext, useEffect, useState } from "react";
import nacl from "tweetnacl";
import PopContext from "../../Context/PopContext";
import bs58 from "bs58";
import KeysContext from "../../Context/KeysContext";
import "./styles.css";
import Svgcomp from "./Svgcomp";
import CopyComp from "./CopyComp";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

interface KeysVisibility {
    [key: number]: boolean;
}

function SeedPage() {
    const [icon, setIcon] = useState(eyeOff);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const { mnemonic } = useContext(PopContext);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const { publicKeys, setPublicKeys, privateKeys, setPrivateKeys } = useContext(KeysContext);
    const [visibleKeys, setVisibleKeys] = useState<KeysVisibility>({});

    // Load keys from local storage on component mount
    useEffect(() => {
        const storedPublicKeys = JSON.parse(localStorage.getItem('publicKeys') || '[]');
        const storedPrivateKeys = JSON.parse(localStorage.getItem('privateKeys') || '[]');
        setPublicKeys(storedPublicKeys);
        setPrivateKeys(storedPrivateKeys);
        setCurrentIndex(storedPublicKeys.length);
    }, [setPublicKeys, setPrivateKeys]);

    // Store keys in local storage when they change
    useEffect(() => {
        localStorage.setItem('publicKeys', JSON.stringify(publicKeys));
        localStorage.setItem('privateKeys', JSON.stringify(privateKeys));
    }, [publicKeys, privateKeys]);

    const handleAddWallet = async () => {
        const seed = await mnemonicToSeed(mnemonic.join(" "));
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);

        setCurrentIndex(currentIndex + 1);
        setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
        setPrivateKeys([...privateKeys, bs58.encode(secret)]);
    };

    const handleClick = (index: number) => {
        setIcon(icon === eye ? eyeOff : eye);
        setVisibleKeys(prevState => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const handleDelete = (index: number) => {
        const newPublicKeys = publicKeys.filter((_, i) => i !== index);
        const newPrivateKeys = privateKeys.filter((_, i) => i !== index);
        setPublicKeys(newPublicKeys);
        setPrivateKeys(newPrivateKeys);
    };

    const handleSingleCopy = async (e: any) => {
        const input = e.target as HTMLInputElement;
        try {
            await navigator.clipboard.writeText(input.value);
        } catch (err) {
            console.log("Failed to copy", err);
        }
    };

    const handleClearWalletClick = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const ConfirmationPopup: React.FC<{ onConfirm: () => void; onCancel: () => void }> = ({ onConfirm, onCancel }) => (
        <div className="popup-container">
            <div className="popup-content">
                <p>Are you sure you want to clear your wallet?</p>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    );

    return (
        <div className="main-container">
            <h1>Generate</h1>
            <div className="btn-container">
                <button className="btn" onClick={handleAddWallet}>
                    Add Wallet
                </button>
                <button className="clearWalletBtn" onClick={handleClearWalletClick}>
                    <span className="text">Clear Wallet</span>
                </button>
                {isPopupVisible && (
                    <ConfirmationPopup
                        onConfirm={() => {
                            setPublicKeys([]);
                            setPrivateKeys([]);
                            setIsPopupVisible(false);
                        }}
                        onCancel={() => setIsPopupVisible(false)}
                    />
                )}
            </div>

            {publicKeys.map((pk, index) => (
                <div key={index}>
                    <div style={{ display: "flex", marginLeft: "2em" }}>
                        <h2 style={{ marginBottom: '1em', marginTop: '0.5em' }}>Wallet {index + 1}:</h2>
                        <button className="del-sng-btn" onClick={() => handleDelete(index)}><Svgcomp /></button>
                    </div>

                    <div className="key-container">
                        <h3 style={{ marginBottom: '0px', marginTop: '0.5em' }}>Public Key:</h3>
                        <input
                            className="keypair"
                            value={pk}
                            style={{ fontSize: 'large', marginTop: "2vb" }}
                            type="text"
                            readOnly
                            onDoubleClick={async (e) => {
                                const input = e.target as HTMLInputElement;
                                try {
                                    await navigator.clipboard.writeText(input.value);
                                    alert("Copied to clipboard!");
                                } catch (err) {
                                    console.error("Failed to copy: ", err);
                                }
                            }}
                        />
                        <button className="copy" onClick={() => handleSingleCopy(index)}><CopyComp /></button>
                        <br />
                        <h3 style={{ marginBottom: '0px' }}>Private Key:</h3>
                        <input
                            className="keypair"
                            value={visibleKeys[index] ? privateKeys[index] : "***********************************************************"}
                            style={{ fontSize: 'large', marginTop: '2vb', marginBottom: "90px" }}
                            type="text"
                            readOnly
                        />
                        <button className="copy" onClick={() => handleClick(index)}><Icon icon={icon} /></button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SeedPage;
