// Index.react.js
// Featrues:  To render the home page - [sign in button , all polls etc]

var React = require('react')
var Bs = require('react-bootstrap')
var PollStore = require('../stores/PollStore')

// Bootstrap elements
var Navbar = Bs.Navbar,
    Nav = Bs.Nav,
    NavItem = Bs.NavItem
var Jumbotron = Bs.Jumbotron
var ListGroup = Bs.ListGroup,
    ListGroupItem = Bs.ListGroupItem

// React components
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
                    <NavItem eventKey={3} href="/auth/twitter">Sign in with Twitter</NavItem>
                </Nav>
            </Navbar>
        )
    }
})

// List - All Polls
var PollsList = React.createClass({
    render: function() {
        var pollRow = []
        this.props.polls.forEach(function(poll) {
            pollRow.push(<ListGroupItem header={poll.title} key={poll.title}></ListGroupItem>)
        })
        return (
            <ListGroup>
                {pollRow}
            </ListGroup>
        )
    }
})

// get data from store
function getState() {
    return {
        polls: PollStore.getPolls()     // TODO - call PollStore-getPoll here
    }
}

// Jumbotron content
var Container = React.createClass({
    // state - keep it here
    getInitialState: function() {
        return getState()
    },
    componentDidMount: function() {
        PollStore.addChangeListener(this._onChange)
    },

    componentWillUnmount: function() {
        PollStore.removeChangeListener(this._onChange)
    },

    // render it
    render: function() {
        return (
            <Jumbotron>
                <h2> All Polls </h2>
                <br />
                <PollsList polls={this.state.polls} />
            </Jumbotron>
        )
    },
    _onChange: function() {
        this.setState(getState())
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

