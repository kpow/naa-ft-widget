import React from 'react'

// quick nav i added for testng the sorts
function SortNav({handleSortClick}){
    return(
      <nav style={{marginLeft:'10px'}}>
        <a href="#" 
          onClick={ (e)=> handleSortClick('status',e) } 
          className="secondary-button button-dark">
            status
        </a>
        <a href="#" 
          onClick={(e)=> handleSortClick('f_id',e) } 
          className="secondary-button button-dark">
            airline
        </a>
        <a href="#" 
          onClick={ (e)=> handleSortClick('remote_city',e) } 
          className="secondary-button button-dark">
            city
        </a>
    </nav>
    )
  
  }

  export default SortNav