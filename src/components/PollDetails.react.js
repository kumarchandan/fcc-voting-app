// PollDetails.react.js : Details - Results of a single Poll

var React = require('react')

var PollDetails = React.createClass({
    render: function() {
        return (
            <div>
                <h3>Poll Details and Results:</h3>
                <p>Poll ID displayed is {this.props.params.pollID}</p>
            </div>
        )
    }
})

module.exports = PollDetails