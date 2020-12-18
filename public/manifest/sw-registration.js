/*-------------------------------------------------------------*
 *             Service-Worker registrieren
 *-------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', initializeDocument, false);
function initializeDocument() {
    // Browser provided SW support?
    if('serviceWorker' in navigator){
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(success => {
                console.log('ServiceWorker registered!');
            })
            .catch(err =>  {
                console.log('Error: ' + err);
            })
    }
}

