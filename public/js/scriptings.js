/*-------------------------------------------------------------*
 *             NAVBAR EVENT HANDLING                           *
 *-------------------------------------------------------------*/
// Scroll Event einstellen
$(window).on('scroll', function() {
    if( $(window).scrollTop() > 50 ){
        $('nav.navbar').addClass('bg-white');
        $('nav.navbar').removeClass('pt-3');
        $('nav.navbar').removeClass('pb-5');
        $('#backtotop').css('visibility', 'visible');
    } else {
        //Bildanfang und Collapse sichtbar = Hintergrund weiß
        if($(window).width() <= 992 ){
            $('nav.navbar').addClass('bg-white');
        } else {
            $('nav.navbar').removeClass('bg-white');
        }
        //Bildanfang und KEIN Collapse Menu = paddings dazu
        //Bildanfang und Collapse Menu = paddings weg
        if($(window).width() > 992 ){
            $('nav.navbar').addClass('pt-3');
            $('nav.navbar').addClass('pb-5');
        } else {
            $('nav.navbar').removeClass('pt-3');
            $('nav.navbar').removeClass('pb-5');    
        }
        $('#backtotop').css('visibility', 'hidden');
    }
});

// Initial Werte versorgen
window.onload = function() {
    //Navigation white onLoad
    if($(window).width() <= 992 ){
        $('nav.navbar').addClass('bg-white');
    }
    //Bildanfang und KEIN Collapse Menu = paddings dazu
    //Bildanfang und Collapse Menu = paddings weg
    if($(window).width() > 992 ){
        $('nav.navbar').addClass('pt-3');
        $('nav.navbar').addClass('pb-5');
    } else {
        $('nav.navbar').removeClass('pt-3');
        $('nav.navbar').removeClass('pb-5');    
    }
    $('#backtotop').css('visibility', 'hidden');


    //Initialize animated Scroll libary
    AOS.init({  duration: 1800 });
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