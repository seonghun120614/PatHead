'use strict'

let modal_status = false;

function modal_switch() {
    if (modal_status === false) {
        modal_status = true;
        document.getElementById('modal').style.display = 'block';
    } else {
        modal_status = false;
        document.getElementById('modal').style.display = 'none';
    }
}

window.onload = function() {
    document.querySelector('.item').onclick = function() {
        modal_switch();
    }
    document.querySelector('#modal_button').onclick = function() {
        modal_switch();
    }
}