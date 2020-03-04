import React, { Component } from 'react'
import Card from './components/Card'
import SortNav from './components/SortNav'
import './css/App.scss'

// this is the comp for the main header over the listing.
function WidgetHeader({title}) { 
  return (
    <>
    <header>
        <h3>{title}</h3>
        <a href="#" className="primary-button button-dark">
            See Flights
        </a>
    </header>
    </>
  );
}

// primary widget component -> app state lives here
class App extends Component {

  state = {
    arrivingList: this.props.arriveData,
    departingList: this.props.departData,
    type: this.props.type
  };

  componentDidMount(){
    this.setState((prevState) => 
      ({ arrivingList: prevState.arrivingList.sort((a, b) => (a.arrive_info.scheduled_gate > b.arrive_info.scheduled_gate) ? 1 : -1),
         departingList: prevState.departingList.sort((a, b) => (a.arrive_info.scheduled_gate > b.arrive_info.scheduled_gate) ? 1 : -1) }));
  }

  sortData = (prevState, kind, sortProperty) =>{
    const flightData = kind === "arrive" ? prevState.arrivingList : prevState.departingList
    return flightData.sort((a, b) => (a[sortProperty] > b[sortProperty]) ? 1 : -1)
  }

  handleSortClick = (sortProperty, e) =>{
    // set the state to update the dom
    this.setState(
      (prevState) => ({ arrivingList: this.sortData(prevState, 'arrive', sortProperty),
                        departingList: this.sortData(prevState, 'depart', sortProperty) }));
  }

  render() {
    const listType = this.state.type 
    // var for css class to toggle styles based on type 
    const typeClass = listType === 'arrive' ? 'arrivals' : 'departures';
    // we toggle if we are looking at departing or arriving info based on prop
    const flights = listType === 'arrive' ? this.state.arrivingList : this.state.departingList;

    return (
      <section className="container" id="primary">
          <article className="card-container" id={typeClass}>
              <div className="card" >
                  <div className="bg">

                    <WidgetHeader title={`${listType}`} />

                    <SortNav handleSortClick={this.handleSortClick} />

                    <ul className="schedule-container">
                     {/* make sure we have data and map through it.*/}
                      {flights &&
                        flights.map((flight, index) => (
                          <Card data={flight} 
                                key={"id-"+index} 
                                listType={listType}      
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
