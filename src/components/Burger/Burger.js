import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {

    let transformIngredients = Object.keys(props.ingredients)
      .map(ingredKey => {
          return [...Array(props.ingredients[ingredKey])].map((_, i) => {
              return <BurgerIngredient key={ingredKey + i } type={ingredKey} />;
          }) 
      })
      .reduce((arr, el) => {
          return arr.concat(el)
      }, []);
    if (transformIngredients.length === 0){
      transformIngredients = <p> Please start adding ingredients</p>
    }
    return (
      <div className={classes.Burger}>
          <BurgerIngredient type="bread-top" />
           {transformIngredients}
          <BurgerIngredient type="bread-bottom" />
      </div>
    );
}

export default burger;