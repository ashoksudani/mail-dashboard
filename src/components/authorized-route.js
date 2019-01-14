import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import * as selectors from 'selectors';

export class AuthorizedRoute extends Component {
  render() {
    const { component: Component, profile, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (profile.isAuthenticated) {
            return <Component {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    profile: selectors.selectProfile(state)
  };
};

export default connect(mapStateToProps)(AuthorizedRoute);
