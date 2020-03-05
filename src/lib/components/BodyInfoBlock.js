import React from 'react'
import { Consumer } from '../context';
import flightValues from '../flightValues'

function BodyInfoBlock({index, type}) {
  let rawFlightData, flightData, blockTitle
  
  const buildData = (data, type) => {
    rawFlightData = data
    flightData = type === 'arrive' ? rawFlightData.arrive_info : rawFlightData.depart_info
    blockTitle = type === 'arrive' ? 'Arrival' : 'Departure'
  }
    return(
      <Consumer>
      { context => (
        <React.Fragment>

          {buildData(context.flights[index], type)}

          <h4 className="ft-subtitle">{blockTitle}</h4> 
          <div className="ft-info">                                            
            <div className="ft-schedule-location">
              <div>
                <span>Airport:</span>
                {flightValues.getAirportValue(rawFlightData, context.listType, type)}
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
              <div>
                <span>Actual: </span>
                {flightValues.getTime(flightData.actual_gate)}
              </div>} 

              {flightData.scheduled_gate && 
              <div>
                <span>Scheduled: </span>
                {flightValues.getTime(flightData.scheduled_gate)}
              </div>} 

              {flightData.estimated_gate && 
              <div>
                <span>Estimated: </span>
                {flightValues.getTime(flightData.estimated_gate)}
              </div>} 

            </div>
          </div>
          </React.Fragment>
          )}
        </Consumer>
    )
  }

  export default BodyInfoBlock