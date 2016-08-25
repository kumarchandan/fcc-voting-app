// PollDetails.react.js : Details and Results of a single Poll - Access All

var React = require('react')

var AuthStore = require('../stores/AuthStore')
var PollStore = require('../stores/PollStore')
var PollActions = require('../actions/PollActions')
var PieChart = require('react-d3-basic').PieChart

import { Jumbotron, Grid, Row, Col, Thumbnail, Button, FormControl, Alert } from 'react-bootstrap'

// User chooses Custom option
function customOptionSelected(event) {
    if(event.target.value === 'custom') {
        this.setState({
            custom: true
        })
    }
}

// Select
var SelectOptions = React.createClass({
    //
    render: function() {
        var row = []
        this.props.options.forEach(function(option) {
            row.push(<option key={option._id} value={option.text}>{option.text}</option>)
        })
        // Customized Option Only If User is logged in
        if(this.props.user) {
            row.push(<option key='custom' value='custom'>I'd like a custom option</option>)
        }
        return (
            <FormControl componentClass="select" id='selectElem' onChange={customOptionSelected.bind(this.props.self)} placeholder="Choose an option...">{row}</FormControl>
        )
    }
})

// Donut
var Donut = React.createClass({
    //
    getInitialState: function() {
        return {
            width: 700,
            height: 400,
            innerRadius: 65,
            series: this.chartSeries()
        }
    },
    value: function(d) {
        return +d.vote
    },
    name: function(d) {
        return d.text
    },
    chartSeries: function() {
        var series = this.props.options.map(function(option) {
            return {
                field: option.text,
                name: option.text
            }
        })
        return series
    },
    //
    render: function() {
        return (
            <PieChart data={this.props.options} width={this.state.width} height={this.state.height} chartSeries={this.state.series} name={this.name} value={this.value} innerRadius={this.innerRadius} />
        )
    }
})

//
function getPollDetails(_id) {
    return {
        custom: false,
        poll: PollStore.getPoll(_id),
        message: PollStore.getVoteMsg(),
        user: AuthStore.getAuthData()      // false-> no logged in user, user -> _id : check with existing poll - ownerUserid
    }
}

// Poll
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
        //
        if(optionSel === 'custom') {
            // Custom Vote
            optionSel = this.refs.customOption.value
            if(optionSel === '') {
                alert('You forgot to write your option Pal! :)')
                return false
            }
            optionSel = optionSel.trim()         // trim() - remove whitespaces from String
            // Notify if Custom Option already Available
            var existingOptions = this.state.poll[0].options
            for(var i = 0; i < existingOptions.length; i++) {
                if(existingOptions[i].text === optionSel) {
                    alert('Option is already Available Pal! :)')
                    return false
                }
            }
            // Vote with Custom Option
            PollActions.customVote(this.props.params.pollID, optionSel)

        } else {
            // Vote with Available Options
            PollActions.vote(this.props.params.pollID, optionSel)
        }
        
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
        var user = this.state.user
        var poll = this.state.poll[0]
        if(!user) { // no one's logged in
            return false
        } else {
            var userID = user._id
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
                                    <SelectOptions options={poll.options} user={this.state.user} self={this} />
                                    <br />
                                    {this.state.custom ?
                                        <div>
                                            <h3>Vote with my option:</h3>
                                            <input ref='customOption' type="text" required />
                                        </div>
                                        : null}
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