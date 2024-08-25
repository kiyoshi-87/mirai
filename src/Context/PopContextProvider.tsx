import { useState } from "react"
import PopContext from "./PopContext"

const PopContextProvider: React.FC<{ children: React.ReactNode }> =({children }) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [isBlur, setIsBlur] = useState<boolean>(false)
    return (
    <PopContext.Provider value={{ visible, setVisible, isBlur, setIsBlur }}>
        {children}
    </PopContext.Provider>)
}

export default PopContextProvider
