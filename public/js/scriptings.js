
window.onload = () => {

    alert('Hey there Babyyyyy!');

    footerElements = document.querySelectorAll('.footerElement');

    console.log(footerElements);

    for (let i = 0; i < footerElements.length; i++) {
        setTimeout(() => {
            footerElements[i].style.backgroundColor = 'black';
        }, 1000);
    }
}