function getParam(name){
    var value = null;
    try {
        var param_str = mnst_url.value;
        var params = param_str.split('?')[1].split('&');
        params.forEach(function(param){
          pair = param.split('=');
          if(pair[0] === name){ value = pair[1]; }
        });
    } catch {
    }
    
    return value;
}

function getPassCode(){
    return getParam("pass_code");
}

function getTarget(){
    return getParam("target");
}
  
function getG(){
    return getParam("g");
}

let mnst_url = document.getElementById('mnst-url');

let msg = document.getElementById('msg');
let div_pass_code = document.getElementById('pass_code');
let div_target = document.getElementById('target');
let div_g = document.getElementById('g');

let genButton = document.getElementById('genButton');
genButton.addEventListener('click', onClick);

let link = document.getElementById('join');

function generate(pass_code, target, g) {
    var schema;
    if(pass_code === null) {
      schema = 'monsterstrike-app://';
    } else if(target === null || target == "stage") {
      schema = 'monsterstrike-app://joingame/?join=' + pass_code;
    } else if(target == "gacha") {
      schema = 'monsterstrike-app://joingacha/?join=' + pass_code + '&g=' + g;
    } else {
      schema = 'monsterstrike-app://';
    }
    return schema
}

function onClick(){
    var pass_code = getPassCode();
    var target = getTarget();
    var g = getG();
    if ( pass_code ) {
        schema = generate(pass_code, target, g);
        link.setAttribute('href', schema);
        msg.innerText = '読み込んだURL: ' + mnst_url.value;
        div_pass_code.innerText = 'pass_code: ' + pass_code;
        div_target.innerText = 'target: ' + target;
        div_g.innerText = 'g: ' + g;
    } else {
        msg.innerText = 'なにかがおかしいです';
        link.setAttribute('href', "");
    }
}
