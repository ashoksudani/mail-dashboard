import React, { Component } from 'react';
import { Grid, Message } from 'semantic-ui-react';
import { createClearMessages } from 'actions';
import { connect } from 'react-redux';

class MessageSnackbar extends Component {
  state = {
    visible: true
  };

  timeoutId = null;
  hideInterval = 5000;

  setHideTimeout = () => {
    this.timeoutId = setTimeout(() => {
      this.setState({ visible: false });
      this.props.createClearMessages();
    }, this.hideInterval);
  };

  clearTimeoutInterval = () => {
    clearTimeout(this.timeoutId);
  };

  componentWillUnmount() {
    this.clearTimeoutInterval();
  }

  render() {
    this.clearTimeoutInterval();

    if (!this.state.visible) {
      return null;
    }

    const errorMessage = this.props.errorMessage.filter(m => m);
    const successMessage = this.props.successMessage.filter(m => m);
    let successMessageList;
    let errorMessageList;

    if (successMessage.length) {
      successMessageList = <Message list={successMessage} positive />;
    }
    if (errorMessage.length) {
      errorMessageList = <Message list={errorMessage} error />;
    }

    if (!successMessageList && !errorMessageList) {
      return null;
    }

    this.setHideTimeout();

    return (
      <Grid.Row>
        <Grid.Column width={10}>
          {successMessageList} {errorMessageList}
        </Grid.Column>
      </Grid.Row>
    );
  }
}

const mapDispatchToProps = {
  createClearMessages
};

export default connect(
  null,
  mapDispatchToProps
)(MessageSnackbar);
