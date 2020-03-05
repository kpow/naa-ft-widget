import React, { Component } from 'react'
import Card from './components/Card'
import SortNav from './components/SortNav'
import { Provider } from './context';
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

class App extends Component {
    // wonky condition to pass unit test
    state = this.props ? {
      flightList : this.props.flightData,
      type: this.props.type
    } : {}
 

  componentDidMount(){
   if(this.state.type === "arrive"){
    this.setState((prevState) => 
    ({ flightList: prevState.flightList.sort((a, b) => (a.arrive_info.scheduled_gate > b.arrive_info.scheduled_gate) ? 1 : -1) }));
   }else{
    this.setState((prevState) => 
    ({ flightList: prevState.flightList.sort((a, b) => (a.depart_info.scheduled_gate > b.depart_info.scheduled_gate) ? 1 : -1) }));
   }
    
  }

  sortData = (prevState, sortProperty) =>{
    return prevState.flightList.sort((a, b) => (a[sortProperty] > b[sortProperty]) ? 1 : -1)
  }

  handleSortClick = (sortProperty, e) =>{
    this.setState(
      (prevState) => ({ flightList: this.sortData(prevState, sortProperty) }));
  }

  render() {
    const listType = this.state.type 
    const typeClass = listType === 'arrive' ? 'arrivals' : 'departures';
    const flights =  this.state.flightList

    return (
      <Provider value={{flights:this.state.flightList, listType:this.state.listType}}>
        <section className="container" id="primary">
            <article className="card-container" id={typeClass}>
                <div className="card" >
                    <div className="bg">

                      <WidgetHeader title={`${listType}`} />

                      <SortNav handleSortClick={this.handleSortClick} />

                      <ul className="schedule-container">
                        {flights &&
                          flights.map((flight, index) => (
                            <Card index={index}
                                  key={"id-"+index}   
                            />                      
                          ))}
                        
                      </ul>
                    </div>
                </div>
            </article>
        </section>
      </Provider>
    )
  }
}

export default App
