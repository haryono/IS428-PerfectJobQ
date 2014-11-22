var finalData = [];
var selectYear = 2013;
    var data = [];
    var data01 = [];
    var data02 = [];
    var data03 = [];
    var data04 = [];
    var data05 = [];
    var data06 = [];
    var data07 = [];
    var data08 = [];
    var data09 = []

RadarChart.defaultConfig.color = function() {};
RadarChart.defaultConfig.radius = 3;

var data = [
  {
    className: 'good', // optional can be used for styling
    axes: [
      {axis: "Salary", value: 13}, 
      {axis: "Working Hours", value: 6}, 
      {axis: "Annual Leave", value: 5},  
      {axis: "Over Time Hours", value: 9},  
      {axis: "TurnOverRate", value: 2}
    ]
  },
  {
    className: 'ProfessionalService',
    axes: [
      {axis: "Salary", value: 6}, 
      {axis: "Working Hours", value: 7}, 
      {axis: "Annual Leave", value: 10},  
      {axis: "Over Time Hours", value: 13},  
      {axis: "TurnOverRate", value: 9}
    ]
  }
];

    data01 = [{"className":"Manufacturing","year":2005,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":10},{"axis":"OT/Week","value":6},{"axis":"Income","value":5}]},{"className":"Construction","year":2005,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":10},{"axis":"OT/Week","value":3},{"axis":"Income","value":3}]},{"className":"Services","year":2005,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":10},{"axis":"Income","value":4}]},{"className":"Wholesale &amp; Retail Trade","year":2005,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":3},{"axis":"Income","value":4}]},{"className":"Transportation and Storage","year":2005,"axes":[{"axis":"Bonus Quantum","value":9},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":4},{"axis":"OT/Week","value":3},{"axis":"Income","value":4}]},{"className":"Accomodation and Food Services","year":2005,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":10},{"axis":"Working Hour/Week","value":3},{"axis":"OT/Week","value":1},{"axis":"Income","value":1}]},{"className":"Information and Communications","year":2005,"axes":[{"axis":"Bonus Quantum","value":7},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":2},{"axis":"Income","value":6}]},{"className":"Financial and Insurance Services","year":2005,"axes":[{"axis":"Bonus Quantum","value":10},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":3},{"axis":"Income","value":10}]},{"className":"Real Estate Services","year":2005,"axes":[{"axis":"Bonus Quantum","value":2},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":3},{"axis":"OT/Week","value":2},{"axis":"Income","value":3}]},{"className":"Professional Services","year":2005,"axes":[{"axis":"Bonus Quantum","value":5},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":1},{"axis":"Income","value":6}]}];
    data02 = [{"className":"Manufacturing","year":2006,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":10},{"axis":"Working Hour/Week","value":10},{"axis":"OT/Week","value":4},{"axis":"Income","value":5}]},{"className":"Construction","year":2006,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":10},{"axis":"Working Hour/Week","value":10},{"axis":"OT/Week","value":2},{"axis":"Income","value":3}]},{"className":"Services","year":2006,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":4},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":10},{"axis":"Income","value":4}]},{"className":"Wholesale &amp; Retail Trade","year":2006,"axes":[{"axis":"Bonus Quantum","value":5},{"axis":"Danger","value":4},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":1},{"axis":"Income","value":3}]},{"className":"Transportation and Storage","year":2006,"axes":[{"axis":"Bonus Quantum","value":8},{"axis":"Danger","value":6},{"axis":"Working Hour/Week","value":4},{"axis":"OT/Week","value":1},{"axis":"Income","value":4}]},{"className":"Accomodation and Food Services","year":2006,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":1},{"axis":"Income","value":1}]},{"className":"Information and Communications","year":2006,"axes":[{"axis":"Bonus Quantum","value":8},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":1},{"axis":"Income","value":6}]},{"className":"Financial and Insurance Services","year":2006,"axes":[{"axis":"Bonus Quantum","value":10},{"axis":"Danger","value":4},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":1},{"axis":"Income","value":10}]},{"className":"Real Estate Services","year":2006,"axes":[{"axis":"Bonus Quantum","value":2},{"axis":"Danger","value":4},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":1},{"axis":"Income","value":3}]},{"className":"Professional Services","year":2006,"axes":[{"axis":"Bonus Quantum","value":5},{"axis":"Danger","value":5},{"axis":"Working Hour/Week","value":3},{"axis":"OT/Week","value":1},{"axis":"Income","value":5}]},{"className":"Administrative and Support Services","year":2006,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":9},{"axis":"Working Hour/Week","value":7},{"axis":"OT/Week","value":2},{"axis":"Income","value":2}]},{"className":"Community &amp; Personal Services","year":2006,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":3},{"axis":"Income","value":4}]}];
    data03 = [{"className":"Manufacturing","year":2007,"axes":[{"axis":"Bonus Quantum","value":4},{"axis":"Danger","value":9},{"axis":"Working Hour/Week","value":10},{"axis":"OT/Week","value":4},{"axis":"Income","value":4}]},{"className":"Construction","year":2007,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":10},{"axis":"Working Hour/Week","value":10},{"axis":"OT/Week","value":2},{"axis":"Income","value":2}]},{"className":"Services","year":2007,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":10},{"axis":"Income","value":4}]},{"className":"Wholesale &amp; Retail Trade","year":2007,"axes":[{"axis":"Bonus Quantum","value":7},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":2},{"axis":"Income","value":3}]},{"className":"Transportation and Storage","year":2007,"axes":[{"axis":"Bonus Quantum","value":9},{"axis":"Danger","value":5},{"axis":"Working Hour/Week","value":4},{"axis":"OT/Week","value":1},{"axis":"Income","value":4}]},{"className":"Accomodation and Food Services","year":2007,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":1},{"axis":"Income","value":1}]},{"className":"Information and Communications","year":2007,"axes":[{"axis":"Bonus Quantum","value":8},{"axis":"Danger","value":2},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":1},{"axis":"Income","value":6}]},{"className":"Financial and Insurance Services","year":2007,"axes":[{"axis":"Bonus Quantum","value":10},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":2},{"axis":"Income","value":10}]},{"className":"Real Estate Services","year":2007,"axes":[{"axis":"Bonus Quantum","value":3},{"axis":"Danger","value":4},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":1},{"axis":"Income","value":4}]},{"className":"Professional Services","year":2007,"axes":[{"axis":"Bonus Quantum","value":4},{"axis":"Danger","value":4},{"axis":"Working Hour/Week","value":3},{"axis":"OT/Week","value":2},{"axis":"Income","value":5}]},{"className":"Administrative and Support Services","year":2007,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":9},{"axis":"Working Hour/Week","value":9},{"axis":"OT/Week","value":2},{"axis":"Income","value":2}]},{"className":"Community &amp; Personal Services","year":2007,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":2},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":4},{"axis":"Income","value":4}]}];
    data04 = [{"className":"Manufacturing","year":2008,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":9},{"axis":"Working Hour/Week","value":10},{"axis":"OT/Week","value":3},{"axis":"Income","value":4}]},{"className":"Construction","year":2008,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":10},{"axis":"Working Hour/Week","value":10},{"axis":"OT/Week","value":3},{"axis":"Income","value":3}]},{"className":"Services","year":2008,"axes":[{"axis":"Bonus Quantum","value":5},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":10},{"axis":"Income","value":4}]},{"className":"Wholesale &amp; Retail Trade","year":2008,"axes":[{"axis":"Bonus Quantum","value":4},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":3},{"axis":"OT/Week","value":1},{"axis":"Income","value":3}]},{"className":"Transportation and Storage","year":2008,"axes":[{"axis":"Bonus Quantum","value":8},{"axis":"Danger","value":5},{"axis":"Working Hour/Week","value":4},{"axis":"OT/Week","value":1},{"axis":"Income","value":4}]},{"className":"Accomodation and Food Services","year":2008,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":1},{"axis":"Income","value":1}]},{"className":"Information and Communications","year":2008,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":2},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":1},{"axis":"Income","value":6}]},{"className":"Financial and Insurance Services","year":2008,"axes":[{"axis":"Bonus Quantum","value":10},{"axis":"Danger","value":2},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":1},{"axis":"Income","value":10}]},{"className":"Real Estate Services","year":2008,"axes":[{"axis":"Bonus Quantum","value":2},{"axis":"Danger","value":4},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":1},{"axis":"Income","value":4}]},{"className":"Professional Services","year":2008,"axes":[{"axis":"Bonus Quantum","value":5},{"axis":"Danger","value":4},{"axis":"Working Hour/Week","value":4},{"axis":"OT/Week","value":1},{"axis":"Income","value":5}]},{"className":"Administrative and Support Services","year":2008,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":8},{"axis":"Working Hour/Week","value":7},{"axis":"OT/Week","value":1},{"axis":"Income","value":2}]},{"className":"Community &amp; Personal Services","year":2008,"axes":[{"axis":"Bonus Quantum","value":5},{"axis":"Danger","value":2},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":3},{"axis":"Income","value":4}]}];
    data05 = [{"className":"Manufacturing","year":2009,"axes":[{"axis":"Bonus Quantum","value":7},{"axis":"Danger","value":7},{"axis":"Working Hour/Week","value":7},{"axis":"OT/Week","value":1},{"axis":"Income","value":5}]},{"className":"Construction","year":2009,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":10},{"axis":"Working Hour/Week","value":10},{"axis":"OT/Week","value":10},{"axis":"Income","value":3}]},{"className":"Services","year":2009,"axes":[{"axis":"Bonus Quantum","value":5},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":9},{"axis":"Income","value":4}]},{"className":"Wholesale &amp; Retail Trade","year":2009,"axes":[{"axis":"Bonus Quantum","value":4},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":7},{"axis":"Income","value":4}]},{"className":"Transportation and Storage","year":2009,"axes":[{"axis":"Bonus Quantum","value":8},{"axis":"Danger","value":4},{"axis":"Working Hour/Week","value":3},{"axis":"OT/Week","value":7},{"axis":"Income","value":5}]},{"className":"Accomodation and Food Services","year":2009,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":6},{"axis":"Income","value":1}]},{"className":"Information and Communications","year":2009,"axes":[{"axis":"Bonus Quantum","value":7},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":7},{"axis":"Income","value":6}]},{"className":"Financial and Insurance Services","year":2009,"axes":[{"axis":"Bonus Quantum","value":10},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":7},{"axis":"Income","value":10}]},{"className":"Real Estate Services","year":2009,"axes":[{"axis":"Bonus Quantum","value":3},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":3},{"axis":"OT/Week","value":7},{"axis":"Income","value":4}]},{"className":"Professional Services","year":2009,"axes":[{"axis":"Bonus Quantum","value":4},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":3},{"axis":"OT/Week","value":7},{"axis":"Income","value":6}]},{"className":"Administrative and Support Services","year":2009,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":6},{"axis":"Working Hour/Week","value":6},{"axis":"OT/Week","value":7},{"axis":"Income","value":2}]},{"className":"Community &amp; Personal Services","year":2009,"axes":[{"axis":"Bonus Quantum","value":5},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":10},{"axis":"Income","value":4}]}];
    data06 = [{"className":"Manufacturing","year":2010,"axes":[{"axis":"Bonus Quantum","value":7},{"axis":"Danger","value":9},{"axis":"Working Hour/Week","value":10},{"axis":"OT/Week","value":2},{"axis":"Income","value":5}]},{"className":"Construction","year":2010,"axes":[{"axis":"Bonus Quantum","value":2},{"axis":"Danger","value":10},{"axis":"Working Hour/Week","value":10},{"axis":"OT/Week","value":1},{"axis":"Income","value":3}]},{"className":"Services","year":2010,"axes":[{"axis":"Bonus Quantum","value":5},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":10},{"axis":"Income","value":4}]},{"className":"Wholesale &amp; Retail Trade","year":2010,"axes":[{"axis":"Bonus Quantum","value":4},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":3},{"axis":"OT/Week","value":1},{"axis":"Income","value":3}]},{"className":"Transportation and Storage","year":2010,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":5},{"axis":"Working Hour/Week","value":4},{"axis":"OT/Week","value":1},{"axis":"Income","value":4}]},{"className":"Accomodation and Food Services","year":2010,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":1},{"axis":"Income","value":1}]},{"className":"Information and Communications","year":2010,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":1},{"axis":"Income","value":5}]},{"className":"Financial and Insurance Services","year":2010,"axes":[{"axis":"Bonus Quantum","value":10},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":2},{"axis":"Income","value":10}]},{"className":"Real Estate Services","year":2010,"axes":[{"axis":"Bonus Quantum","value":3},{"axis":"Danger","value":4},{"axis":"Working Hour/Week","value":3},{"axis":"OT/Week","value":2},{"axis":"Income","value":3}]},{"className":"Professional Services","year":2010,"axes":[{"axis":"Bonus Quantum","value":5},{"axis":"Danger","value":2},{"axis":"Working Hour/Week","value":3},{"axis":"OT/Week","value":1},{"axis":"Income","value":5}]},{"className":"Administrative and Support Services","year":2010,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":7},{"axis":"Working Hour/Week","value":8},{"axis":"OT/Week","value":2},{"axis":"Income","value":2}]},{"className":"Community &amp; Personal Services","year":2010,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":4},{"axis":"Income","value":4}]}];
    data07 = [{"className":"Manufacturing","year":2011,"axes":[{"axis":"Bonus Quantum","value":7},{"axis":"Danger","value":9},{"axis":"Working Hour/Week","value":9},{"axis":"OT/Week","value":1},{"axis":"Income","value":4}]},{"className":"Construction","year":2011,"axes":[{"axis":"Bonus Quantum","value":2},{"axis":"Danger","value":10},{"axis":"Working Hour/Week","value":10},{"axis":"OT/Week","value":1},{"axis":"Income","value":3}]},{"className":"Services","year":2011,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":2},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":10},{"axis":"Income","value":4}]},{"className":"Wholesale &amp; Retail Trade","year":2011,"axes":[{"axis":"Bonus Quantum","value":5},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":2},{"axis":"Income","value":4}]},{"className":"Transportation and Storage","year":2011,"axes":[{"axis":"Bonus Quantum","value":8},{"axis":"Danger","value":5},{"axis":"Working Hour/Week","value":4},{"axis":"OT/Week","value":1},{"axis":"Income","value":4}]},{"className":"Accomodation and Food Services","year":2011,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":1},{"axis":"Income","value":1}]},{"className":"Information and Communications","year":2011,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":1},{"axis":"Income","value":6}]},{"className":"Financial and Insurance Services","year":2011,"axes":[{"axis":"Bonus Quantum","value":10},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":2},{"axis":"Income","value":10}]},{"className":"Real Estate Services","year":2011,"axes":[{"axis":"Bonus Quantum","value":9},{"axis":"Danger","value":4},{"axis":"Working Hour/Week","value":3},{"axis":"OT/Week","value":1},{"axis":"Income","value":3}]},{"className":"Professional Services","year":2011,"axes":[{"axis":"Bonus Quantum","value":10},{"axis":"Danger","value":2},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":2},{"axis":"Income","value":6}]},{"className":"Administrative and Support Services","year":2011,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":7},{"axis":"Working Hour/Week","value":7},{"axis":"OT/Week","value":1},{"axis":"Income","value":1}]},{"className":"Community &amp; Personal Services","year":2011,"axes":[{"axis":"Bonus Quantum","value":10},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":4},{"axis":"Income","value":4}]},{"className":"Manufacturing","year":2012,"axes":[{"axis":"Bonus Quantum","value":7},{"axis":"Danger","value":8},{"axis":"Working Hour/Week","value":9},{"axis":"OT/Week","value":2},{"axis":"Income","value":4}]},{"className":"Construction","year":2012,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":10},{"axis":"Working Hour/Week","value":10},{"axis":"OT/Week","value":6},{"axis":"Income","value":3}]}];
    data08 = [{"className":"Services","year":2012,"axes":[{"axis":"Bonus Quantum","value":5},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":10},{"axis":"Income","value":4}]},{"className":"Wholesale &amp; Retail Trade","year":2012,"axes":[{"axis":"Bonus Quantum","value":5},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":1},{"axis":"Income","value":4}]},{"className":"Transportation and Storage","year":2012,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":5},{"axis":"Working Hour/Week","value":4},{"axis":"OT/Week","value":2},{"axis":"Income","value":4}]},{"className":"Accomodation and Food Services","year":2012,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":1},{"axis":"Income","value":1}]},{"className":"Information and Communications","year":2012,"axes":[{"axis":"Bonus Quantum","value":3},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":1},{"axis":"Income","value":6}]},{"className":"Financial and Insurance Services","year":2012,"axes":[{"axis":"Bonus Quantum","value":7},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":1},{"axis":"Income","value":10}]},{"className":"Real Estate Services","year":2012,"axes":[{"axis":"Bonus Quantum","value":2},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":3},{"axis":"OT/Week","value":2},{"axis":"Income","value":3}]},{"className":"Professional Services","year":2012,"axes":[{"axis":"Bonus Quantum","value":2},{"axis":"Danger","value":2},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":1},{"axis":"Income","value":6}]},{"className":"Administrative and Support Services","year":2012,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":7},{"axis":"Working Hour/Week","value":8},{"axis":"OT/Week","value":3},{"axis":"Income","value":1}]},{"className":"Community &amp; Personal Services","year":2012,"axes":[{"axis":"Bonus Quantum","value":8},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":6},{"axis":"Income","value":4}]}];
    data09 = [{"className":"Manufacturing","year":2013,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":8},{"axis":"Working Hour/Week","value":9},{"axis":"OT/Week","value":1},{"axis":"Income","value":4}]},{"className":"Construction","year":2013,"axes":[{"axis":"Bonus Quantum","value":2},{"axis":"Danger","value":10},{"axis":"Working Hour/Week","value":10},{"axis":"OT/Week","value":5},{"axis":"Income","value":3}]},{"className":"Services","year":2013,"axes":[{"axis":"Bonus Quantum","value":5},{"axis":"Danger","value":2},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":10},{"axis":"Income","value":4}]},{"className":"Wholesale &amp; Retail Trade","year":2013,"axes":[{"axis":"Bonus Quantum","value":5},{"axis":"Danger","value":2},{"axis":"Working Hour/Week","value":2},{"axis":"OT/Week","value":2},{"axis":"Income","value":3}]},{"className":"Transportation and Storage","year":2013,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":4},{"axis":"Working Hour/Week","value":4},{"axis":"OT/Week","value":2},{"axis":"Income","value":4}]},{"className":"Accomodation and Food Services","year":2013,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":2},{"axis":"Working Hour/Week","value":3},{"axis":"OT/Week","value":1},{"axis":"Income","value":1}]},{"className":"Information and Communications","year":2013,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":2},{"axis":"Income","value":6}]},{"className":"Financial and Insurance Services","year":2013,"axes":[{"axis":"Bonus Quantum","value":10},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":2},{"axis":"Income","value":10}]},{"className":"Real Estate Services","year":2013,"axes":[{"axis":"Bonus Quantum","value":4},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":3},{"axis":"OT/Week","value":1},{"axis":"Income","value":3}]},{"className":"Professional Services","year":2013,"axes":[{"axis":"Bonus Quantum","value":5},{"axis":"Danger","value":3},{"axis":"Working Hour/Week","value":3},{"axis":"OT/Week","value":3},{"axis":"Income","value":6}]},{"className":"Administrative and Support Services","year":2013,"axes":[{"axis":"Bonus Quantum","value":1},{"axis":"Danger","value":6},{"axis":"Working Hour/Week","value":6},{"axis":"OT/Week","value":2},{"axis":"Income","value":1}]},{"className":"Community &amp; Personal Services","year":2013,"axes":[{"axis":"Bonus Quantum","value":6},{"axis":"Danger","value":1},{"axis":"Working Hour/Week","value":1},{"axis":"OT/Week","value":4},{"axis":"Income","value":4}]}];

    finalData = data09;
    RadarChart.draw(".chart-container", finalData);


var chart = RadarChart.chart();
var cfg = chart.config(); // retrieve default config

chart.config({w: cfg.w / 4, h: cfg.h / 4, axisText: false, levels: 0, circles: false});
cfg = chart.config();

    function changeYear(){
      //document.getElementById("year").innerHTML = document.getElementById("changeYear").innerHTML;
      selectYear = document.getElementById('changeYear').innerHTML;

      if( selectYear == ""){
        finalData = [];
      }else if(selectYear == 2005){
        finalData = data01;
      }else if(selectYear == 2006){
        finalData = data02;
      }else if(selectYear == 2007){
        finalData = data03;
      }else if(selectYear == 2008){
        finalData = data04;
      }else if(selectYear == 2009){
        finalData = data05;
      }else if(selectYear == 2010){
        finalData = data06;
      }else if(selectYear == 2011){
        finalData = data07;
      }else if(selectYear == 2012){
        finalData = data08;
      }else{
        finalData = data09;
      }
        RadarChart.draw(".chart-container", finalData);
    };