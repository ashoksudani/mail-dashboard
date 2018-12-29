import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Loader, Message } from 'semantic-ui-react';

import MailHeader from 'components/mail-header';
import MailSidebar from 'components/mail-sidebar';
import MailContent from 'components/mail-content';

import { createMailAggregateRequest } from 'actions';
import * as selectors from 'selectors';

const actionsErrorSelector = selectors.createErrorSelector([
  'MAIL_AGGREGATE',
  'SEND_EMAIL'
]);
const actionsIsLoadingSelector = selectors.createLoadingSelector([
  'MAIL_AGGREGATE',
  'SEND_EMAIL'
]);

class MailDashBoard extends Component {
  componentDidMount() {
    this.props.createMailAggregateRequest(this.props.profile.user);
  }

  render() {
    const { isLoading, errorMessage } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    return (
      <Container fluid className="main-dashboard full-vh">
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <MailHeader toggleSidebar={this.props.toggleSidebar} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="mail-inbox">
            <Grid.Column width={4}>
              <MailSidebar />
            </Grid.Column>
            <Grid.Column width={12}>
              {errorMessage.map(
                (error, i) => error && <Message key={i} error content={error} />
              )}
              <MailContent />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    profile: selectors.selectProfile(state),
    isLoading: actionsIsLoadingSelector(state),
    errorMessage: actionsErrorSelector(state)
  };
};

const mapDispatchToProps = {
  createMailAggregateRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MailDashBoard);
