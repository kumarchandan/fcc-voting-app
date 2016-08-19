// NewPoll.react.js : User can Create New Poll - Access Authenticated User Only

var React = require('react')
var PollAPI = require('../utils/PollAPI')

import { browserHistory } from 'react-router'

// Bootstrap elements
import { Jumbotron, Button } from 'react-bootstrap'

// Styles
var taStyle = {
    width: '500px',
    height: '169px'
}
var inpStyle = {
    width: '500px'
}

//
var NewPoll = React.createClass({
    //
    createPoll: function() {
        //
        var title = this.refs.title.value
        var options = this.refs.options.value.split(',')
        console.log(title, options)
        var poll = {
            title: title,
            options: options
        }
        PollAPI.createPoll(poll)
        // Navigate to Home
        this.props.history.push('/')
    },
    render: function() {
        //
        return (
            <Jumbotron>
                <h3>Create New Poll</h3>
                <br />
                <form>
                    <input id="newTitle" ref='title' type="text" style={inpStyle} placeholder="Enter poll title..." />
                    <br />
                    <br />
                    <textarea id="newOptions" ref='options' style={taStyle} />
                    <br />
                    <br />
                    <Button bsStyle="success" onClick={this.createPoll}>Submit</Button>
                </form>
            </Jumbotron>
        )
    }
})

module.exports = NewPoll