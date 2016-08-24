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

var showLegend = true
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
            <PieChart data={this.props.options} width={width} height={height} chartSeries={this.state.series} name={name} value={value} innerRadius={innerRadius} showLegend= {showLegend} />
        )
    }
})

module.exports = Donut

















