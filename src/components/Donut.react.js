// Donut.react.js

var React = require('react')
var PieChart = require('react-d3-basic').PieChart

//
var width = 700
var height = 400
var value = function(d) {
    return +d.vote
}
var name = function(d) {
    return d.text
}

// chart series,
// field: is what field your data want to be selected
// name: the name of the field that display in legend
// color: what color is the line
var innerRadius = 65

var Donut = React.createClass({
    //
    getInitialState: function() {
        return {
            series: this.chartSeries()
        }
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
            <PieChart data={this.props.options} width={width} height={height} chartSeries={this.state.series} name={name} value={value} innerRadius={innerRadius} />
        )
    }
})

module.exports = Donut

















