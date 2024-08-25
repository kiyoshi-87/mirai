import React from "react"

type PopContextType = {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    isBlur: boolean,
    setIsBlur: React.Dispatch<React.SetStateAction<boolean>>
}

const PopContext = React.createContext<PopContextType>({
    visible: false,
    setVisible: () => {},
    isBlur: false,
    setIsBlur: () => {}
})

export default PopContext   
