
import { useState } from 'react'

function Tabs() {
  const tabs = ['Home', 'About', 'Contact']
  const [selected, setSelected] = useState('Home')

  return (
    <div>
      <div>
        {tabs.map(tab => (
          <button
            key={tab}
            className={selected === tab ? 'tab active' : 'tab'}
            onClick={() => setSelected(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {selected === 'Home' && <p>Welcome to the home page</p>}
      {selected === 'About' && <p>About me</p>}
      {selected === 'Contact' && <p>Contact details</p>}
    </div>
  )
}

export default Tabs















