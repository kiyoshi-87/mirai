import { useState } from "react";
import KeysContext from "./KeysContext";

const KeysContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [publicKeys, setPublicKeys] = useState<string[]>([]);
    const [privateKeys, setPrivateKeys] = useState<string[]>([]);
    return (
        <KeysContext.Provider value={{ publicKeys, setPublicKeys, privateKeys, setPrivateKeys }}>
            {children}
        </KeysContext.Provider>
    )
}

export default KeysContextProvider
