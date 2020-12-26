/*-------------------------------------------------------------*
 *             Sonstiges JS                                    *
 *-------------------------------------------------------------*/
window.onload = function() {

    // Scroll Event einstellen
    $(window).on('scroll', function() {
        if( $(window).scrollTop() > 50 ){
            $('nav.navbar').addClass('bg-white');
            $('nav.navbar').removeClass('pt-3');
            $('nav.navbar').removeClass('pb-5');
        } else {
            $('nav.navbar').removeClass('bg-white');
            $('nav.navbar').addClass('pt-3');
            $('nav.navbar').addClass('pb-5');
        }
    });
}


/*-------------------------------------------------------------*
 *             PWA Show Installation Banner                    *
 *-------------------------------------------------------------*/
let btnPWAShowBanner = document.querySelector('.btnPWAShowBanner');
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