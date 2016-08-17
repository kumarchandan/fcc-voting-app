// Index.react.js : Navigation bar [parent of all UI components]

var React = require('react')

import { Nav, Navbar, NavItem, NavDropDown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// Navigation bar
var NavigationBar = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Vote.app</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight>
                        <LinkContainer to='/polls'>
                            <NavItem eventKey={1}>Home</NavItem>
                        </LinkContainer>
                        <LinkContainer to='/mypolls'>
                            <NavItem eventKey={2}>My Polls</NavItem>
                        </LinkContainer>
                        <LinkContainer to='/newpoll'>
                            <NavItem eventKey={3}>New Poll</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar>
                {this.props.children}
            </div>
        )
    }
})


// module exports 
module.exports = NavigationBar

