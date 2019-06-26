
import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/Ordersummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axxios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    // constructor(props){
    //    super(props);

    //    this.state = {...}
    // }

    state = {

        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false

    }
    componentDidMount(){
        console.log(this.props);
        axios.get('https://reactstart-d077d.firebaseio.com/ingredients.json')
             .then(res => {
                 this.setState({ ingredients: res.data});
             })
             .catch(err => {
                this.setState({error: true })
             })
    }

    updatePurchaseState(ingredients){
        // const ingredients = {
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
       const oldCount = this.state.ingredients[type];
       const updateCount = oldCount + 1
       const updatedIngredients = {
           ...this.state.ingredients
       }
       updatedIngredients[type] = updateCount;
       const priceAddition = INGREDIENT_PRICES[type];

       const oldPrice = this.state.totalPrice;
       const newPrice = oldPrice + priceAddition;

       this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
       this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updateCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
 
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
 
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHanlder = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        // alert("You continue!");
        // this.setState({loading: true});
        // const order = {
        //     ingrediens: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer : {
        //         name: 'josue',
        //         address: {
        //             street: ' the street',
        //             zipCode: '4152',
        //             country: 'Germany'
        //         },
        //         email: 'email@test.com'

        //     },
        //     deliveryMethod: 'express'
        // }
        // axios.post('/orders.json', order)
        //      .then(res => {
        //          this.setState({loading: false, purchasing: false })
        //      })
        //      .catch(err => {
        //          this.setState({loading: false, purchasing: false })
        //      });
        this.props.history.push("/checkout")
    }
 
    render(){
        const disableInfo = {
            ...this.state.ingredients
        }
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.state.ingredients) {
             burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                        
                </Aux>
                    );
                        orderSummary =  <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHanlder}
                        purchaseContinued={this.purchaseContinueHandler} />
                
        }

         if (this.state.loading) {
              orderSummary = <Spinner />
        }
       
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHanlder}>
                   {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        )
    }
}


export default withErrorHandler(BurgerBuilder, axios)