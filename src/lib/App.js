import React, { Component } from 'react'
import BodyInfoBlock from './BodyInfoBlock'
import Header from './Header'
import SortNav from './SortNav'
import './css/App.scss'

// this is the comp for the main header over the listing.
function WidgetHeader(props) { 
  return (
    <>
    <header>
        <h3>{props.title}</h3>
        <a href="#" className="primary-button button-dark">
            See Flights
        </a>
    </header>
    </>
  );
}

// this comp for the plane flight indicator,
// TODO wire up the status to the indicator plane
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

// this is primary object in loop
function Card(props) {
  // var to create class and use for event handler for accordion.
  const toggleID = props.toggleID
  
  const expandCard = (e) =>{
    //if i wanted only 1 card open
    // const cards = document.querySelectorAll('.ft-flight-card')
    // cards.forEach((card)=>{card.classList.remove('active')})
    // toggle card visibiblty like accordion
    const card = document.querySelector(`#${toggleID}`);
    card.classList.toggle('active')
  }

  return(
    <li className="ft-flight-card" id={toggleID} onClick={expandCard}>                          
        <Header data={props.data} listType={props.type}/>
        <div className="ft-body">
            <BodyInfoBlock type="depart" 
                           data={props.data} 
                           listType={props.type} 
                           />
            <StatusIndicator />
            <BodyInfoBlock type="arrive" 
                           data={props.data} 
                           listType={props.type} 
                           />
        </div>
    </li>
  )
}

// primary widget component -> state lives here
class App extends Component {
  constructor(props) {
    super(props)
    // need this for unit test not to fail? need to dig deeper
    if(props){
      // kinda random sort for now on schedule gate time for arriving and departing
      props.arriveData.sort((a, b) => (a.arrive_info.scheduled_gate > b.arrive_info.scheduled_gate) ? 1 : -1);
      props.departData.sort((a, b) => (a.depart_info.scheduled_gate > b.depart_info.scheduled_gate) ? 1 : -1);
    
      this.state = {
        arrivingList: props.arriveData,
        departingList: props.departData,
        type: props.type
      };

    }

  }

  // function to sort state objecty by property
  sortData = (prevState, kind, sortProperty) =>{
    const flightData = kind === "arrive" ? prevState.arrivingList : prevState.departingList
    return flightData.sort((a, b) => (a[sortProperty] > b[sortProperty]) ? 1 : -1)
  }

  // this handles the clicks on the sort nav and just updates the state
  handleSortClick = (e) =>{
    const sortProperty = e.target.id
    // turn all elements off  and turn the current one on.
    document.querySelectorAll(`nav a.active`).forEach((element)=>{
      element.classList.remove('active')
    })
    document.querySelector(`nav #${sortProperty}`).classList.add('active')

    // set the state to update the dom
    this.setState(
      (prevState) => ({ arrivingList: this.sortData(prevState, 'arrive', sortProperty),
                        departingList: this.sortData(prevState, 'depart', sortProperty) }),
      () => console.log(this.state)
    );

  }

  render() {
    const type = this.state.type 
    // var for css class to toggle styles based on type 
    const typeClass = type === 'arrive' ? 'arrivals' : 'departures';
    // we toggle if we are looking at departing or arriving info based on prop
    const flights = type === 'arrive' ? this.state.arrivingList : this.state.departingList;

    return (
      <section className="container" id="primary">
          <article className="card-container" id={typeClass}>
              <div className="card" >
                  <div className="bg">

                    <WidgetHeader title={`${type}`} />

                    <SortNav handleSortClick={this.handleSortClick} />

                    <ul className="schedule-container">
                     {/* make sure we have data and map through it.*/}
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
