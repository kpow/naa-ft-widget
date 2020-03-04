import React, { Component } from 'react'
import BodyInfoBlock from './BodyInfoBlock'
import Header from './Header'

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

class Card extends Component {
    state = { 
      isActive: false
    }
  
    handleExpandCard = () =>{
      this.setState( (prevState) => ({ isActive: !prevState.isActive }) );
    }
  
    render(){
    const {data, listType} = this.props;
   
    return(
      <li className={`ft-flight-card ${this.state.isActive ? "active" : ""}`} onClick={this.handleExpandCard}>                          
          <Header data={data} listType={listType}/>
          <div className="ft-body">
              <BodyInfoBlock type="depart" 
                             data={data} 
                             listType={listType} 
                             />
              <StatusIndicator />
              <BodyInfoBlock type="arrive" 
                             data={data} 
                             listType={listType} 
                             />
          </div>
      </li>
    )
    }
  }

  export default Card