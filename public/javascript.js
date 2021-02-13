'use strict'

const study = {"ai":["deep learning", 'reinforcement learning', 'supervised learning', 'unsupervised learning'],
"computer":['c','css','html','java','javascript','python'],
"data technology":['data mining','data processing'],
"math":['calculus','linear algebra','number theorem','set theorem'],
"statistics":["descriptive statistics", "inferential statistics"]};
const rest = ["free","game","life","trip"];


window.onload = function(){

    function showTime() {
        let date = new Date();
        document.getElementById('time').innerHTML = date;
    }
    
    function ChildRemoveAll(id){
        let tag = document.getElementById(id);
        while(tag.childElementCount>1){
            tag.removeChild(tag.lastChild);
        }
    }

    function AddFormOption(select_id, option_list){
        for (let i in option_list) {
            let option = document.createElement('option');
            let option_attr = document.createAttribute('value');
            option_attr.value = option_list[i];
            option.setAttributeNode(option_attr);
            option.innerText = option_list[i];
            document.getElementById(select_id).appendChild(option);
        }
    }

    function showPath(path) {
        document.getElementById('path').innerText = str;
    }

    let topic_evt = document.getElementById('topic');

    topic_evt.addEventListener('change', (event)=>{
        let topic = document.getElementById('topic').value;
        let title = document.getElementById('title').value;
        let path = topic + '/';

        if(topic!=""){

            document.getElementById('field').removeAttribute('class');
            ChildRemoveAll('field');

            if (topic==="study"){
                AddFormOption('field', Object.keys(study));
            } else if(topic==="rest"){
                AddFormOption('field', rest);
            }

        } else {

            document.getElementById('field').setAttribute('class', 'hidden');
            document.getElementById('subject').setAttribute('class', 'hidden');
        }
        document.getElementById('path').value = path;

    });

    let field_evt = document.getElementById('field');

    field_evt.addEventListener('change',(event)=>{
        let field = document.getElementById('field').value;
        let title = document.getElementById('title').value;
        let path = document.getElementById('topic').value + '/' + field + '/';
        
        if (field in study) {

            document.getElementById('subject').removeAttribute('class');
            ChildRemoveAll('subject');
            AddFormOption('subject', study[field]);
            
        } else {
            document.getElementById('subject').setAttribute('class', 'hidden');
        }
        document.getElementById('path').value = path;
    });

    let subject_evt = document.getElementById('subject');

    subject_evt.addEventListener('change',(event)=>{
        let title = document.getElementById('title').value;
        let path = document.getElementById('topic').value + '/' + document.getElementById('field').value+ '/' + document.getElementById('subject').value + '/';
        document.getElementById('path').value = path;
    });

    showTime();
    window.setInterval(showTime, 1000);


}