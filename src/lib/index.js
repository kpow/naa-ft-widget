import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { arriving, departing  } from './ft-data.json'

const targetContainerId = `widget__container`
export default {
  init: config => {
    if (!document.getElementById(targetContainerId)) {
      const targetContainer = document.createElement('div')
      targetContainer.setAttribute('id', targetContainerId)
      document.body.appendChild(targetContainer)
    }
    const flightData = config.type === "arrive" ? arriving : departing
    
    ReactDOM.render(
      <App apiKey={config.apiKey} 
           authId={config.authId} 
           env={config.env} 
           flightData={flightData}
           type={config.type} 
       />,
      document.getElementById(targetContainerId),
    )
  },
  unmount() {
    const targetContainer = document.getElementById(targetContainerId)
    if (targetContainer) {
      ReactDOM.unmountComponentAtNode(
        document.getElementById(targetContainerId),
      )
    }
  },
}
