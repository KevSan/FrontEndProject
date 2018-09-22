import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import './Companies.css';


class Companies extends Component {
  constructor() {
    super();
    this.state = {
      company: [],
      companies: [],
      salary: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3002/listOfCompanies')
      .then(res => {
        this.setState({company: res.data, companies: res.data.sort()})
      })
  }

  handleChange(event) {
    this.setState({ company: event.target.value });
    
    var companyStr = event.target.value.toString()
    axios.post('http://localhost:3002/companySalaryBudget', {"company": companyStr})
      .then(res => {
        this.setState({salary: res.data})
        console.log("Salary Test:", this.state.salary)
      })
  }


  render() {
    return (
      <div>
        <p>Select a company to calculate their cost:</p>
        <FormControl>
          <InputLabel htmlFor="select-company">Companies</InputLabel>
          <Select
            value={this.state.company}
            onChange={this.handleChange}
            input={<Input id="selectCompany" />}
            className="select-box"
          >
            {this.state.companies.map(company => (
              <MenuItem key={company} value={company}>
                {company}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <p className="company-cost">Company cost:</p>
        <p className="company-cost">${this.state.salary}</p>
      </div>
    );
  }
}

export default Companies;
