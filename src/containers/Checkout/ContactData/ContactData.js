import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axxios-order';

class ContactData extends Component {
   state = {
       name: '',
       email: '',
       address: {
           street: '',
           postalCode: ''
       },
       loading: false
   }
   orderHandler = (event) => {
       event.preventDefault();

       this.setState({loading: true});
        const order = {
            ingrediens: this.props.ingredients,
            price: this.state.totalPrice,
            customer : {
                name: 'josue',
                address: {
                    street: ' the street',
                    zipCode: '4152',
                    country: 'Germany'
                },
                email: 'email@test.com'

            },
            deliveryMethod: 'express'
        }
        axios.post('/orders.json', order)
             .then(res => {
                 this.setState({loading: false });
                 this.props.history.push('/')

             })
             .catch(err => {
                 this.setState({loading: false })
             });
   }

    render(){
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name"  placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email"  placeholder="Your Email" />
                <input className={classes.Input} type="text" name="street"  placeholder="Street" />
                <input className={classes.Input} type="text" name="postal"  placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
             </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}
export default ContactData