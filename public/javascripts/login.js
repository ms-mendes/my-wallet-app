let loginButton = document.getElementById( 'loginButton' );
let loginHeaderBox = document.getElementById( 'loginHeaderBox' );
let loginHeaderErrorBox = document.getElementById( 'loginHeaderErrorBox' );
let errorBox = document.getElementById( 'errorBox' );

loginButton.onclick = function() {
    let loginBody = {
        userIdentification: document.getElementById( 'editUserName' ).value,
        password: document.getElementById( 'editPassword' ).value
    }

    sendApiRequest('/app/authenticate', 'POST', loginBody);
}

function showErrorMessage ( message, borderColor ) {
    errorBox.innerHTML = message;
    errorBox.style.borderLeftColor = borderColor;
    errorBox.style.display = 'block';
}

function sendApiRequest ( reqUrl, reqMethod = 'GET' /* Default is GET */, reqBody) {
    
    var reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    
    let reqInit = {
        method: reqMethod,
        headers: reqHeaders,
        body: JSON.stringify( reqBody )
    };

    let myRequest = new Request( reqUrl, reqInit );
    
    // alert(reqInit.body);
    fetch(myRequest)
    .then( response => ( response.text() ))
    .then( text => {
        try {
            const userDataObject = JSON.parse( text );

            if ( !userDataObject.error ) {
                // If the user is authorized then send his data to dashboard page
                // location.assign( `/app/dashboard?un=${ userDataObject.userName }` )
                showErrorMessage( userDataObject.message, '#00AA00' )
            }
            else {
                showErrorMessage( userDataObject.message, '#FF4500' )
            }
        } catch( err ) {
            // showErrorMessage( text, '#FF0000' )
            showErrorMessage( text, '#FF0000' )
        }
    });
}