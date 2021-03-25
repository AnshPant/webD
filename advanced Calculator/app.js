

var screen = document.getElementById('screen');
buttons = document.querySelectorAll('button');
let screenValue = '';
for (item of buttons) {
    item.addEventListener('click', (e) => {
        buttonText = e.target.innerText;

        if (buttonText == '*') {
            
            screenValue += buttonText;
            screen.value = screenValue;
        }
        else if (buttonText == 'AC') {
            screenValue = "";
            screen.value = screenValue;
        }
        else if (buttonText == '=') {
            screen.value = eval(screenValue);
            screenValue = screenValue ;
            
        }
        else if(buttonText == 'DEL'){
            screenValue = screenValue.slice(0,-1);
            screen.value = screenValue;
        }
        
        else {
            screenValue += buttonText;
            screen.value = screenValue;
        }

    })
}

document.addEventListener("keypress",function (event){
    buttonText = event.key ;
    if (buttonText == '*') {
            
        screenValue += buttonText;
        screen.value = screenValue;
    }
    else if (buttonText == 'AC') {
        screenValue = "";
        screen.value = screenValue;
    }
    else if (buttonText == '=') {
        screen.value = eval(screenValue);
        screenValue = screenValue ;
    }
    else if(buttonText == 'DEL'){
        screenValue = screenValue.slice(0,-1);
        screen.value = screenValue;
    }
    
    else {
        screenValue += buttonText;
        screen.value = screenValue;
    }
});