//# dc.js Getting Started and How-To Guide
'use strict';

/* jshint globalstrict: true */
/* global dc,d3,crossfilter,colorbrewer */

// ### Create Chart Objects
// Create chart objects assocated with the container elements identified by the css selector.
// Note: It is often a good idea to have these objects accessible at the global scope so that they can be modified or
// filtered by other page controls.
var gainOrLossChart = dc.pieChart('#gain-loss-chart');
var totalEmployeeChart = dc.barChart('#totalEmployee-chart');
var quarterChart = dc.pieChart('#quarter-chart');
var IndustryChart = dc.rowChart('#day-of-week-chart');
var compositeLineChart = dc.compositeChart('#monthly-move-chart'); // haryono- Originally line chart changed to composite chart
var volumeChart = dc.barChart('#monthly-volume-chart');
var yearlyBubbleChart = dc.bubbleChart('#yearly-bubble-chart');

// ### Anchor Div for Charts
/*
// A div anchor that can be identified by id
    <div id='your-chart'></div>
// Title or anything you want to add above the chart
    <div id='chart'><span>Days by Gain or Loss</span></div>
// ##### .turnOnControls()
// If a link with css class 'reset' is present then the chart
// will automatically turn it on/off based on whether there is filter
// set on this chart (slice selection for pie chart and brush
// selection for bar chart). Enable this with `chart.turnOnControls(true)`
     <div id='chart'>
       <a class='reset' href='javascript:myChart.filterAll();dc.redrawAll();' style='display: none;'>reset</a>
     </div>
// dc.js will also automatically inject applied current filter value into
// any html element with css class set to 'filter'
    <div id='chart'>
        <span class='reset' style='display: none;'>Current filter: <span class='filter'></span></span>
    </div>
*/

