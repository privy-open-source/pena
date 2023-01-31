import { useState } from 'react'
import Pena from '../src'

function App() {
  const url                       = new URL('./dev/testpage.html', location.origin).href
  const [layoutFit, setLayoutFit] = useState(false)

  function changeUrl() {
    setLayoutFit((value) => !value)
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <Pena
          url={url}
          layout={layoutFit ? 'fit' : 'fixed'}
          onAfterAction={(data) => {
            console.log(data.event, data.payload)
          }} />
      </div>
      <div style={{ width: '50%' }}>
        <button onClick={changeUrl}>Change URL</button>
      </div>
    </div>
  )
}

export default App
