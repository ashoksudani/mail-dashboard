import React, { Component } from 'react';
import { Grid, Menu, Input, Icon } from 'semantic-ui-react';

class MailSidebar extends Component {
  state = {};
  render() {
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
          <Grid.Column mobile={14} tablet={14}>
            <Input className="icon" icon="search" placeholder="Search..." />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default MailSidebar;
