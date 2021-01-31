'use strict'

class Modal {
    constructor(status) {
        this.status = false;
    }

    static switch() {
        if (this.status === false) {
            this.status = true;
            document.getElementById('modal').style.display = 'block';
        } else {
            this.status = false;
            document.getElementById('modal').style.display = 'none';
        }
    }
}



window.onload = function() {
    let data;
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'Data.json');
    alert(ourRequest.responseText);


    for (let i=1; i<4; i++) {document.querySelector('.item:nth-child(' + i + ')').onclick = function(){
        Modal.switch();
        switch (i) {
            case 1 :
                readTextFile("Data/Study/index.txt");
                break;
            case 2 :
                readTextFile("Data/Rest/index.txt");
                break;
            case 3 :
                readTextFile("Data/Inf/index.txt");
                break;
        }
    }}
    document.querySelector('#modal_button').onclick = function() {Modal.switch();}
}