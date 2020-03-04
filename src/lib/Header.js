import React from 'react'
import flightValues from './flightValues'

// this is the card header comp
function Header({data, listType}){
    const rawFlightData = data
    // we toggle if we are looking at departing or arriving info based on prop
    const flightData = listType === "arrive" ? rawFlightData.arrive_info : rawFlightData.depart_info
  
    return(
      <div className="ft-head">
  
        <div className="ft-info">
          <div className="ft-remote-city">
            {rawFlightData.remote_city}
          </div>
          <div className="ft-quick-info">
              <span className="ft-full-id">
                {rawFlightData.f_id}
              </span> 
              <span className="ft-naa-gate">
                <span>
                  {flightValues.getGateLabel(flightData)}
                </span>
                  {flightValues.getGateValue(flightData)}
              </span>
          </div>   
        </div>
  
        <div className="ft-status in-the-air">
          <span className="ft-status-label">
            {flightValues.getStatus(rawFlightData)}
          </span>
          <span className="ft-status-time">
            {flightValues.getTime(flightData.scheduled_gate)}
          </span>
          <span className="ft-status-icon status-in-air"></span>
        </div>
        
      </div>
    )
  }

  export default Header