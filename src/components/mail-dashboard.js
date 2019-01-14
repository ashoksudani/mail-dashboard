import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Loader } from 'semantic-ui-react';
import { Route } from 'react-router-dom';

import MailHeader from 'components/mail-header';
import MailSidebar from 'components/mail-sidebar';
import MailContent from 'components/mail-content';
import MessageSnackbar from 'components/message-snackbar';

import { createMailAggregateRequest } from 'actions';
import * as selectors from 'selectors';

const actionsErrorSelector = selectors.createErrorSelector([
  'MAIL_AGGREGATE',
  'SEND_EMAIL',
  'MARK_EMAIL'
]);
const actionsIsLoadingSelector = selectors.createLoadingSelector([
  'MAIL_AGGREGATE',
  'SEND_EMAIL'
]);
const actionsSuccessSelector = selectors.createSuccessSelector(['SEND_EMAIL']);

class MailDashBoard extends Component {
  componentDidMount() {
    this.props.createMailAggregateRequest(this.props.profile.user);
  }

  render() {
    let { isLoading, errorMessage, successMessage } = this.props;

    if (isLoading) {
      return <Loader active />;
    }

    return (
      <div className="full-vh mail-dashboard">
        <Grid padded stackable>
          <Grid.Row>
            <Grid.Column>
              <MailHeader toggleSidebar={this.props.toggleSidebar} />
            </Grid.Column>
          </Grid.Row>
          <MessageSnackbar
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
          <Grid.Row className="mail-inbox">
            <Grid.Column width={4}>
              <Route path="/mail/:filter?" component={MailSidebar} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={12} computer={12}>
              <Route path="/mail/:filter?" component={MailContent} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    profile: selectors.selectProfile(state),
    isLoading: actionsIsLoadingSelector(state),
    errorMessage: actionsErrorSelector(state),
    successMessage: actionsSuccessSelector(state)
  };
};

const mapDispatchToProps = {
  createMailAggregateRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MailDashBoard);
