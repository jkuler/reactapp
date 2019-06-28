
import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
// Redux imports
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions'

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/Ordersummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axxios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'



class BurgerBuilder extends Component {

    // constructor(props){
    //    super(props);

    //    this.state = {...}
    // }

    state = {

        purchasable: false,
        purchasing: false,
        loading: false,
        error: false

    }
    componentDidMount(){
        console.log(this.props);
        // axios.get('https://reactstart-d077d.firebaseio.com/ingredients.json') we'll be back
        //      .then(res => {
        //          this.setState({ ingredients: res.data});
        //      })
        //      .catch(err => {
        //         this.setState({error: true })
        //      })
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

  

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHanlder = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        // alert("You continue!");
        
        const queryParams = []
        for (let e in this.state.ingredients){
            queryParams.push(encodeURIComponent(e) + '=' + encodeURIComponent(this.state.ingredients[e]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: "/checkout",
            search: '?' + queryString
        })
    }
 
    render(){
        const disableInfo = {
            ...this.props.ings
        }
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.props.ings) {
             burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemove}
                        disabled={disableInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                        
                </Aux>
                    );
                        orderSummary =  <OrderSummary 
                        ingredients={this.props.ings}
                        price={this.props.price}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemove: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));