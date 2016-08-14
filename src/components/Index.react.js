// Index.react.js
// Featrues:  To render the home page - [sign in button , all polls etc]

var React = require('react')
var Bs = require('react-bootstrap')

// Bootstrap elements
var Navbar = Bs.Navbar,
    Nav = Bs.Nav,
    NavItem = Bs.NavItem

var Jumbotron = Bs.Jumbotron

var ListGroup = Bs.ListGroup,
    ListGroupItem = Bs.ListGroupItem

// Navigation bar
var NavbarInstance = React.createClass({
    render: function() {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Vote.app</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">Home</NavItem>
                    <NavItem eventKey={2} href="#">Sign in</NavItem>
                    <NavItem eventKey={3} href="#">Sign in with Twitter</NavItem>
                </Nav>
            </Navbar>
        )
    }
})

// List - All Polls
var ListOfAllPolls = React.createClass({
    render: function() {
        return (
            <ListGroup>
                <ListGroupItem header="Which kind of music would you prefer?"></ListGroupItem>
                <ListGroupItem header="Which one of these is your favorite?"></ListGroupItem>
            </ListGroup>
        )
    }
})


// Jumbotron content
var Container = React.createClass({
    render: function() {
        return (
            <Jumbotron>
                <h2> All Polls </h2>
                <br />
                <ListOfAllPolls />
            </Jumbotron>
        )
    }
})

// content

var Content = React.createClass({
    render: function() {
        return (
            <div>
                <NavbarInstance />
                <Container />
            </div>
        )
    }
})

// module exports 
module.exports = Content

