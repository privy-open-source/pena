import React, { useState } from 'react'
import PenaReact, { type Payload } from '..'

function App () {
  const url                       = new URL('dev/testpage.html', location.origin).href
  const [layoutFit, setLayoutFit] = useState(false)

  function changeLayout () {
    setLayoutFit((value) => !value)
  }

  function onAfterAction (event: Payload) {
    // eslint-disable-next-line no-console
    console.log(event.action, event.data)
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <PenaReact
          url={url}
          layout={layoutFit ? 'fit' : 'fixed'}
          onAfterAction={onAfterAction} />
      </div>
      <div style={{ width: '50%' }}>
        <button onClick={changeLayout}>Change Layout</button>
      </div>
    </div>
  )
}

export default App
