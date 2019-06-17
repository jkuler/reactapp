import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuilControl/BuildControl';

const controls = [
    {label : 'Salad', type: 'salad' },
    {label : 'Balad', type: 'balad' },
    {label : 'Cheese', type: 'cheese' },
    {label : 'Meat', type: 'meat' }

]

const builControls = (props) => (
    <div className={classes.BuilControls}>
      {controls.map(ctrl =>(
          <BuildControl key={ctrl.label} label={ctrl.label} />
      ))}
    </div>
);

export default builControls