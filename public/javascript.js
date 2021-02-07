'use strict'

function show_Contents(title, description){
    document.getElementById('title').innerHTML = title;
    let _description = '<ul>';
    if (typeof(description)==="object"){
        for (let i in description){
            _description = _description + "<li>" +i+"</li>";
        }
        _description = _description + "</ul>";
        document.getElementById('description').innerHTML = description;
    }else {
        document.getElementById('description').innerHTML = description;
    }
}

function write_Path(e){
    let menu=['rest','study'];

    let rest=['free', 'game', 'life', 'style', 'trip'];
    let study = ['ai','computer','data technology','math','statistics'];

    let ai = ['deep learning', 'reinforcement learning', 'supervised learning', 'unsupervised learning'];
    let computer = ['c', 'css', 'html', 'java', 'javascript', 'python'];
    let data_technology = ['data mining', 'data processing'];
    let math = ['calculus', 'linear algebra', 'number theorem', 'set theorem'];
    let statistics = ['inferential statistics', 'descriptive statistics'];


    if(e.value in menu){}
    else if(e.value in study){}
};

window.onload = function(){
    document.querySelector('#button').onclick = function(){show_Contents('hellow','hi')};
    document.querySelector('#menu').setAttribute( 'onchange', 'write_Path(this)' )
}