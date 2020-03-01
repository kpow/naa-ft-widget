import React, { Component } from 'react'
import './css/App.scss'

const flightValues = {
  getGateLabel:(flighData) =>{
    let termLabel = ""
    if (flighData.terminal && flighData.terminal.length > 0){
      termLabel = "Term./"
    } 
    return `${termLabel}Gate: ` 
  }, 
  getStatus: (flightData) => {
    return flightData.status
  },
  getGateValue: (flighData) =>{
    let termValue = ""
    let divider = ""
    if (flighData.terminal && flighData.terminal.length > 0){
      termValue = flighData.terminal
      divider = " / "
    } 
    const gateValue = flighData.gate
    return termValue+divider+gateValue

   },
   getTime: (flightData) =>{
    const date = new Date(flightData)
    const localeSpecificTime = date.toLocaleTimeString().replace(/:\d+ /, ' ')
    return localeSpecificTime
  }
}

function WidgetHeader(props) {  
  return (
    <header>
        <h3>{props.title}</h3>
        <a href="#" className="primary-button button-dark">
            See Flights
        </a>
    </header>
  );
}

function StatusIndicator() {
  return(
    <div className="ft-status-indicator">
      <div className="indicator delayed">
        <svg width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.31112 1.54406e-06L6.78358 0.561008L10.5901 11.0525L6.78358 11.0525C6.78358 11.0525 5.11128 11.2858 3.4477 11.5876L1.18813 8.44935L-7.2345e-07 8.44939L0.634106 12.2325C0.339938 12.3362 0.164115 12.4357 0.164045 12.5252C0.164045 12.6039 0.338345 12.6945 0.630157 12.7911L7.73665e-05 16.5507L1.18813 16.5506L3.44702 13.4136C5.11067 13.7107 6.78366 13.9476 6.78366 13.9476L10.5901 13.9476L6.78366 24.4391L8.31105 25L11.1675 21.8154L12.8338 21.8154L12.8338 20.5783L12.2771 20.5783L15.0246 17.5152L16.5544 17.5153L16.5543 16.2782L16.1342 16.2782L18.2247 13.9475L22.597 13.9475C25.581 13.9475 28 13.2994 28 12.5C28 11.7006 25.5809 11.0526 22.597 11.0525L18.2248 11.0525L16.1342 8.7218L16.5543 8.72179L16.5543 7.4848L15.0247 7.4848L12.2771 4.42158L12.8338 4.42157L12.8338 3.18448L11.1675 3.18449L8.31112 1.54406e-06Z" fill="#174B68"/>
        </svg>
      </div>

      <div className="indicator-line"></div>
    </div>                       
  )
}

function BodyInfoBlock(props) {
  const rawFlightData = props.data
  const flightData = props.type === "Arrival" ? rawFlightData.arrive_info : rawFlightData.depart_info
  return(
    <>
    <h4 className="ft-subtitle">{props.type}</h4> 
      <div className="ft-info">                                            
        <div className="ft-schedule-location">
          <div><span>Airport:</span>
           {rawFlightData.remote_city} {rawFlightData.remote_airport} 
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

function Header(props){
  const rawFlightData = props.data
  const flightData = props.type === "Arrival" ? rawFlightData.arrive_info : rawFlightData.depart_info

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

function Card(props) {
  const toggleID = props.toggleID
  
  const handleClick = (e) =>{
    //if i wanted only 1 card open
    // const cards = document.querySelectorAll('.ft-flight-card')
    // cards.forEach((card)=>{card.classList.remove('active')})
    const card = document.querySelector(`#${toggleID}`);
    card.classList.toggle('active')
  }

  return(
    <li className="ft-flight-card" id={toggleID} onClick={handleClick}>                          
        <Header data={props.data} type={props.type}/>
        <div className="ft-body">
            <BodyInfoBlock type="Arrival" data={props.data} />
            <StatusIndicator />
            <BodyInfoBlock type="Departure" data={props.data} />
        </div>
    </li>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    props.arriveData.sort((a, b) => (a.arrive_info.scheduled_gate > b.arrive_info.scheduled_gate) ? 1 : -1);
    this.state = {
      arrivingList: props.arriveData,
      departingList: props.departData,
      type: props.type
    };
  }

  render() {
    const type = this.state.type;
    const flights = this.state.arrivingList;

    return (
      <section className="container" id="primary">
          <article className="card-container" id="arrivals">
              <div className="card">
                  <div className="bg">

                    <WidgetHeader title={`${type}s`} />

                    <ul className="schedule-container">
                     
                      {flights &&
                        flights.map((flight, index) => (
                          <Card data={flight} 
                                key={"id-"+index} 
                                toggleID={"ft-card-id-"+index}
                                type={type}      
                          />                      
                      ))}
                      
                    </ul>
                  </div>
              </div>
          </article>
      </section>
    )
  }
}

export default App
