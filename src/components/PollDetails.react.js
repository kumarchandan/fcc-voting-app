// PollDetails.react.js : Details and Results of a single Poll - Access All

var React = require('react')
var PollStore = require('../stores/PollStore')

import { Jumbotron } from 'react-bootstrap'

//
function getPollDetails(_id) {
    return {
        poll: PollStore.getPollDetails(_id)
    }
}

//
var PollDetails = React.createClass({
    //
    _onChange: function() {
        this.setState(getPollDetails(this.props.params.pollID))
    },
    //
    getInitialState: function() {
        return getPollDetails(this.props.params.pollID)
    },
    //
    componentDidMount: function() {
        PollStore.addChangeListener(this._onChange)
    },
    //
    componentWillUnmount: function() {
        PollStore.removeChangeListener(this._onChange)
    },
    //
    render: function() {
        debugger
        return (
            <Jumbotron>
                <h3>Poll Title:</h3>
                <p>{this.state.poll[0].title}</p>
            </Jumbotron>
        )
    }
})

module.exports = PollDetails