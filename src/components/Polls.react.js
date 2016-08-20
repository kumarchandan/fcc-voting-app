// Polls.react.js : List of All Polls - Access All

var React = require('react')
var PollStore = require('../stores/PollStore')

// Bootstrap elements
import { ListGroup, ListGroupItem, Jumbotron, Grid, Row, Col, Thumbnail } from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'

// Private data
var _key = null

// List - All Polls
var List = React.createClass({
    //
    render: function() {
        var pollRow = []
        if(this.props.polls && this.props.polls.length !== 0) {
            this.props.polls.forEach(function(poll) {
                pollRow.push(
                    <LinkContainer to={'/polls/'+poll._id} key={poll._id}>
                        <ListGroupItem header={poll.title} key={poll._id}></ListGroupItem>
                    </LinkContainer>
                )
            })
            //
            return (
                <ListGroup>
                    {pollRow}
                </ListGroup>
            )
        } else {
            return null
        }
        
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
            <Grid>
                <Row>
                    <Col lg={12}>
                        <Jumbotron>
                            <h2> All Polls </h2>
                            <br />
                            <List polls={this.state.polls} />
                        </Jumbotron>
                    </Col>
                </Row>
            </Grid>
        )
    }
})

module.exports = Polls