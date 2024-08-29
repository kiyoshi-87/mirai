import React from "react"

type PopContextType = {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    isBlur: boolean,
    setIsBlur: React.Dispatch<React.SetStateAction<boolean>>,
    mnemonic: string[],
    setMnemonic: React.Dispatch<React.SetStateAction<string[]>>
}

const PopContext = React.createContext<PopContextType>({
    visible: false,
    setVisible: () => {},
    isBlur: false,
    setIsBlur: () => {},
    mnemonic: [""],
    setMnemonic: () => {}
})

export default PopContext   
