import React, {Component} from 'react'
// all sorts of bad things going on in here
class SortNav extends Component{
  state = {
    statusActive: false,
    airlineActive: false,
    cityActive: false
  }  

  handleClick(type){

    this.setState( () => ({ statusActive: false, airlineActive: false, cityActive: false }) );

    switch(type){
      case ('status') :
        this.setState( (prevState) => ({ statusActive: !prevState.statusActive }) );
      break;
      case ('f_id') :
        this.setState( (prevState) => ({ airlineActive: !prevState.airlineActive }) );
      break;
      case ('remote_city') :
        this.setState( (prevState) => ({ cityActive: !prevState.cityActive }) );
      break;
      default:  
    }
    
  }

  render(){
    const {handleSortClick} = this.props
    return(
        <nav style={{marginLeft:'10px'}}>
          <a href="#"
            onClick={ (e)=> { this.handleClick('status'); handleSortClick('status',e) } } 
            className={`secondary-button button-dark ${this.state.statusActive ? "active" : ""}`}>
              status
          </a>
          <a href="#"
            onClick={(e)=> {this.handleClick('f_id'); handleSortClick('f_id',e)} } 
            className={`secondary-button button-dark ${this.state.airlineActive ? "active" : ""}`}>
              airline
          </a>
          <a href="#" 
            onClick={ (e)=> {this.handleClick('remote_city'); handleSortClick('remote_city',e)} } 
            className={`secondary-button button-dark ${this.state.cityActive ? "active" : ""}`}>
              city
          </a>
      </nav>
      )
  }
  }

  export default SortNav