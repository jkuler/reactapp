import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axxios-order';

import Input  from '../../../components/UI/Input/Input';

class ContactData extends Component {
   state = {
       orderForm: {
        
                
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP CODE'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },

                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: ''
                },
       },
       loading: false
   }
   orderHandler = (event) => {
       event.preventDefault();

       this.setState({loading: true});
       const formData = {};

       for(let formElementIdentifier in this.state.orderForm){
           formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
       }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
            
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
   validationCheck = (value, rules) => {
            let isValid = true;

            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid
            }
            if (rules.maxLength) {
                isValid = value.length <= rules.maxLength && isValid
            }

            return isValid;
   }

   inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormObject =  {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormObject.value = event.target.value;
        updatedFormObject.valid = this.validationCheck(updatedFormObject.value, updatedFormObject.validation)
        
        updatedOrderForm[inputIdentifier] = updatedFormObject;
        console.log(updatedFormObject)
        this.setState({orderForm: updatedOrderForm})
   }

    render(){
        const formElementsArray = [];
        for ( let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                 { formElementsArray.map((formElement, k) => {
                     return (
                     <Input 
                        key={k}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={ (event) => this.inputChangedHandler(event, formElement.id)} />
                 )})
                 }
                <Button btnType="Success">ORDER</Button>
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