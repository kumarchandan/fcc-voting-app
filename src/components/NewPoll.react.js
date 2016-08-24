// NewPoll.react.js : User can Create New Poll - Access Authenticated User Only

var React = require('react')
var PollActions = require('../actions/PollActions')

import { browserHistory } from 'react-router'

// Bootstrap elements
import { Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap'

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
    contextTypes: {
        router: React.PropTypes.object
    },
    //
    createPoll: function() {
        //
        var title = this.refs.title.value
        var options = this.refs.options.value
        if(title !== '' && options !== '') {
            var newOptions = options.replace(/^\s+|\s+$/g,"").split(/\s*,\s*/)     // Remove White Spaces and Create Array
            // Remove duplicated from options
            newOptions = Array.from(new Set(newOptions))
            var poll = {
                title: title,
                options: newOptions
            }
            //
            PollActions.createPoll(poll)
            // Navigate to Home
            this.context.router.push('/')
        } else {
            alert('You forgot to enter title or options :)')
            return true
        }
    },
    render: function() {
        //
        return (
            <Grid>
                <Row>
                    <Col lg={12}>
                        <Jumbotron>
                            <h3>Create New Poll</h3>
                            <br />
                            <form>
                                <input id="newTitle" ref='title' type="text" style={inpStyle} placeholder="Enter poll title..." required />
                                <br />
                                <br />
                                <textarea id="newOptions" ref='options' style={taStyle} placeholder='Your options [comma seperated]' required></textarea>
                                <br />
                                <br />
                                <Button bsStyle="success" onClick={this.createPoll}>Submit</Button>
                            </form>
                        </Jumbotron>
                    </Col>
                </Row>
            </Grid>
            
        )
    }
})

module.exports = NewPoll