import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Form, Button, Message, Icon } from 'semantic-ui-react';

import * as selectors from 'selectors';
import { createMarkEmailRequest } from 'actions';
import OpenEmail from 'components/open-email';

import dateUtils from 'utils/date';

class MailContent extends Component {
  state = {
    openEmail: false,
    selectedEmails: []
  };

  closeEmailModal = () => {
    this.setState({ openEmail: false });
  };

  handleEmailClick = emailId => {
    const email = this.props.emails.find(email => email.id === emailId);
    this.setState({ email: email, openEmail: true });
    this.props.createMarkEmailRequest([emailId], 'read');
    this.resetSelection();
  };

  handleSelectEmail = (e, obj) => {
    e.stopPropagation();

    if (obj.checked === undefined) {
      return;
    }

    if (obj.checked) {
      if (!this.state.selectedEmails.includes(obj.value)) {
        this.setState({
          selectedEmails: [obj.value, ...this.state.selectedEmails]
        });
      }
    } else {
      if (this.state.selectedEmails.includes(obj.value)) {
        this.setState({
          selectedEmails: this.state.selectedEmails.filter(v => v !== obj.value)
        });
      }
    }
  };

  markEmailsAsDelete = () => {
    this.props.createMarkEmailRequest(this.state.selectedEmails, 'trash');
    this.resetSelection();
  };

  markEmailsAsRead = () => {
    this.props.createMarkEmailRequest(this.state.selectedEmails, 'read');
    this.resetSelection();
  };

  markEmailsAsUnread = () => {
    this.props.createMarkEmailRequest(this.state.selectedEmails, 'unread');
    this.resetSelection();
  };

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.resetSelection();
    }
  }

  resetSelection = () => {
    this.setState({ selectedEmails: [] });
  };

  render() {
    let content;

    if (!this.props.emails.length) {
      content = (
        <Message info>
          <p>No emails found!</p>
        </Message>
      );
    } else {
      content = this.props.emails.map(email => {
        let classNames = 'row-mail-item';
        classNames += ' ' + (email.unread ? 'unread' : '');
        const checked = this.state.selectedEmails.includes(email.id);
        return (
          <Grid.Row
            verticalAlign="middle"
            key={email.id + this.props.filter}
            onClick={() => this.handleEmailClick(email.id)}
            className={classNames}
          >
            <Grid.Column width={1}>
              <Form.Checkbox
                checked={checked}
                value={email.id}
                onClick={this.handleSelectEmail}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              {email.from.firstName} {email.from.lastName}
            </Grid.Column>
            <Grid.Column width={4}>{email.subject}</Grid.Column>
            <Grid.Column width={4}>
              {dateUtils.format(email.creationTime, 'MM/DD/YYYY HH:MM')}
            </Grid.Column>
          </Grid.Row>
        );
      });
    }
    return (
      <>
        <OpenEmail
          open={this.state.openEmail}
          onClose={this.closeEmailModal}
          email={this.state.email}
        />
        <Grid divided="vertically">
          <Grid.Column width={16}>
            {this.props.filter !== 'trash' && (
              <Button
                icon
                onClick={this.markEmailsAsDelete}
                disabled={!Boolean(this.state.selectedEmails.length)}
                labelPosition="left"
              >
                <Icon name="trash" />
                Move to Trash
              </Button>
            )}
            <Button
              icon
              onClick={this.markEmailsAsRead}
              disabled={!Boolean(this.state.selectedEmails.length)}
              labelPosition="left"
            >
              <Icon name="envelope outline" />
              Mark as Read
            </Button>
            <Button
              icon
              onClick={this.markEmailsAsUnread}
              disabled={!Boolean(this.state.selectedEmails.length)}
              labelPosition="left"
            >
              <Icon name="envelope open outline" />
              Mark as Unread
            </Button>
          </Grid.Column>
          {content}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const filter = props.match.params.filter || 'inbox';
  return {
    filter: filter,
    emails: selectors.selectEmails(state, filter)
  };
};

const mapDispatchToProps = {
  createMarkEmailRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MailContent);
