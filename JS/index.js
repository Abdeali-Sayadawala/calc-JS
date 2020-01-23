document.querySelector('.grid-container').addEventListener('click', addObj);
document.querySelector('.grid-container1').addEventListener('click', addObj);
document.querySelector('.grid-container2').addEventListener('click', addObj);
document.addEventListener('DOMContenrLoaded', showOperations());
let entered = 0;
document.querySelector('.grid-container').addEventListener('click',function(event){
    console.log(input.value);
    if(entered === 1 && event.target.parentElement.classList.contains('fact') !== true){
        input.value = event.target.parentElement.textContent;
        entered = 0;
    }
});
const input = document.querySelector('.inp');
input.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        enter();
    }
});


function tokenize(inputstr){
    let variables = inputstr.split("");
    let varsplit = [''];
    var ln = 0;
    var lnvarsplit = 0;
    while(ln < variables.length){
        if(Number(variables[ln]) || variables[ln] === '0'){
            varsplit[lnvarsplit] = varsplit[lnvarsplit] + variables[ln];
        }else{
            lnvarsplit = lnvarsplit + 1;
            varsplit[lnvarsplit] = variables[ln];
            lnvarsplit = lnvarsplit + 1;
            varsplit[lnvarsplit] = '';
        }
        ln = ln + 1;
    }
    return varsplit;
}

function addObj(e){
    if(e.target.parentElement.classList.contains('grid-item')){
        for (let index = 0; index < 10; index++) {
            if(e.target.textContent == index){
                let fld = input.value + index;
                input.value = fld;
            }            
        }
        if(e.target.textContent == '+'){
            let fld = input.value + '+';
            input.value = fld;
        }
        if(e.target.textContent == '-'){
            let fld = input.value + '-';
            input.value = fld;
        }
        if(e.target.textContent == '/'){
            let fld = input.value + '/';
            input.value = fld;
        }
        if(e.target.textContent == '*'){
            let fld = input.value + '*';
            input.value = fld;
        }
        if(e.target.textContent == '^'){
            let fld = input.value + '^';
            input.value = fld;
        }
        if(e.target.textContent == '^2' && input.value !== ''){
            let ans = Number(input.value) * Number(input.value);
            saveOperation(input.value+'^2 = '+ans);
            input.value = ans;
            entered = 1;
        }
        if(e.target.textContent == '^3' && input.value !== ''){
            let ans = Number(input.value) * Number(input.value) * Number(input.value);
            saveOperation(input.value+'^3 = '+ans);
            input.value = ans;
            entered = 1;
        }
        if(e.target.textContent == 'sqrt' && input.value !== ''){
            let ans = Math.sqrt(Number(input.value));
            saveOperation('sqrt('+input.value+') = '+ans);
            input.value = ans;
            entered = 1;
        }
        if(e.target.textContent == '!' && input.value !== ''){
            console.log(input.value);
            let ans = Number(input.value);
            let n = 1;
            for (let index = 2; index <= ans; index++) {
                n = n * index;
            }
            saveOperation(input.value+'! = '+n);
            input.value = n;
            console.log(input.value);
            entered = 1;
        }
        if(e.target.textContent == '<--' && input.value !== ''){
            let ans = input.value.substring(0, input.value.length - 1);
            input.value = ans;
        }
        if(e.target.textContent == 'Clear' && input.value !== ''){
            input.value = '';
        }
        if(e.target.textContent == 'Enter' && input.value !== ''){
            enter();
            entered = 1;
        }
    }
}
function enter(){
    let varsplit = tokenize(input.value);
    let opstr = input.value;
    while(varsplit.length !== 1){
        while(varsplit.indexOf("^") !== -1){
            var ln = varsplit.indexOf("^");
            varsplit[ln-1] = Math.pow(Number(varsplit[ln-1]),Number(varsplit[ln+1]));
            varsplit.splice(ln, 2);
        }
        while(varsplit.indexOf("/") !== -1){
            var ln = varsplit.indexOf("/");
            varsplit[ln-1] = Number(varsplit[ln-1])/Number(varsplit[ln+1]);
            varsplit.splice(ln, 2);
        }
        while(varsplit.indexOf("*") !== -1){
            var ln = varsplit.indexOf("*");
            varsplit[ln-1] = Number(varsplit[ln-1])*Number(varsplit[ln+1]);
            varsplit.splice(ln, 2);
        }
        while(varsplit.indexOf("+") !== -1){
            var ln = varsplit.indexOf("+");
            varsplit[ln-1] = Number(varsplit[ln-1])+Number(varsplit[ln+1]);
            varsplit.splice(ln, 2);
        }
        while(varsplit.indexOf("-") !== -1){
            var ln = varsplit.indexOf("-");
            varsplit[ln-1] = Number(varsplit[ln-1])-Number(varsplit[ln+1]);
            varsplit.splice(ln, 2);
        }
        ln = ln + 1;
    }
    input.value = varsplit[0];
    opstr = opstr + ' = '+ varsplit[0];
    saveOperation(opstr);
}

function clearinp(event){
    console.log(input.value);
        if(1){
            input.value = event.target.parentElement.textContent;
            console.log(event.target.parentElement);
        }
}

function saveOperation(opstr){
    let ops;
    if(localStorage.getItem('operations') === null){
        ops = [];
    }else{
        ops = JSON.parse(localStorage.getItem('operations'));
    }
    if (ops.length === 10){
        ops.splice(0, 1);
        ops.push(opstr);
        localStorage.setItem('operations', JSON.stringify(ops));
        document.getElementById("operationshere").innerHTML = ``;
        showOperations();
    }else{
        ops.push(opstr);
        localStorage.setItem('operations', JSON.stringify(ops));
        const li = document.createElement('li');
        li.textContent = opstr;
        document.getElementById("operationshere").appendChild(li);
    }
}


function showOperations(){
    let ops;
    if(localStorage.getItem('operations') === null){
        ops = [];
    }else{
        ops = JSON.parse(localStorage.getItem('operations'));
    }
    ops.forEach(function(op){
        const li = document.createElement('li');
        li.textContent = op;
        document.getElementById("operationshere").appendChild(li)
    });

}