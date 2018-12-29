import React, { Component } from 'react';
import { Grid, Sidebar } from 'semantic-ui-react';

import DashboardSidebar from 'components/dashboard-sidebar';
import MailDashboard from 'components/mail-dashboard';

class DashBoard extends Component {
  state = {
    expandSidebar: false
  };
  toggleSidebar = () => {
    this.setState({ expandSidebar: !this.state.expandSidebar });
  };
  render() {
    return (
      <Grid className="root-grid full-vh">
        <Grid.Row>
          <Grid.Column>
            <Sidebar.Pushable>
              <DashboardSidebar expandSidebar={this.state.expandSidebar} />
              <Sidebar.Pusher>
                <MailDashboard toggleSidebar={this.toggleSidebar} />
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default DashBoard;
