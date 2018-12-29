import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Label, Icon, Button } from 'semantic-ui-react';

import ComposeEmail from 'components/compose-email';
import { createSendEmailRequest } from 'actions';

class MailSidebar extends Component {
  state = {
    openModel: false,
    activeItem: 'inbox'
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

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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
            <Label color="teal">0</Label>
            <Icon name="inbox" />
            Inbox
          </Menu.Item>

          <Menu.Item
            name="sent"
            active={activeItem === 'sent'}
            onClick={this.handleItemClick}
          >
            <Label>0</Label>
            <Icon name="mail" />
            Sent Mail
          </Menu.Item>

          <Menu.Item
            name="trash"
            active={activeItem === 'trash'}
            onClick={this.handleItemClick}
          >
            <Label>0</Label>
            <Icon name="trash" />
            Trash
          </Menu.Item>
        </Menu>
      </>
    );
  }
}

const mapDispatchToProps = {
  createSendEmailRequest
};

export default connect(
  null,
  mapDispatchToProps
)(MailSidebar);
