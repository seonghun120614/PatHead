'use strict'

class Modal {

    constructor(content, status) {
        this.content = content;
        this.status = false;
    }
    static switch() {
        if (this.status === false) {
            this.status = true;
            document.getElementById('modal_content').textContent = 'hi';
            document.getElementById('modal').style.display = 'block';
        } else {
            this.status = false;
            document.getElementById('modal').style.display = 'none';
        }
    }
}



window.onload = function() {
    for (let i=1; i<4; i++) {document.querySelector('.item:nth-child(' + i + ')').onclick = function(){Modal.switch();}}
    document.querySelector('#modal_button').onclick = function() {Modal.switch();}
}