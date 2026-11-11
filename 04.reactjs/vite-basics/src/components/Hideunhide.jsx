


import { useState } from 'react'

function Hideunhide() {
    const [isVisible, setIsVisible] = useState(true)

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    return (
        <div>

            {isVisible && <p>Now you can see me!</p>}
            <button onClick={toggleVisibility}>
                {isVisible ? "Hide" : "Show"}
            </button>
        </div>
    )
}

export default Hideunhide