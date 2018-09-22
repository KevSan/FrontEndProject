import React, { Component } from 'react';
import List from '@material-ui/core/List';
import axios from 'axios';
import './DisplayData.css';


function ThisTrue(props){
  return(
    <p> True</p>
  );
}


function FormSubmit(props){
  var formHasBeenSubmitted = props.submitted;
  
  if(formHasBeenSubmitted){
    return(<div>
    <h1 className="title">Input Data:</h1>

    <List>{Object.keys(props.subForm).map((item, i) => (
      <p>
        <span>
          <strong>{item}: </strong>
          {props.subForm[item]}
        </span>
      </p>))}
    </List>
    <p></p>
  </div>);
  }
  return <div></div>;
}


class DisplayData extends Component {

  constructor() {
    super();
    this.state = {
      submittedForm: {},
      submitted: false
    };
  }

  validate = () => {
    let isError = false;

    if(this.props.formId === ''){
      isError = true;
    }

    return isError; 
  }


  componentDidUpdate(){

    const err = this.validate();
    if(!err){
      axios.post('http://localhost:3002/recentlyInsertedForm', 
        {"id": this.props.formId})
          .then(res => {
            if(this.state.submittedForm.id != res.data[0].id){
              this.setState({submittedForm: res.data[0], submitted: true});
            }
          })
    }
  }


  render() {

    return (
      <FormSubmit submitted={this.state.submitted} subForm={this.state.submittedForm}/>
    );
  }
}

export default DisplayData;
