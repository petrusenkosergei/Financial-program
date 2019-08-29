$(document).ready(function(){
	var data1 = []
	var data2 = []
	var labels = []
	for (var i = 0; i < 23; i++) {
		labels.push('')
	}
    var labels = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
    data1 = [400797.5155, 408068.2097, 399203.8036, 383583.7420, 392660.3130, 392873.9453, 427699.6271, 404514.7741, 395397.0634, 395731.7736, 395731.7736, 372993.2547, 405689.3456, 458142.9350, 448136.0260, 467563.6111, 483406.3264, 493889.0297, 506408.4778, 497422.5654, 510034.5372, 493114.7023]
    data2 = [345, 600, 900, 700, 355, 458, 854, 345, 457, 854, 124, 320, 800, 365, 102, 352, 855, 125, 354, 700]
	var data1_change = Math.round((data1[data1.length - 1] - data1[0])*100)/100;
	if(data1_change >= 0){
		$('.section-chart_graph-info_differiance').addClass('plus');
		$('.section-chart_graph-info_differiance').append('<p>'+Math.abs(data1_change)+'</p>');
	}else{
		$('.section-chart_graph-info_differiance').addClass('minus');
		$('.section-chart_graph-info_differiance').append('<p>'+Math.abs(data1_change)+'</p>');
	}
	var data2_change1 = Math.round((data1[data2.length - 1] - data2[0])*100)/100
	var data2_change2 = Math.round((data2[data2.length - 1]/data2[0])*10000)/100
	if(data2_change1 >= 0){
		$('.section-chart_graph-info_ratio').append('<p>+'+data2_change1+'('+data2_change2+'%)'+'</p>');
	}else{
		$('.section-chart_graph-info_ratio').append('<p>-'+Math.abs(data2_change1)+'('+Math.abs(data2_change2)+'%)'+'</p>');
    }


    //начало расчеты третей графы
    var shares = 0;
    for(i=0; i<data2.length; i++){
        shares += data2[i];
    }
    function dig_abbr(digit){
        abbr = ['', ' K', ' M', ' B', ' T'];
        for(i=0, dig=digit; dig>=1000; i++, dig=dig/1000){}
        return (Math.round(dig*10)/10).toString()+abbr[i];
    }
    $('.section-chart_information-sharestraded_summa').text(dig_abbr(shares));
    $('.section-chart_information-marcetcup_market').text(dig_abbr(shares*data1[data1.length - 1]));


	//конец третей графы
	var chart_line = document.getElementById("chart_line");
	var ctx1 = chart_line.getContext("2d");
	var diagramm = document.getElementById("diagramm");
	var ctx2 = diagramm.getContext("2d");
    var diagramm_apple = document.getElementById("diagramm_apple");
    var ctx3 = diagramm_apple.getContext("2d");
	var options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        pointLabels: {
            display: false
        },
        scales: {
            Axes: [{
                display: false
            }],
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false,
                ticks: {
                    beginAtZero: false
                }
            }]
        }
    }
	var myChart1 = new Chart(ctx1, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [{
				pointHitRadius: 10,
				pointHitDetectionRadius: 3,
				pointRadius: 0,
				lineTension: 0,
				label: '',
				data: data1,
				backgroundColor: ['rgba(0, 0, 0, 0)',],
				borderColor: ['white',],
				borderWidth: 4,
			}]
		},
		options: options
	});


	var myChart2 = new Chart(ctx2, {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				lineTension: 0,
				label: false,
				data: data2,
				borderWidth: 1
			}]
		},
		options: options
	});
	var labels3 = [];
	var data3 = [];

	// третий график

    for (var i = 0; i < 9; i++) {

        labels3.push('')
    }
    data3 = [20, 80, 100, 300, 100];
    for(i=0;i<4;i++){
        data3.push(Math.random() * (200 - 20) + 20);
    }

    var myChart3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: labels3,
            datasets: [{
                lineTension: 0,
                label: false,
                data: data3,
                borderWidth: 1,
                backgroundColor: ["#e55f3b", "#e55f3b","#e55f3b","#e55f3b","#e55f3b", "#4daf7b", "#4daf7b", "#4daf7b", "#4daf7b"]
            }]
        },
        options: options
    });
// конец третий график


    // последнее вычесление

    var data3_change1 = Math.round((data3[data3.length - 1] - data3[7])*100)/100
    var data3_change2 = Math.round((data3[data3.length - 1]/data3[7])*10000)/100
    if(data3_change1 >= 0){
        $('.section-chart_stock-differiance_yearlychange_summa').append('<p>+'+data3_change1+'</p>');
    }else{
        $('.section-chart_stock-differiance_yearlychange_summa').append('<p>-'+Math.abs(data3_change1)+'</p>');

    }
	// конец последнего вычесления






	// модальное окно

	var point;
	chart_line.onclick = function (evt) {
		point = myChart1.getElementAtEvent(evt);
		$('[name = text]').val(myChart1.data.datasets[0].data[point[0]._index]);
		$('.section-chart_modal-form_overlay').fadeIn(800, // снaчaлa плaвнo пoкaзывaем пoдлoжку
		 	function(){ // пoсле выпoлнения предыдущей aнимaции
				$('.section-chart_modal-form')
					.css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
					.animate({opacity: 1, top: '65%'}, 800); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
		});
	};
	$('.section-chart_modal-form_modal_close, .section-chart_modal-form_overlay').click( function(){ // лoвим клик пo крестику или пoдлoжке
		$('.section-chart_modal-form')
			.animate({opacity: 0, top: '45%'}, 800,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
				function(){ // пoсле aнимaции
					$(this).css('display', 'none'); // делaем ему display: none;
					$('.section-chart_modal-form_overlay').fadeOut(1000); // скрывaем пoдлoжку
				}
			);
	});
	$('[type = submit]').click( function(){ // лoвим клик пo крестику или пoдлoжке
		$('.section-chart_modal-form')
			.animate({opacity: 0, top: '45%'}, 800,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
				function(){ // пoсле aнимaции
					$(this).css('display', 'none'); // делaем ему display: none;
					$('.section-chart_modal-form_overlay').fadeOut(1000); // скрывaем пoдлoжку
				}
			);
		myChart1.data.datasets[0].data[point[0]._index] = $('[name = text]').val();
		myChart1.update();
	});
})

	// конец модальное окно