import React, { Component } from 'react';
import { Accordion, Menu, Sidebar, Item, Icon } from 'semantic-ui-react';

class DashboardSidebar extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    this.setState({
      activeIndex: this.state.activeIndex === index ? -1 : index
    });
  };

  render() {
    const { activeIndex } = this.state;
    const isExpanded = this.props.expandSidebar;
    const width = isExpanded ? 'md-wide' : 'md-thin';

    let dashboardMenuItem;
    let mailMenuItem;

    if (!isExpanded) {
      dashboardMenuItem = (
        <Menu.Item
          name="th large"
          active={activeIndex === 0}
          onClick={this.handleClick}
        >
          <Icon name="th large" />
        </Menu.Item>
      );
      mailMenuItem = (
        <Menu.Item
          name="mail"
          active={activeIndex === 1}
          onClick={this.handleClick}
        >
          <Icon name="mail" />
        </Menu.Item>
      );
    } else {
      const dashboardsLinks = (
        <>
          <Item content="Dashboard 1" />
          <Item content="Dashboard 2" />
        </>
      );
      const mailDashboardLinks = (
        <>
          <Item content="Inbox" />
          <Item content="Email View" />
          <Item content="Email templates" />
        </>
      );
      dashboardMenuItem = (
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 0}
            content="Dashboards"
            index={0}
            onClick={this.handleClick}
          />
          <Accordion.Content
            active={activeIndex === 0}
            content={dashboardsLinks}
          />
        </Menu.Item>
      );
      mailMenuItem = (
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 1}
            content="Mailbox"
            index={1}
            onClick={this.handleClick}
          />
          <Accordion.Content
            active={activeIndex === 1}
            content={mailDashboardLinks}
          />
        </Menu.Item>
      );
    }

    return (
      <Sidebar
        animation="push"
        className={`${width} dashboard-sidebar`}
        visible
      >
        <Accordion
          as={Menu}
          vertical
          fluid
          icon={!isExpanded ? 'labeled' : false}
        >
          {dashboardMenuItem}
          {mailMenuItem}
        </Accordion>
      </Sidebar>
    );
  }
}

export default DashboardSidebar;
