import React, { Component } from 'react';
import { Sidebar } from 'semantic-ui-react';

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
      <Sidebar.Pushable>
        <DashboardSidebar expandSidebar={this.state.expandSidebar} />
        <Sidebar.Pusher>
          <MailDashboard toggleSidebar={this.toggleSidebar} />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default DashBoard;
