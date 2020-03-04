import React from 'react'
import flightValues from './flightValues'

function BodyInfoBlock({data, type, listType}) {
    const rawFlightData = data
    // we toggle if we are looking at departing or arriving info based on prop
    const flightData = type === "arrive" ? rawFlightData.arrive_info : rawFlightData.depart_info
   
    return(
      <>
      <h4 className="ft-subtitle">{type}</h4> 
        <div className="ft-info">                                            
          <div className="ft-schedule-location">
            <div><span>Airport:</span>
            {flightValues.getAirportValue(rawFlightData, listType, type)}
            </div>
            <div>
              <span>
                {flightValues.getGateLabel(flightData)}
              </span>
                  {flightValues.getGateValue(flightData)}
            </div>
          </div> 
  
          <div className="ft-schedule-time"> 
  
            {flightData.actual_gate && 
            <div><span>Actual: </span>
              {flightValues.getTime(flightData.actual_gate)}
            </div>} 
  
            {flightData.scheduled_gate && 
            <div><span>Scheduled: </span>
              {flightValues.getTime(flightData.scheduled_gate)}
            </div>} 
  
            {flightData.estimated_gate && 
            <div><span>Estimated: </span>
              {flightValues.getTime(flightData.estimated_gate)}
            </div>} 
            
          </div>
        </div>
        </> 
    )
  }

  export default BodyInfoBlock