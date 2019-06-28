import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary';

import {Route} from 'react-router-dom';
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
        return (
            <div>
                <CheckoutSummary
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinueHandler}
                ingredients={this.props.ings} />
                                                            {/* {component={ ContactData } } */}
                <Route path={this.props.match.path + '/contact-data' } 
                        component={ContactData}  />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}
// while using mapstateToDispatch (null, mapstateToDispatch)
export default connect(mapStateToProps)(Checkout);