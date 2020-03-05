import React from 'react'
import { Consumer } from '../context';
import flightValues from '../flightValues'

function BodyInfoBlock({index, type}) {
  let flightTypeData, flightData, blockTitle
  
  const buildData = (data, type) => {
    flightData = data
    flightTypeData = type === 'arrive' ? flightData.arrive_info : flightData.depart_info
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
                {flightValues.getAirportValue(flightData, context.listType, type)}
              </div>
              <div>
              <span>
                {flightValues.getGateLabel(flightTypeData)}
              </span>
                  {flightValues.getGateValue(flightTypeData)}
            </div>
            </div> 

            <div className="ft-schedule-time"> 

              {flightTypeData.actual_gate && 
              <div>
                <span>Actual: </span>
                {flightValues.getTime(flightTypeData.actual_gate)}
              </div>} 

              {flightTypeData.scheduled_gate && 
              <div>
                <span>Scheduled: </span>
                {flightValues.getTime(flightTypeData.scheduled_gate)}
              </div>} 

              {flightTypeData.estimated_gate && 
              <div>
                <span>Estimated: </span>
                {flightValues.getTime(flightTypeData.estimated_gate)}
              </div>} 

            </div>
          </div>
          </React.Fragment>
          )}
        </Consumer>
    )
  }

  export default BodyInfoBlock