import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Label, Icon, Button } from 'semantic-ui-react';

import ComposeEmail from 'components/compose-email';
import { createSendEmailRequest } from 'actions';
import * as selectors from 'selectors';

class MailSidebar extends Component {
  state = {
    openModel: false,
    activeItem: this.props.filter
  };

  openComposeEmail = () => {
    this.setState({ openModel: true });
  };

  closeComposeEmail = () => {
    this.setState({ openModel: false });
  };

  sendEmail = email => {
    this.props.createSendEmailRequest(email);
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.history.push('/mail/' + name);
  };

  render() {
    const { activeItem } = this.state;
    return (
      <>
        <Button color="teal" fluid onClick={this.openComposeEmail}>
          Comoose Mail
        </Button>
        <ComposeEmail
          open={this.state.openModel}
          onClose={this.closeComposeEmail}
          onSendEmail={this.sendEmail}
        />
        <Menu vertical secondary fluid>
          <Menu.Item header>FOLDERS</Menu.Item>
          <Menu.Item
            name="inbox"
            active={activeItem === 'inbox'}
            onClick={this.handleItemClick}
          >
            <Label color="orange">{this.props.inboxEmails.length}</Label>
            <Icon name="inbox" />
            Inbox
          </Menu.Item>

          <Menu.Item
            name="sent"
            active={activeItem === 'sent'}
            onClick={this.handleItemClick}
          >
            <Label color="teal">{this.props.sentEmails.length}</Label>
            <Icon name="mail" />
            Sent Mail
          </Menu.Item>

          <Menu.Item
            name="trash"
            active={activeItem === 'trash'}
            onClick={this.handleItemClick}
          >
            <Label color="red">{this.props.trashEmails.length}</Label>
            <Icon name="trash" />
            Trash
          </Menu.Item>
        </Menu>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const filter = props.match.params.filter || 'inbox';
  return {
    filter: filter,
    inboxEmails: selectors.selectEmails(state, 'inbox'),
    sentEmails: selectors.selectEmails(state, 'sent'),
    trashEmails: selectors.selectEmails(state, 'trash')
  };
};

const mapDispatchToProps = {
  createSendEmailRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MailSidebar);
