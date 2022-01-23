//// update food page script////
var button = document.querySelectorAll('.nutrition');
var result = document.querySelectorAll('.result-info');
var cont = document.querySelectorAll('.cont');
for(let i= 0; i < button.length; i++)
{
    button[i].addEventListener('click', function showDiv(){
        result[i].classList.remove('hide');
        result[i].classList.toggle('show');
        cont[0].classList.toggle('blur');
        cont[1].classList.toggle('blur');
        disableScroll();
    });
}

var buttX = document.querySelectorAll('.close');
for(let i = 0; i < result.length; i++)
{
    buttX[i].addEventListener('click', () => {
        result[i].classList.remove('show');
        cont[0].classList.remove('blur');
        cont[1].classList.remove('blur');
        result[i].classList.toggle('hide');
        enableScroll();
    });
}

/////////////////////////////////////////////
//https://www.geeksforgeeks.org/how-to-disable-scrolling-temporarily-using-javascript/
function disableScroll() {
    // Get the current page scroll position
    scrollTop = 
      window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = 
      window.pageXOffset || document.documentElement.scrollLeft,

        // if any scroll is attempted,
        // set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    window.onscroll = function() {};
}
/////////////////////////////////////////////