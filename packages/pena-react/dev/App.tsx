import type Pena from '@privyid/pena'
import { useState } from 'react'
import PenaReact from '../src'

function App () {
  const url                       = new URL('dev/testpage.html', location.origin).href
  const [layoutFit, setLayoutFit] = useState(false)

  function changeUrl () {
    setLayoutFit((value) => !value)
  }

  function onAfterAction (data: Pena.Payload) {
    // eslint-disable-next-line no-console
    console.log(data.event, data.payload)
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
        <button onClick={changeUrl}>Change URL</button>
      </div>
    </div>
  )
}

export default App
