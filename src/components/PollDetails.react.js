// PollDetails.react.js : Details and Results of a single Poll - Access All

var React = require('react')
var PollStore = require('../stores/PollStore')
var PollActions = require('../actions/PollActions')
var PollAPI = require('../utils/PollAPI')

var Donut = require('./Donut.react')

import { Jumbotron, Grid, Row, Col, Thumbnail, Button, FormControl, Alert } from 'react-bootstrap'

//
function getPollDetails(_id) {
    return {
        poll: PollStore.getPoll(_id),
        message: PollStore.getVoteMsg()
    }
}

//
var SelectOptions = React.createClass({
    //
    render: function() {
        var row = []
        this.props.options.forEach(function(option) {
            row.push(<option key={option._id} value={option.text}>{option.text}</option>)
        })
        // For Customized Option
        row.push(<option key='custom' value='custom'>I'd like a custom option</option>)
        return (
            <FormControl componentClass="select" id='selectElem' placeholder="Choose an option...">{row}</FormControl>
        )
    }
})

//
var PollDetails = React.createClass({
    //
    _onChange: function() {
        this.setState(getPollDetails(this.props.params.pollID))
    },
    //
    _handleSubmit: function() {
        var selectElem = document.getElementById('selectElem')
        var optionSel = selectElem.options[selectElem.selectedIndex].value
        // Vote
        PollAPI.vote(this.props.params.pollID, optionSel)
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
    handleAlertDismiss: function() {
        this.setState({
            message: null
        })
    },
    //
    render: function() {
        debugger
        var poll = this.state.poll[0]
        if(poll) {
            return (
                <Grid>
                    <Row>
                        <Col lg={6}>
                            { (this.state.message) ?
                                <Alert bsStyle='warning' onDismiss={this.handleAlertDismiss}>
                                    <strong>{this.state.message}</strong>
                                </Alert>
                                : null
                            }
                            <Jumbotron>
                                <h2>{poll.title}</h2>
                                <br />
                                <h3>I would like to go for...</h3>
                                <form>
                                    <SelectOptions options={poll.options} />
                                    <br />
                                    <Button type='button' bsStyle='success' onClick={this._handleSubmit}>Submit</Button>
                                </form>
                            </Jumbotron>
                        </Col>
                        <Col lg={6}>
                            <Donut options={poll.options} />
                        </Col>
                    </Row>
                </Grid>
            )
        } else {
            return null
        }
        
    }
})

module.exports = PollDetails