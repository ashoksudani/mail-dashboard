import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react';

import { createLoginRequest } from 'actions';
import * as selectors from 'selectors';

const loginErrorSelector = selectors.createErrorSelector('LOGIN');
const loginIsLoadingSelector = selectors.createLoadingSelector('LOGIN');

export class Login extends Component {
  state = {
    form: {
      emailId: '',
      password: ''
    },
    error: {}
  };

  onFieldChange = event => {
    var target = event.target.name;
    var value = event.target.value;

    this.setErrorFor(value, target);
    this.setState(state => {
      state.form[target] = value;
      return state;
    });
  };

  setErrorFor(value, target) {
    this.setState(state => {
      state.error[target] = !Boolean(value);
      return state;
    });
  }

  onFormSubmit = () => {
    let foundError = false;
    const emailId = this.state.form['emailId'];
    const password = this.state.form['password'];

    if (!emailId) {
      this.setErrorFor(emailId, 'emailId');
      foundError = true;
    }

    if (!password) {
      this.setErrorFor(password, 'password');
      foundError = true;
    }

    if (!foundError) {
      this.props.createLoginRequest({ emailId: emailId, password: password });
    }
  };

  shoMessage = () => {
    return Object.keys(this.state.error).some(k => this.state.error[k]);
  };

  render() {
    if (this.props.profile.isAuthenticated) {
      return <Redirect to="/mail" />;
    }

    const showMessage = this.shoMessage();
    const { isLoading, errorMessage } = this.props;

    return (
      <div className="login-form">
        <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          centered
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Header.Content>Log-in to Mailbox</Header.Content>
            </Header>

            {showMessage && (
              <Message error content="Please fill all required fields." />
            )}
            {errorMessage[0] && <Message error content={errorMessage[0]} />}

            <Form size="large" onSubmit={this.onFormSubmit} loading={isLoading}>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="emailId"
                value={this.state.form.emailId}
                error={this.state.error.emailId}
                onChange={this.onFieldChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.form.password}
                error={this.state.error.password}
                onChange={this.onFieldChange}
              />

              <Button color="teal" fluid size="large" type="submit">
                Login
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    profile: selectors.selectProfile(state),
    isLoading: loginIsLoadingSelector(state),
    errorMessage: loginErrorSelector(state)
  };
};

const mapDispatchToProps = {
  createLoginRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
