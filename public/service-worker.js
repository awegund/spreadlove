/*-------------------------------------------------------------*
 *             Service-Worker registrieren
 *-------------------------------------------------------------*/
if('serviceWorker' in navigator){
    console.log('Browser able to execute ServiceWorkers!');
    navigator.serviceWorker
        .register('/service-worker.js')
        .then(success => {
            alert('ServiceWorker registered!');
        })
        .catch(err =>  {
            alert('Error: ' + err);
        })
}