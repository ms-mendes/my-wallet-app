async function apiRequest ( reqUrl, reqMethod = 'GET' /* Default is GET */, reqBody ) {
    
    var reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    
    let reqInit = {
        method: reqMethod,
        headers: reqHeaders,
        body: JSON.stringify( reqBody )
    };

    let myRequest = new Request( reqUrl, reqInit );
    
    const fetchResponse = await fetch( myRequest );
    const textResponse = await fetchResponse.text();
    
    try {
        const jsonResponse = JSON.parse( textResponse );

        return jsonResponse;
    } catch ( catchError ) {
        return {
            error: true,
            message: textResponse,
            errorMessage: catchError
        }
    }
}

function getFullDate() {
    let now = new Date();

    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);

    return ( now.getFullYear()+"-"+(month)+"-"+(day) );
}

export { apiRequest, getFullDate };