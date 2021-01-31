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

    function DataParsing(path, content_num) {
        var request = new XMLHttpRequest();
        request.open('GET', 'https://seonghun120614.github.io/PatHead/Data.json');
        request.responseType = 'json';
        request.send()
        request.onload = function(){
            const data = request.response;
            const Menu = data[path]["menu"];
            const content = data[path]["content"][content_num];
            const title = content['title'];
            const paragraph = content['paragraph'];
            const info = content['info'];

            let show = `<h2>${title}</h2><hr>`
            for (let i=0; i<paragraph.length; i++){
                show =show + paragraph[i] + "<hr>";
            }
            
            let menu = '<ol>';
            for (let i=0;i<Menu.length;i++) {
                menu = menu + Menu[i];
            }
            menu = menu + '</ol>';
            
            document.getElementById('modal_article').innerHTML = show;
            document.getElementById('menu').innerHTML = menu;
            document.getElementById('modal_footer').innerHTML = `${info.date}<br>${info.mind}`;
        }
    }

    for (let i=1; i<4; i++) {document.querySelector('.item:nth-child(' + i + ')').onclick = function(){
        Modal.switch();
        switch (i) {
            case 1 :
                DataParsing("Study","0");
                break;
            case 2 :
                DataParsing("Rest","0");
                break;
            case 3 :
                break;
        }
    }}
    document.querySelector('#modal_button').onclick = function() {Modal.switch();}
}