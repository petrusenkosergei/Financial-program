$(document).ready(function(){
	function dt() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var hours = today.getHours();
        var minutes = today.getMinutes();
        var seconds = today.getSeconds();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        if (seconds < 10) {
            seconds = '0' + seconds
        }
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        if (hours < 10) {
            hours = '0' + hours
        }

        today = mm + '.' + dd + '.' + yyyy + ' ' + hours + ':' + minutes + ':' + seconds;
        $(".section-chart_geolocation-datetime").text(today);
    }
    dt()
    var timerId = setInterval(function() {
    	dt();
	}, 1000);


	ymaps.ready(init);
	function init() {
		geo = ymaps.geolocation;
		city = geo.city;
		country = geo.country;
		$(".section-chart_geolocation-location").append(city+', '+country);
	}
})