//### Load your data
//Data can be loaded through regular means with your
//favorite javascript library
//
//```javascript
//d3.csv('data.csv', function(data) {...};
//d3.json('data.json', function(data) {...};
//jQuery.getJson('data.json', function(data){...});
//```
d3.csv('trial4.csv', function (data) {
    /* since its a csv file we need to format the data a bit */
    var dateFormat = d3.time.format('%m/%d/%Y');
    var numberFormat = d3.format('.2f');

    data.forEach(function (d) {
        d.dd = dateFormat.parse(d.date);
        d.month = d3.time.month(d.dd); // pre-calculate month for better performance
        d.close = +d.close; // coerce to number
        d.open = +d.open;
    });

    //### Create Crossfilter Dimensions and Groups
    //See the [crossfilter API](https://github.com/square/crossfilter/wiki/API-Reference) for reference.
    var ndx = crossfilter(data);
    var all = ndx.groupAll();

    // dimension by year
    var yearlyDimension = ndx.dimension(function (d) {
        return d3.time.year(d.dd).getFullYear();
    });
    // maintain running tallies by year as filters are applied or removed
    var temp = [];
    var yearlyPerformanceGroup = yearlyDimension.group().reduce(
         // reduce function consist of following function group.reduce(add, remove, initial) - standard
        /* callback for when data is added to the current filter results */
        function (p, v) { // p is the declared value, while v is the inserted data
            ++p.count;
            temp.push(v.dd.getMonth());
            temp.sort();
            p.quarterCount = 1
            for(var i=1; i < temp.length; i++){
                if(temp[i] != temp[i-1]){
                  p.quarterCount += 1;
                }
            }
            p.empIncrease += +v.volume; // x-axis     //
            //console.log(p.empIncrease);
            p.totalEmployee += +v.NumberOfEmployee;      //
            p.sumIndex += (v.open + v.close) / 2; // average 
            p.avgIndex = p.sumIndex / p.count; // em
            p.percentageGain = p.empIncrease/(p.totalEmployee) * 100;//
            p.totalEmployeePercentage = p.totalEmployee/(p.quarterCount); //*size //
            p.totalSalary += v.high*1; //
            p.salary = p.totalSalary/p.count;    //
            return p;
        },
        /* callback for when data is removed from the current filter results */
        function (p, v) {
            --p.count;
            var index = temp.indexOf(v.dd.getMonth());
            if (index > -1) {
                temp.splice(index, 1);
            }
            p.quarterCount = 1
            for(var i=1; i < temp.length; i++){
                if(temp[i] != temp[i-1]){
                  p.quarterCount += 1;
                }
            }
            p.empIncrease -= +v.volume;    //
            p.totalEmployee -= +v.NumberOfEmployee;       //
            p.sumIndex -= (v.open + v.close) / 2;
            p.avgIndex = p.sumIndex / p.count;
            p.percentageGain = p.empIncrease/(p.totalEmployee) * 100;    //
            p.totalEmployeePercentage = p.totalEmployee/p.quarterCount;            //
            p.totalSalary -= +v.high;                       //
            p.salary = p.totalSalary/p.count;             //
            return p;
        },
        /* initialize p */
        function () {
            return {
                count: 0,
                empIncrease: 0,
                totalEmployee: 0,
                totalEmployeePercentage: 0,
                sumIndex: 0,
                avgIndex: 0,
                percentageGain: 0, // (comma)
                totalSalary:0, //
                salary: 0, //
                quarterCount : 0
            };
        }
    );

    // dimension by full date
    var dateDimension = ndx.dimension(function (d) {
        return d.Industry;             //
    });

    // dimension by month
    var moveMonths = ndx.dimension(function (d) {
        return d.month;
    });
    // group by total movement within month
    var monthlyMoveGroup = moveMonths.group().reduce(
        function (p,v) {
          ++p.days;
            //p.total += (v.open + v.close) / 2;
            //p.avg = Math.round(p.total / p.days);
            p.total += +v.high;
            p.avg = p.total/p.days;
            //console.log(p.total);
            //console.log(p.days);
            //console.log(v.Industry);
            return p;
        },
        function (p, v) {
            --p.days;
            //p.total -= (v.open + v.close) / 2;
            //p.avg = p.days ? Math.round(p.total / p.days) : 0;
            p.total -= +v.high;
            p.avg = p.days ? Math.round(p.total / p.days) : 0;
            return p;
        },
        function () {
            return {days: 0, total: 0, avg: 0};
        }
        
        //return Math.abs(d.close - d.open);     
    );
    // group by total volume within move, and scale down result
    var volumeByMonthGroup = moveMonths.group().reduceSum(function (d) {
        return d.NumberOfEmployee / 500;
    });
    var indexAvgByMonthGroup = moveMonths.group().reduce(
        function (p, v) {
            ++p.days;
            //p.total += (v.open + v.close) / 2;
            //p.avg = Math.round(p.total / p.days);
            p.total += +v.NumberOfEmployee;
            p.avg = p.total;
            //console.log(p.total);
            //console.log(p.days);
            //console.log(v.Industry);
            return p;
        },
        function (p, v) {
            --p.days;
            //p.total -= (v.open + v.close) / 2;
            //p.avg = p.days ? Math.round(p.total / p.days) : 0;
            p.total -= +v.NumberOfEmployee;
            p.avg = p.total;
            return p;
        },
        function () {
            return {days: 0, total: 0, avg: 0};
        }
    );

    // create categorical dimension
    var gainOrLoss = ndx.dimension(function (d) {
        return d.open > d.close ? 'Loss' : 'Gain';
    });
    // produce counts records in the dimension
    var gainOrLossGroup = gainOrLoss.group();

    // determine a histogram of percent changes
    var totalEmployee = ndx.dimension(function (d) {
        return Math.round((d.close - d.open) / d.open * 100);
    });
    var totalEmployeeGroup = totalEmployee.group();

    // summerize volume by quarter
    var quarter = ndx.dimension(function (d) {
        var month = d.dd.getMonth();
        if (month <= 4) {
            return 'Q1';
        } else if (month > 4 && month <= 7) {
            return 'Q2';
        } else if (month > 7 && month <= 10) {
            return 'Q3';
        } else {
            return 'Q4';
        }
    });
    var quarterGroup = quarter.group().reduceSum(function (d) {
        return 1;
    });

    // counts per weekday
    var dayOfWeek = ndx.dimension(function (d) {
        var day = d.Industry;   //
        var name = ['Manufacturing', 'Construction', 'Services', 'Wholesale & Retail Trade', 'Transportation and Storage', 'Accomodation and Food Services', 'Information and Communications','Financial and Insurance ServicesÊ', 'Real Estate Services', 'Professional Services','Administrative and Support Services', 'Community & Personal Services'];//
        //console.log(day + '.' + name[day]);
        //return day + '.' + name[day];  //
        return day + '.' + day;  //
    });
    var dayOfWeekGroup = dayOfWeek.group();

    //### Define Chart Attributes
    //Define chart attributes using fluent methods. See the
    // [dc API Reference](https://github.com/dc-js/dc.js/blob/master/web/docs/api-1.7.0.md) for more information
    //

    //#### Bubble Chart
    //Create a bubble chart and use the given css selector as anchor. You can also specify
    //an optional chart group for this chart to be scoped within. When a chart belongs
    //to a specific group then any interaction with such chart will only trigger redraw
    //on other charts within the same chart group.
    /* dc.bubbleChart('#yearly-bubble-chart', 'chartGroup') */
    yearlyBubbleChart
        .width(450) // (optional) define chart width, :default = 200
        .height(200)  // (optional) define chart height, :default = 200
        .transitionDuration(1500) // (optional) define chart transition duration, :default = 750
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .dimension(yearlyDimension)
        //Bubble chart expect the groups are reduced to multiple values which would then be used
        //to generate x, y, and radius for each key (bubble) in the group
        .group(yearlyPerformanceGroup)
        .colors(colorbrewer.Reds[9]) // (optional) define color function or array for bubbles
        .colorDomain([2500,5300]) //(optional) define color domain to match your data domain if you want to bind data or
                                  //color
                                  //
        //##### Accessors
        //Accessor functions are applied to each value returned by the grouping
        //
        //* `.colorAccessor` The returned value will be mapped to an internal scale to determine a fill color
        //* `.keyAccessor` Identifies the `X` value that will be applied against the `.x()` to identify pixel location
        //* `.valueAccessor` Identifies the `Y` value that will be applied agains the `.y()` to identify pixel location
        //* `.radiusValueAccessor` Identifies the value that will be applied agains the `.r()` determine radius size,
        //*     by default this maps linearly to [0,100]
        .colorAccessor(function (p) {
            //console.log(p.value.salary);
            return p.value.salary;
        })
        .keyAccessor(function (p) {
            return p.value.empIncrease;
        })
        .valueAccessor(function (p) {
            return p.value.percentageGain;
        })
        .radiusValueAccessor(function (p) {
            return p.value.totalEmployeePercentage;
        })
        .maxBubbleRelativeSize(0.1)
        .x(d3.scale.linear().domain([-100, 400])) //
        .y(d3.scale.linear().domain([-1, 10]))  //
        .r(d3.scale.linear().domain([-1000, 18000])) //
        //##### Elastic Scaling
        //`.elasticX` and `.elasticX` determine whether the chart should rescale each axis to fit data.
        //The `.yAxisPadding` and `.xAxisPadding` add padding to data above and below their max values in the same unit
        //domains as the Accessors.
        .elasticY(true)
        .elasticX(true)
        .yAxisPadding(2)  //
        .xAxisPadding(50)  //
        .renderHorizontalGridLines(true) // (optional) render horizontal grid lines, :default=false
        .renderVerticalGridLines(true) // (optional) render vertical grid lines, :default=false
        .xAxisLabel('Employee Increase (thousand)') // (optional) render an axis label below the x axis   //
        .yAxisLabel('Employee Increase in %') // (optional) render a vertical axis lable left of the y axis
        //#### Labels and  Titles
        //Labels are displaed on the chart for each bubble. Titles displayed on mouseover.
        .renderLabel(true) // (optional) whether chart should render labels, :default = true
        .label(function (p) {
            return p.key;
        })
        .renderTitle(true) // (optional) whether chart should render titles, :default = false
        .title(function (p) {
            return [
                p.key,
                'No of Employee: ' + numberFormat(p.value.totalEmployeePercentage)+' (thousand)', //
                'No of Employee Increase: ' + numberFormat(p.value.empIncrease)+' (thousand)',
                'Percentage of Employee Increase: ' + numberFormat(p.value.percentageGain) + '%',
                'Salary: S$'+ numberFormat(p.value.salary)                            //
            ].join('\n');
        })
        //#### Customize Axis
        //Set a custom tick format. Note `.yAxis()` returns an axis object, so any additional method chaining applies
        //to the axis, not the chart.
        .yAxis().tickFormat(function (v) {
            return v + '%';
        });

    // #### Pie/Donut Chart
    // Create a pie chart and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.

    gainOrLossChart
        .width(180) // (optional) define chart width, :default = 200
        .height(180) // (optional) define chart height, :default = 200
        .radius(80) // define pie radius
        .dimension(gainOrLoss) // set dimension
        .group(gainOrLossGroup) // set group
        /* (optional) by default pie chart will use group.key as its label
         * but you can overwrite it with a closure */
        .label(function (d) {
            if (gainOrLossChart.hasFilter() && !gainOrLossChart.hasFilter(d.key)) {
                return d.key + '(0%)';
            }
            var label = d.key;
            if (all.value()) {
                label += '(' + Math.floor(d.value / all.value() * 100) + '%)';
            }
            return label;
        }) /*
        // (optional) whether chart should render labels, :default = true
        .renderLabel(true)
        // (optional) if inner radius is used then a donut chart will be generated instead of pie chart
        .innerRadius(40)
        // (optional) define chart transition duration, :default = 350
        .transitionDuration(500)
        // (optional) define color array for slices
        .colors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
        // (optional) define color domain to match your data domain if you want to bind data or color
        .colorDomain([-1750, 1644])
        // (optional) define color value accessor
        .colorAccessor(function(d, i){return d.value;})
        */;

    quarterChart.width(180)
        .height(180)
        .radius(70)
        .innerRadius(30)
        .dimension(quarter)
        .group(quarterGroup);

    //#### Row Chart
    IndustryChart.width(220)             //
        .height(300)                   //
        .margins({top: 20, left: 10, right: 10, bottom: 20})
        .group(dayOfWeekGroup)
        .dimension(dayOfWeek)
        // assign colors to each value in the x scale domain
        //.ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
        .ordinalColors(['#3182bd'])          //
        .label(function (d) {
            return d.key.split('.')[1];
        })
        
        // title sets the row text
        .title(function (d) {
            return d.key.split('.')[1]; //
        })
        .elasticX(true)
        .xAxis().ticks(4);

    //#### Bar Chart
    // Create a bar chart and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.
    /* dc.barChart('#volume-month-chart') */
    totalEmployeeChart.width(420)
        .height(180)
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .dimension(totalEmployee)
        .group(totalEmployeeGroup)
        .elasticY(true)
        // (optional) whether bar should be center to its x value. Not needed for ordinal chart, :default=false
        .centerBar(true)
        // (optional) set gap between bars manually in px, :default=2
        .gap(1)
        // (optional) set filter brush rounding
        .round(dc.round.floor)
        .alwaysUseRounding(true)
        .x(d3.scale.linear().domain([-25, 25]))
        .renderHorizontalGridLines(true)
        // customize the filter displayed in the control span
        .filterPrinter(function (filters) {
            var filter = filters[0], s = '';
            s += numberFormat(filter[0]) + '% -> ' + numberFormat(filter[1]) + '%';
            return s;
        });

    // Customize axis
    totalEmployeeChart.xAxis().tickFormat(
        function (v) { return v + '%'; });
    totalEmployeeChart.yAxis().ticks(5);

    //#### Stacked Area Chart
    //Specify an area chart, by using a line chart with `.renderArea(true)`
    compositeLineChart
        //.renderArea(false) // Haryono- changing from line chart to area chart provided it is line chart, now cannot cause its composite
        .width(450)
        .height(200)
        .transitionDuration(1000)
        .margins({top: 50, right: 50, bottom: 35, left: 40})
        .dimension(moveMonths)
        .mouseZoomable(false) // Haryono- zoomable function within graph - useless
        // Specify a range chart to link the brush extent of the range with the zoom focue of the current chart.
        .rangeChart(volumeChart)
        .x(d3.time.scale().domain([new Date(2005, 0, 1), new Date(2013, 12, 31)]))
        .round(d3.time.month.round)
        .xUnits(d3.time.months)
        .elasticY(true)
        .renderVerticalGridLines(true) // to have vertical gridline
        .renderHorizontalGridLines(true)
        .legend(dc.legend().x(40))
        .brushOn(false)
        .title(function (d) {
            var value = d.value.avg ? d.value.avg : d.value;
            if (isNaN(value)) {
                value = 0;
            }
            return 'X-Axis : '+dateFormat(d.key) + '\nY-Axis : ' + numberFormat(value);
        })
        // Haryono - Compose option to merge diverse graph type into single chart
        .compose([ // only usable on composite graph
            dc.lineChart(compositeLineChart)
                    .group(indexAvgByMonthGroup, "Number of Employee")
                    .valueAccessor(function (d) {
                        return d.value.avg;
                    }),
            dc.lineChart(compositeLineChart)
                    .group(monthlyMoveGroup, "Average Income")
                    .valueAccessor(function (d) {
                        return d.value.avg;
                    })
                    .colors(d3.scale.ordinal().range(['red','green','blue']))
                    //.colors(["orange"])
                    .useRightYAxis(true)
        ])
        .yAxisLabel("No. of Employee (thousand)")
        .rightYAxisLabel("Average Income(S$)")
        .xAxisLabel("Year");
        /*
        // Add the base layer of the stack with group. The second parameter specifies a series name for use in the
        // legend
        // The `.valueAccessor` will be used for the base layer
        .group(indexAvgByMonthGroup, 'Monthly Index Average')
        .valueAccessor(function (d) {
            return d.value.avg;
        })
        // stack additional layers with `.stack`. The first paramenter is a new group.
        // The second parameter is the series name. The third is a value accessor.
        .stack(monthlyMoveGroup, 'Monthly Index Move', function (d) {
            return d.value;
        })
        // title can be called by any stack layer.
        .title(function (d) {
            var value = d.value.avg ? d.value.avg : d.value;
            if (isNaN(value)) {
                value = 0;
            }
            return dateFormat(d.key) + '\n' + numberFormat(value);
        });
        */
    volumeChart.width(490)
        .height(55)
        .margins({top: 0, right: 50, bottom: 20, left: 40})
        .dimension(moveMonths)
        .group(volumeByMonthGroup)
        .centerBar(true)
        .gap(1)
        .x(d3.time.scale().domain([new Date(2005, 0, 1), new Date(2013, 12, 31)]))
        .round(d3.time.month.round)
        .alwaysUseRounding(true)
        .xUnits(d3.time.months);

    /*
    //#### Data Count
    // Create a data count widget and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.
    <div id='data-count'>
        <span class='filter-count'></span> selected out of <span class='total-count'></span> records
    </div>
    */
    dc.dataCount('.dc-data-count')
        .dimension(ndx)
        .group(all)
        // (optional) html, for setting different html for some records and all records.
        // .html replaces everything in the anchor with the html given using the following function.
        // %filter-count and %total-count are replaced with the values obtained.
        .html({
            some:'<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'\'>Reset All</a>',
            all:'All records selected. Please click on the graph to apply filters.'
        });

    /*
    //#### Data Table
    // Create a data table widget and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.
    <!-- anchor div for data table -->
    <div id='data-table'>
        <!-- create a custom header -->
        <div class='header'>
            <span>Date</span>
            <span>Open</span>
            <span>Close</span>
            <span>Change</span>
            <span>Volume</span>
        </div>
        <!-- data rows will filled in here -->
    </div>
    */
    dc.dataTable('.dc-data-table')
        .dimension(dateDimension)
        // data table does not use crossfilter group but rather a closure
        // as a grouping function
        .group(function (d) {
            var format = d3.format('02d');
            return d.dd.getFullYear() + '/' + format((d.dd.getMonth() + 1));
        })
        .size(10) // Haryono - (optional) max number of records to be shown, :default = 25
        // There are several ways to specify the columns; see the data-table documentation.
        // This code demonstrates generating the column header automatically based on the columns.
        .columns([
            'date',    // d['date'], ie, a field accessor; capitalized automatically
            'open',    // ...
            'close',   // ...
            {
                label: 'Change', // desired format of column name 'Change' when used as a label with a function.
                format: function (d) {
                    return numberFormat(d.close - d.open);
                }
            },
            'volume'   // d['volume'], ie, a field accessor; capitalized automatically
        ])

        // (optional) sort using the given field, :default = function(d){return d;}
        .sortBy(function (d) {
            return d.dd;
        })
        // (optional) sort order, :default ascending
        .order(d3.ascending)
        // (optional) custom renderlet to post-process chart using D3
        .renderlet(function (table) {
            table.selectAll('.dc-table-group').classed('info', true);
        });

    /*
    //#### Geo Choropleth Chart
    //Create a choropleth chart and use the given css selector as anchor. You can also specify
    //an optional chart group for this chart to be scoped within. When a chart belongs
    //to a specific group then any interaction with such chart will only trigger redraw
    //on other charts within the same chart group.
    dc.geoChoroplethChart('#us-chart')
        .width(990) // (optional) define chart width, :default = 200
        .height(500) // (optional) define chart height, :default = 200
        .transitionDuration(1000) // (optional) define chart transition duration, :default = 1000
        .dimension(states) // set crossfilter dimension, dimension key should match the name retrieved in geo json layer
        .group(stateRaisedSum) // set crossfilter group
        // (optional) define color function or array for bubbles
        .colors(['#ccc', '#E2F2FF','#C4E4FF','#9ED2FF','#81C5FF','#6BBAFF','#51AEFF','#36A2FF','#1E96FF','#0089FF',
            '#0061B5'])
        // (optional) define color domain to match your data domain if you want to bind data or color
        .colorDomain([-5, 200])
        // (optional) define color value accessor
        .colorAccessor(function(d, i){return d.value;})
        // Project the given geojson. You can call this function mutliple times with different geojson feed to generate
        // multiple layers of geo paths.
        //
        // * 1st param - geo json data
        // * 2nd param - name of the layer which will be used to generate css class
        // * 3rd param - (optional) a function used to generate key for geo path, it should match the dimension key
        // in order for the coloring to work properly
        .overlayGeoJson(statesJson.features, 'state', function(d) {
            return d.properties.name;
        })
        // (optional) closure to generate title for path, :default = d.key + ': ' + d.value
        .title(function(d) {
            return 'State: ' + d.key + '\nTotal Amount Raised: ' + numberFormat(d.value ? d.value : 0) + 'M';
        });

        //#### Bubble Overlay Chart
        // Create a overlay bubble chart and use the given css selector as anchor. You can also specify
        // an optional chart group for this chart to be scoped within. When a chart belongs
        // to a specific group then any interaction with such chart will only trigger redraw
        // on other charts within the same chart group.
        dc.bubbleOverlay('#bubble-overlay')
            // bubble overlay chart does not generate it's own svg element but rather resue an existing
            // svg to generate it's overlay layer
            .svg(d3.select('#bubble-overlay svg'))
            .width(990) // (optional) define chart width, :default = 200
            .height(500) // (optional) define chart height, :default = 200
            .transitionDuration(1000) // (optional) define chart transition duration, :default = 1000
            .dimension(states) // set crossfilter dimension, dimension key should match the name retrieved in geo json
                layer
            .group(stateRaisedSum) // set crossfilter group
            // closure used to retrieve x value from multi-value group
            .keyAccessor(function(p) {return p.value.empIncrease;})
            // closure used to retrieve y value from multi-value group
            .valueAccessor(function(p) {return p.value.percentageGain;})
            // (optional) define color function or array for bubbles
            .colors(['#ccc', '#E2F2FF','#C4E4FF','#9ED2FF','#81C5FF','#6BBAFF','#51AEFF','#36A2FF','#1E96FF','#0089FF',
                '#0061B5'])
            // (optional) define color domain to match your data domain if you want to bind data or color
            .colorDomain([-5, 200])
            // (optional) define color value accessor
            .colorAccessor(function(d, i){return d.value;})
            // closure used to retrieve radius value from multi-value group
            .radiusValueAccessor(function(p) {return p.value.totalEmployeePercentage;})
            // set radius scale
            .r(d3.scale.linear().domain([0, 3]))
            // (optional) whether chart should render labels, :default = true
            .renderLabel(true)
            // (optional) closure to generate label per bubble, :default = group.key
            .label(function(p) {return p.key.getFullYear();})
            // (optional) whether chart should render titles, :default = false
            .renderTitle(true)
            // (optional) closure to generate title per bubble, :default = d.key + ': ' + d.value
            .title(function(d) {
                return 'Title: ' + d.key;
            })
            // add data point to it's layer dimension key that matches point name will be used to
            // generate bubble. multiple data points can be added to bubble overlay to generate
            // multiple bubbles
            .point('California', 100, 120)
            .point('Colorado', 300, 120)
            // (optional) setting debug flag to true will generate a transparent layer on top of
            // bubble overlay which can be used to obtain relative x,y coordinate for specific
            // data point, :default = false
            .debug(true);
    */

    //#### Rendering
    //simply call renderAll() to render all charts on the page
    dc.renderAll();
    /*
    // or you can render charts belong to a specific chart group
    dc.renderAll('group');
    // once rendered you can call redrawAll to update charts incrementally when data
    // change without re-rendering everything
    dc.redrawAll();
    // or you can choose to redraw only those charts associated with a specific chart group
    dc.redrawAll('group');
    */

});

//#### Version
//Determine the current version of dc with `dc.version`
d3.selectAll('#version').text(dc.version);
