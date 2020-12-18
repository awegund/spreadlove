let btnPWAShowBanner = document.querySelector('.btnPWAShowBanner');


/*-------------------------------------------------------------*
 *             Sonstiges JS
 *-------------------------------------------------------------*/
window.onload = () => {
    footerElements = document.querySelectorAll('.footerElement');
    setInterval(() => {
            for (let i = 0; i < footerElements.length; i++) {
                footerElements[i].style.backgroundColor = 'black';
            }
        }, 2000);
}


// PWA Show Installation Banner
btnPWAShowBanner.addEventListener('click', (event) => {
    if(deferredPrompt){
        deferredPrompt.prompt();
        deferredPrompt.userChoice
            .then(decision => {
                alert('ausgewählt: ', decision.outcome);
                if(decision.outcome === 'dismissed'){
                    alert('Weg mit dem Dreck!');
                } else {
                    alert('Leider geil! Hooomeeeessccrreeennn babyyyy!');
                }
            })
            .catch(err => {
                alert('Error: ', err);
            });
        deferredPrompt = null;
    }
})