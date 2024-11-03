import React from 'react'
import '../styles/filteration.css'
import PropTypes  from 'prop-types'
function Filteration({products}) {
  return (
    <div className="filteration">
        <p>Filters</p>
        <div className="filterOption">
            <input type="checkbox" name='men'/>
            <label htmlFor='men'>Men</label>
            <input type="checkbox" name='women'/>
            <label htmlFor='women'>Women</label>
            <input type="checkbox" name='kids'/>
            <label htmlFor='kids'>Kids</label>
        </div>
    </div>
  )
}
Filteration.propTypes={
    products:PropTypes.array.isRequired
}
export default Filteration