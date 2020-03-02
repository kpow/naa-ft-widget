// object of helper functions for formating display items
const flightValues = {
    getAirportValue: (flighData, listType, type) =>{
      let airportName
      if(listType === type){
        airportName = "Norfolk VA, ORF"
      }else{
        airportName = `${flighData.remote_city} ${flighData.remote_airport}`
      }
      return airportName
   },  
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

  export default flightValues