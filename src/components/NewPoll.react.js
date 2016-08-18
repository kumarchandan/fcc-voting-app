// NewPoll.react.js : User can Create New Poll - Access Authenticated User Only

var React = require('react')
var PollAPI = require('../utils/PollAPI')

import { Transition } from 'react-router'

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
        var title = document.getElementById('newTitle').value
        var options = document.getElementById('newOptions').value.split(',')
        console.log(title, options)
        var poll = {
            title: title,
            options: options
        }
        PollAPI.createPoll(poll)
    },
    render: function() {
        //
        return (
            <Jumbotron>
                <h3>Create New Poll</h3>
                <br />
                <form>
                    <input id="newTitle" type="text" style={inpStyle} placeholder="Enter poll title..." />
                    <br />
                    <br />
                    <textarea id="newOptions" style={taStyle} />
                    <br />
                    <br />
                    <Button bsStyle="success" onClick={this.createPoll}>Submit</Button>
                </form>
            </Jumbotron>
        )
    }
})

module.exports = NewPoll