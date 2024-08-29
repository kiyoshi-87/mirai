import React from "react"

type KeysContextType = {
    publicKeys: string[],
    setPublicKeys: React.Dispatch<React.SetStateAction<string[]>>,
    privateKeys: string[],
    setPrivateKeys: React.Dispatch<React.SetStateAction<string[]>>
}

const KeysContext = React.createContext<KeysContextType>({
    publicKeys: [],
    setPublicKeys: () => {},
    privateKeys: [],
    setPrivateKeys: () => {}
})      

export default KeysContext
