const handleResponse = async(response) => {

    //Grab the content section
    const content = document.querySelector('#content');

    //Based on the status code, display something
    switch (response.status) {
        case 200: //success
            content.innerHTML = `<b>Success</b>`;
            break;
        case 201: //created
            content.innerHTML = '<b>Created</b>';
            break;
        case 204: //updated (no response back from server)
            content.innerHTML = '<b>Updated (No Content)</b>';
            return;
        case 400: //bad request
            content.innerHTML = `<b>Bad Request</b>`;
            break;
        case 404: //Not Found
            content.innerHTML = `<b>Not Found</b>`;
            break;
        default: //any other status code
            content.innerHTML = `Error code not implemented by client.`;
            break;
    }

    let obj = await response.text();

    //check if its just a head and end the function
    if (!obj) return;

    obj = JSON.parse(obj);
    console.log(obj);
    //If we have a message, display it.
    if (obj.message) {
        content.innerHTML += `<p>Message: ${obj.message}</p>`;
    }
    if (obj.users) {
        content.innerHTML += `<p>${JSON.stringify(obj.users)}</p>`
    }
};

//Uses fetch to send a postRequest. Marksed as async because we use await
//within it.
const sendPost = async(nameForm) => {
    //Grab all the info from the form
    const nameAction = nameForm.getAttribute('action');
    const nameMethod = nameForm.getAttribute('method');

    const nameField = nameForm.querySelector('#nameField');
    const ageField = nameForm.querySelector('#ageField');

    //Build a data string in the FORM-URLENCODED format.
    const formData = `name=${nameField.value}&age=${ageField.value}`;

    //Make a fetch request and await a response. Set the method to
    //the one provided by the form (POST). Set the headers. Content-Type
    //is the type of data we are sending. Accept is the data we would like
    //in response. Then add our FORM-URLENCODED string as the body of the request.
    let response = await fetch(nameAction, {
        method: nameMethod,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
        body: formData,
    });

    //Once we have a response, handle it.
    handleResponse(response);
};

const getPost = async(userForm) => {
    //Grab all the info from the form
    const urlField = userForm.querySelector('#urlField');
    const methodField = document.querySelector('#methodSelect');

    //Make a fetch request and await a response. Set the method to
    //the one provided by the form (POST). Set the headers. Content-Type
    //is the type of data we are sending. Accept is the data we would like
    //in response. Then add our FORM-URLENCODED string as the body of the request.
    let response = await fetch(urlField.value, {
        method: methodField.value,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
    });

    handleResponse(response);
}

const init = () => {
    //Grab the form
    const nameForm = document.querySelector('#nameForm');
    const userForm = document.querySelector('#userForm');

    //Create an addUser function that cancels the forms default action and
    //calls our sendPost function above.
    const addUser = (e) => {
        e.preventDefault();
        sendPost(nameForm);
        return false;
    }

    const getUser = (e) => {
        e.preventDefault();
        getPost(userForm)
        return false;
    }

    //Call addUser when the submit event fires on the form.
    nameForm.addEventListener('submit', addUser);
    userForm.addEventListener('submit', getUser);
};

//When the window loads, run init.
window.onload = init;