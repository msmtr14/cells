import React, { Component } from 'react';

import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid,resetFields} from '../../utils/Form/formActions';

import { connect } from 'react-redux';
import { getBodies, addBody } from '../../../actions/products_actions';

class ManageBodies extends Component {

    state = {
        formError:false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter the body'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
        }
    }

    showCategoryItems = () => (
        this.props.products.bodies ?
            this.props.products.bodies.map((item,i)=>(
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            ))
        :null
    )

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'bodies');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    }

    resetFieldsHandler = () =>{
        const newFormData = resetFields(this.state.formdata,'bodies');

        this.setState({
            formdata: newFormData,
            formSuccess:true
        });
    }

    submitForm= (event) =>{
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata,'bodies');
        let formIsValid = isFormValid(this.state.formdata,'bodies')
        let existingBodies = this.props.products.bodies;

        if(formIsValid){
            this.props.dispatch(addBody(dataToSubmit,existingBodies)).then(response=>{
                if(response.payload.success){
                    this.resetFieldsHandler();
                }else{
                    this.setState({formError:true})
                }
            })
        } else {
            this.setState({
                formError: true
            })
        }
    }


    componentDidMount(){
        this.props.dispatch(getBodies());
    }


    render() {
        return (
            <div className="admin_category_wrapper">
            <h1>Bodies</h1>
            <div className="admin_two_column">
                <div className="left">
                    <div className="brands_container">
                        {this.showCategoryItems()}
                    </div>
                </div>
                <div className="right">
                    
                <form onSubmit={(event)=> this.submitForm(event)}>

                     <FormField
                        id={'name'}
                        formdata={this.state.formdata.name}
                        change={(element) => this.updateForm(element)}
                    />


                    {this.state.formError ?
                        <div className="error_label">
                            Please check your data
                        </div>
                        : null}
                    <button onClick={(event) => this.submitForm(event)}>
                        Add Body
                    </button>

                </form>

                </div>

            </div>
        </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}


export default connect(mapStateToProps)(ManageBodies);
