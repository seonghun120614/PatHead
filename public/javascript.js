'use strict'

window.onload = function(){
    window.setInterval(showTime, 1000);

    function showTime() {
        let date = new Date();
        document.getElementById('time').innerHTML = date;
    }

    function formOption(){
        
    }
}