// MyPolls.react.js : List of Polls - Access Authenticated User Only

var React = require('react')
var PollStore = require('../stores/PollStore')

// Bootstrap elements
import { ListGroup, ListGroupItem, Jumbotron } from 'react-bootstrap'

//
var List = React.createClass({
    //
    render: function() {    
        var row = []
        if(this.props.myPolls && this.props.myPolls.length !== 0) {
            this.props.myPolls.forEach(function(poll) {
                row.push(<ListGroupItem header={poll.title} key={poll._id}></ListGroupItem>)
            })
            return (
                <ListGroup>
                    {row}
                </ListGroup>
            )
        } else {
            return null
        }
        
    }
})

//
function getMyPolls() {
    return {
        myPolls: PollStore.getMyPolls()
    }
}
// 
var MyPolls = React.createClass({
    //
    _onChange: function() {
        this.setState(getMyPolls())
    },
    //
    getInitialState: function() {
        return getMyPolls()
    },
    //
    componentWillMount: function() {
        PollStore.addChangeListener(this._onChange)
    },
    //
    componentWillUnmount: function() {
        PollStore.removeChangeListener(this._onChange)
    },
    //
    render: function() {
        return (
            <Jumbotron>
                <h3>Your Polls</h3>
                <br />
                <List myPolls={this.state.myPolls} />
            </Jumbotron>
        )
    }
})

module.exports = MyPolls