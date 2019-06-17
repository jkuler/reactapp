import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuilControl/BuildControl';

const controls = [
    {label : 'Salad', type: 'salad' },
    {label : 'Bacon', type: 'bacon' },
    {label : 'Cheese', type: 'cheese' },
    {label : 'Meat', type: 'meat' }

]

const builControls = (props) => (
    <div className={classes.BuilControls}>
      {controls.map(ctrl =>(
          <BuildControl 
          key={ctrl.label} 
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)} 
          disabled={props.disabled[ctrl.type]} />
      ))}
    </div>
);

export default builControls