// Polls.react.js : list polls [Home page]

var React = require('react')
var Bs = require('react-bootstrap')

var PollStore = require('../stores/PollStore')

// Bootstrap elements
var ListGroup = Bs.ListGroup
var ListGroupItem = Bs.ListGroupItem
var Jumbotron = Bs.Jumbotron

// List - All Polls
var List = React.createClass({
    render: function() {
        var pollRow = []
        this.props.polls.forEach(function(poll) {
            pollRow.push(<ListGroupItem header={poll.title} key={poll.title}></ListGroupItem>)
        })
        // return
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

// Jumbotron
var Polls = React.createClass({

    _onChange: function() {
        this.setState(getState())
    },

    getInitialState: function() {
        return getState()
    },

    componentDidMount: function() {
        PollStore.addChangeListener(this._onChange)
    },

    componentWillUnmount: function() {
        PollStore.removeChangeListener(this._onChange)
    },
    // render
    render: function() {
        return (
            <Jumbotron>
                <h2> All Polls </h2>
                <br />
                <List polls={this.state.polls} />
            </Jumbotron>
        )
    }
})

module.exports = Polls