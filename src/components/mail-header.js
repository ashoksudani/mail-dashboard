import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Menu, Input, Icon, Button, Label } from 'semantic-ui-react';

import { createLogoutRequest } from 'actions';
import * as selectors from 'selectors';

class MailSidebar extends Component {
  handleLogout = () => {
    this.props.logoutRequest();
  };

  render() {
    const unreadEmails = this.props.emails.filter(email => email.unread);
    return (
      <Grid className="mail-header">
        <Grid.Row>
          <Grid.Column mobile={1} tablet={1}>
            <Menu icon compact>
              <Menu.Item name="sidebar" onClick={this.props.toggleSidebar}>
                <Icon name="sidebar" />
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column mobile={4} tablet={4}>
            <Input className="icon" icon="search" placeholder="Search..." />
          </Grid.Column>

          <Grid.Column mobile={11} tablet={11} textAlign="right">
            <Menu compact borderless className="md-border-less">
              <Menu.Item>
                <Label
                  size="medium"
                  basic
                  className="md-floating-container md-icon-only"
                >
                  <Icon name="envelope" size="large" />
                  <Label color="orange" size="mini" floating>
                    {unreadEmails.length}
                  </Label>
                </Label>
              </Menu.Item>
              <Menu.Item>
                <Button
                  icon
                  basic
                  labelPosition="left"
                  onClick={this.handleLogout}
                >
                  <Icon name="sign-out" />
                  Logout
                </Button>
              </Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    emails: selectors.selectEmails(state, 'inbox')
  };
};

const mapDispatchToProps = {
  logoutRequest: createLogoutRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MailSidebar);
