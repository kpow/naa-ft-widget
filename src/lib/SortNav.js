import React from 'react'

// quick nav i added for testng the sorts
function SortNav(props){
    const handleSortClick = props.handleSortClick;
    return(
      <nav style={{marginLeft:'10px'}}>
        <a href="#" 
          onClick={handleSortClick}
          id="status" 
          className="secondary-button button-dark">
            status
        </a>
        <a href="#" 
          onClick={handleSortClick} 
          id="f_id"
          className="secondary-button button-dark">
            airline
        </a>
        <a href="#" 
          onClick={handleSortClick} 
          id="remote_city"
          className="secondary-button button-dark">
            city
        </a>
    </nav>
    )
  
  }

  export default SortNav