document.querySelector('.grid-container').addEventListener('click', addObj);
document.querySelector('.grid-container1').addEventListener('click', addObj);
document.querySelector('.grid-container2').addEventListener('click', addObj);
const input = document.querySelector('.inp');


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
        if(e.target.textContent == '^2' && input.value !== ''){
            let ans = Number(input.value) * Number(input.value);
            input.value = ans;
        }
        if(e.target.textContent == '^3' && input.value !== ''){
            let ans = Number(input.value) * Number(input.value) * Number(input.value);
            input.value = ans;
        }
        if(e.target.textContent == 'sqrt' && input.value !== ''){
            let ans = Math.sqrt(Number(input.value));
            input.value = ans;
        }
        if(e.target.textContent == '!' && input.value !== ''){
            let ans = Number(input.value);
            let n = 1;
            for (let index = 2; index <= ans; index++) {
                n = n * index;
                
            }
            input.value = n;
        }
        if(e.target.textContent == 'Clear' && input.value !== ''){
            input.value = '';
        }
        if(e.target.textContent == 'Enter' && input.value !== ''){
            let varsplit = tokenize(input.value);
            while(varsplit.length !== 1){
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
        }
    }
}