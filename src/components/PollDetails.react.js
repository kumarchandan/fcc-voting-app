// PollDetails.react.js : Details and Results of a single Poll - Access All

var React = require('react')

var AuthStore = require('../stores/AuthStore')
var PollStore = require('../stores/PollStore')
var PollActions = require('../actions/PollActions')

var Donut = require('./Donut.react')

import { Jumbotron, Grid, Row, Col, Thumbnail, Button, FormControl, Alert } from 'react-bootstrap'

//
function getPollDetails(_id) {
    return {
        poll: PollStore.getPoll(_id),
        message: PollStore.getVoteMsg(),
        owner: AuthStore.getAuthData()      // false-> no logged in user, user -> _id : check with existing poll - ownerUserid
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
    contextTypes: {
        router: React.PropTypes.object
    },
    //
    _onChange: function() {
        this.setState(getPollDetails(this.props.params.pollID))
    },
    //
    _handleSubmit: function() {
        var selectElem = document.getElementById('selectElem')
        var optionSel = selectElem.options[selectElem.selectedIndex].value
        // Vote
        PollActions.vote(this.props.params.pollID, optionSel)
    },
    //
    getInitialState: function() {
        return getPollDetails(this.props.params.pollID)
    },
    //
    componentDidMount: function() {
        PollStore.addChangeListener(this._onChange)
        AuthStore.addChangeListener(this._onChange)
    },
    //
    componentWillUnmount: function() {
        PollStore.removeChangeListener(this._onChange)
        AuthStore.removeChangeListener(this._onChange)
    },
    //
    handleAlertDismiss: function() {
        this.setState({
            message: null
        })
    },
    //
    checkOwner: function() {
        var owner = this.state.owner
        var poll = this.state.poll[0]
        if(!owner) { // no one's logged in
            return false
        } else {
            var userID = owner._id
            var pollOwnerID = poll.ownerUserid
            if(userID === pollOwnerID) {
                return true
            } else {
                return false
            }
        }
    },
    //
    removePoll: function() {
        var _id = this.state.poll[0]._id
        PollActions.removePoll(_id)
        //
        this.context.router.push('/')
    },
    //
    render: function() {
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
                            { this.checkOwner() ?
                                <Button bsStyle='danger' onClick={this.removePoll} block>Remove Poll</Button>
                            :
                                null
                            }
                            
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