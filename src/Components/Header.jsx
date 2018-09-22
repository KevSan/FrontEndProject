import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './Header.css';

class Header extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <header className="header">
          <h1 className="header-title">FE Exercise</h1>
          <div className="button-container">
            <Link to="/form">
              <Button variant="contained" className="form-button">
                Form
              </Button>
            </Link>
            <Link to="/companies">
              <Button variant="contained" className="companies-button">
                Companies
              </Button>
            </Link>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
