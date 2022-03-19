import React from 'react';
import "./DefinitionItem.css";
export default function DefinitionItem(props) {
  return (
    <>
    <div className="wrapper fadeInDown">
        <div className='definition'>
            <h3>{props.definition}</h3>
        </div>
        
    </div>
    </>
  );
}
