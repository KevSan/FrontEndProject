import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import DisplayData from './DisplayData';
import axios from 'axios';
import './Form.css';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      company: '',
      salary: '',
      salaryError: '', 
      id: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validate = () => {
    let isError = false;

    if(isNaN(Number(this.state.salary))){
      isError = true;
    }

    if(isError){
      this.setState({
        ...this.state,
        ...this.state.salary = ''
      })
    }

    return isError; 
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const err = this.validate();
    if (!err){
      axios.post('http://localhost:3002/insertEmployeeForm', 
        {"firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "address": this.state.address,
        "company": this.state.company,
        "salary": this.state.salary})
          .then(res => {
            this.setState({id: res.data})
            });

      this.setState({
        firstName: '',
        lastName: '',
        address: '',
        company: '',
        salary: ''
      })
    }

  }

  handleChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <FormControl>
              <InputLabel htmlFor="first-name">First Name</InputLabel>
              <Input
                required
                id="first-name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              <FormHelperText>Required*</FormHelperText>
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel htmlFor="last-name">Last Name</InputLabel>
              <Input
                required
                id="last-name"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
              <FormHelperText>Required*</FormHelperText>
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel htmlFor="address">Address</InputLabel>
              <Input
                id="address"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel htmlFor="company">Company</InputLabel>
              <Input
                required
                id="company"
                name="company"
                value={this.state.company}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormHelperText>Required*</FormHelperText>
          </div>
          <div>
            <FormControl>
              <InputLabel htmlFor="salary">Salary (USD)</InputLabel>
              <Input
                required
                id="salary"
                name="salary"
                value={this.state.salary}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormHelperText>Required: Number Only*</FormHelperText>
          </div>
          <div className="submit-button">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
        <div className="display-data">
          <DisplayData formId={this.state.id}/>
        </div>
      </div>
    );
  }
}

export default Form;
