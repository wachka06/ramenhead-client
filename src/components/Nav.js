import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

class Nav extends Component {
  state = { visible: false }

  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })

  render(){
    const {children} = this.props
    const { visible } = this.state
    return (
      <div className="Nav">
        <div className='ui vertical menu'>
          <Button.Group>
            <Button disabled={visible} onClick={this.handleShowClick}>
              Menu
            </Button>
          </Button.Group>

          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              onHide={this.handleSidebarHide}
              vertical
              visible={visible}
              width='thin'
            >

            <NavLink className="item" to="/rameniac/" exact>
            <Menu.Item as='a'>
              <Icon name='home' />
                  Home
            </Menu.Item>
            </NavLink>

            <NavLink className="item" to="/rameniac/user_details/">
            <Menu.Item as='a'>
              <Icon name='user' />
              Your Profile
            </Menu.Item>
            </NavLink>


          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              {<Header as='h3'> </Header>}
            </Segment>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        </div>
      </div>
    )
  }
}

export default Nav
