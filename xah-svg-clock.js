// 2015-04-04 copyright 2015 Xah Lee. If you use the code, please credit and link back http://xahlee.info/js/svg_clock.html

(function() {

    var hourHandLength = 0.45; // ratio to radius of clock
    var minuteHandLength = 0.7; // ratio to radius of clock
    var secHandLength = 0.9; // ratio to radius of clock

    function getHourHandEndCoord (dateObj) {
        // returns a unit vector [x,y]
        var turnRadians = ((dateObj.getHours() % 12) * 60 + dateObj.getMinutes())*Math.PI/360; // counting clockwise from 12. In radians.
        return [ Math.cos(1/2*Math.PI - turnRadians) ,
                 Math.sin(1/2*Math.PI - turnRadians)]; }

    function getMinHandEndCoord (xminutes) {
        // xminutes is 0 to 60
        // returns a unit vector [x,y]
        var turnRadians = xminutes * Math.PI/30; // counting clockwise from 12
        return [ Math.cos(1/2*Math.PI - turnRadians ) ,
                 Math.sin(1/2*Math.PI - turnRadians ) ]; }

    // create a svg tag
    var svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgContainer.setAttribute("viewBox", "-1 -1 2 2");

    var clockFrame = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    clockFrame.setAttribute("cx", 0);
    clockFrame.setAttribute("cy", 0);
    clockFrame.setAttribute("r", .97);
    clockFrame.setAttribute("style", "fill:none;stroke:black; stroke-width:2%");
    svgContainer.appendChild(clockFrame);

    // draw hour marks
    for (var ii = 0;ii < 12; ii++) {
        var jj = 2 * Math.PI / 12 *ii;
        var hourPos = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        hourPos.setAttribute("cx", Math.cos(jj)*.9);
        hourPos.setAttribute("cy", Math.sin(jj)*.9);
        hourPos.setAttribute("r", "3%");
        hourPos.setAttribute("style", "fill:black;stroke:none;");
        svgContainer.appendChild(hourPos);
    }

    // hour hand
    var hourHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    hourHand.setAttribute("x1", 0);
    hourHand.setAttribute("y1", 0);
    hourHand.setAttribute("x2", getHourHandEndCoord(new Date())[0] * hourHandLength);
    hourHand.setAttribute("y2", - getHourHandEndCoord(new Date())[1] * hourHandLength);
    hourHand.setAttribute("style", "stroke:blue; stroke-width:5%;stroke-linecap:round");
    svgContainer.appendChild(hourHand);

    // minute hand
    var minuteHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    minuteHand.setAttribute("x1", 0);
    minuteHand.setAttribute("y1", 0);
    minuteHand.setAttribute("x2", getMinHandEndCoord((new Date()).getMinutes())[0] * minuteHandLength);
    minuteHand.setAttribute("y2", - getMinHandEndCoord((new Date()).getMinutes())[1] * minuteHandLength);
    minuteHand.setAttribute("style", "stroke:red; stroke-width:3%;stroke-linecap:round");
    svgContainer.appendChild(minuteHand);

    // second hand
    var secHand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    secHand.setAttribute("x1", 0);
    secHand.setAttribute("y1", 0);
    secHand.setAttribute("x2", getMinHandEndCoord((new Date()).getSeconds())[0] * secHandLength);
    secHand.setAttribute("y2", - getMinHandEndCoord((new Date()).getSeconds())[1] * secHandLength);
    secHand.setAttribute("style", "stroke:black; stroke-width:1%;stroke-linecap:round");
    svgContainer.appendChild(secHand);

    // attach container to document
    document.getElementById("svgclock68390").appendChild(svgContainer);

    function updateClock () {

        var dd = new Date();
        var secCoord = getMinHandEndCoord(dd.getSeconds());
        var minCoord = getMinHandEndCoord(dd.getMinutes());

        secHand.setAttribute("x2", secCoord[0] * secHandLength);
        secHand.setAttribute("y2", - secCoord[1] * secHandLength);
        minuteHand.setAttribute("x2", minCoord[0] * minuteHandLength);
        minuteHand.setAttribute("y2", - minCoord[1] * minuteHandLength);
        hourHand.setAttribute("x2", getHourHandEndCoord(dd)[0] * hourHandLength);
        hourHand.setAttribute("y2", - getHourHandEndCoord(dd)[1] * hourHandLength);

    }

    setInterval(updateClock, 1000);

})();
