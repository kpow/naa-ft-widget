import React, { Component } from 'react'
import './css/App.scss'

function WidgetHeader() {
  return (
    <header>
        <h3>Arrivals</h3>
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

function BodyInfoBlock() {
  return(
    <>
    <h4 className="ft-subtitle">Departure</h4> 
      <div className="ft-info">                                            
        <div className="ft-schedule-location">
          <div><span>Airport:</span> Miami, FL (MIA) </div>
          <div><span>Terminal/Gate:</span> N/D60F </div>
        </div> 

        <div className="ft-schedule-time"> 
          <div><span>Actual:</span> Feb 4, 10:48 AM</div> 
          <div><span>Scheduled:</span> Feb 4, 10:49 AM</div> 
        </div>
      </div>
      </> 
  )
}

function Header(props){
  const flightData = props.data;
  const toggleID = props.toggleID
  
  const handleClick = (e) =>{
    const card = document.querySelector(`#${toggleID}`);
    card.classList.toggle('active')
  }

  const gateLabel = (flightArrivingData) =>{
    const termLabel = flightArrivingData.terminal !== "" ? "Term/" : "";
    const formatedLabel = `${termLabel}Gate: ` 
    return formatedLabel
  }

  const gateValue = (flightArrivingData) =>{
   const termValue = flightArrivingData.terminal
   const gateValue = flightArrivingData.gate
   const divider = flightArrivingData.terminal !== "" ? "/" : "";
   const formatedValue = termValue+divider+gateValue
   return formatedValue 
  }

  const getStatus = (flightData) => {
      return flightData.status
  }

  const getArrivalTime = (flightArrivingData) =>{
    const date = new Date(flightArrivingData.scheduled_gate);
    const localeSpecificTime = date.toLocaleTimeString();
    return localeSpecificTime.replace(/:\d+ /, ' ');
  }

  return(
    <div className="ft-head" onClick={handleClick}>
      <div className="ft-info">
        <div className="ft-remote-city">
          {flightData.remote_city}
        </div>
        <div className="ft-quick-info">
            <span className="ft-full-id">
              {flightData.f_id}
            </span> 
            <span className="ft-naa-gate">
              <span>{gateLabel(flightData.arrive_info)}</span>
                {gateValue(flightData.arrive_info)}
            </span>
        </div>   
      </div>    
      <div className="ft-status in-the-air">
        <span className="ft-status-label">{getStatus(flightData)}</span>
        <span className="ft-status-time">
          {getArrivalTime(flightData.arrive_info)}
        </span>
        <span className="ft-status-icon status-in-air"></span>
      </div>
    </div>
  )
}

function Card(props) {
  const toggleID = props.toggleID
  return(
    <li className="ft-flight-card" id={toggleID}>                          
        <Header data={props.data} toggleID={toggleID}/>
        <div className="ft-body">
            <BodyInfoBlock type="arriving" data="" />
            <StatusIndicator />
            <BodyInfoBlock type="departures" data="" />
        </div>
    </li>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: props.data
    };
  }

  render() {
    const arrivingFlights = this.state.list;

    return (
      <section className="container" id="primary">
          <article className="card-container" id="arrivals">
              <div className="card">
                  <div className="bg">

                    <WidgetHeader />

                    <ul className="schedule-container">
                     
                      {arrivingFlights &&
                        arrivingFlights.map((node, index) => (
                          <Card data={node} 
                                key={"id-"+index} 
                                toggleID={"ft-card-id-"+index}       
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
