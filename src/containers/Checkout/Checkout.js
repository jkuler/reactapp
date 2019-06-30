import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary';

import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
// redux import

import { connect }  from 'react-redux';

class Checkout extends Component {
  state = {
      ingredients : null,
      price: 0
  }
 

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

    render(){

      let summary = <Redirect to="/" />
      if (this.props.ings) {
        summary = (
          <div>
          <CheckoutSummary
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinueHandler}
            ingredients={this.props.ings} />
          <Route path={this.props.match.path + '/contact-data' } 
                        component={ContactData}  />
          </div>
        
        )
      }
        return summary
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients
    }
}
// while using mapstateToDispatch (null, mapstateToDispatch)
export default connect(mapStateToProps)(Checkout);