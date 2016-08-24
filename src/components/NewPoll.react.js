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
        var options = this.refs.options.value.split(',')
        console.log(title, options)
        var poll = {
            title: title,
            options: options
        }
        //
        PollActions.createPoll(poll)
        // Navigate to Home
        // this.props.history.push('/')        // get new way of transition - this is deprecated
        this.context.router.push('/')
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
                                <input id="newTitle" ref='title' type="text" style={inpStyle} placeholder="Enter poll title..." />
                                <br />
                                <br />
                                <textarea id="newOptions" ref='options' style={taStyle} placeholder='Your options [comma seperated]' />
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