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


window.onload = function(){
    document.querySelector('#button').onclick = function(){show_Contents('hellow','hi')};
}