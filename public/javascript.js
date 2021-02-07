var request = new XMLHttpRequest();

async function take_out(url){
    request.open('GET', url);
    request.responseType = 'Json'
}
