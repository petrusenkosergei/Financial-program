document.addEventListener('DOMContentLoaded', function(){


var logo = document.getElementById('als-logo');

function changeBackground(color) {
    logo.style.backgroundColor = color;
}

function getRandomColor () {

    var hex = Math.floor(Math.random() * 0xFFFFFF);
    return "#" + ("000000" + hex.toString(16)).substr(-6);
}

logo.addEventListener('mouseenter', function()
{
    logo.classList.remove('section-logo__logo-team');
    console.log('1')
    changeBackground(getRandomColor());
    setTimeout(function(){logo.classList.add('section-logo__logo-team');},100);
});

setInterval(function(){
    changeBackground(getRandomColor());
}, 1000)

});





