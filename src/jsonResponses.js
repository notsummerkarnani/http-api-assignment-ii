const users = {};

const respondJSON = (request, response, status, object) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });

    response.write(JSON.stringify(object));

    response.end();
};

const respondJSONHead = (request, response, status) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });

    response.end();
};

const getUsers = (request, response) => {
    const responseJSON = { users };
    return respondJSON(request, response, 200, responseJSON);
};

const getUsersHead = (request, response) => respondJSONHead(request, response, 200);

const notReal = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };
    return respondJSON(request, response, 404, responseJSON);
};

const notRealHead = (request, response) => respondJSONHead(request, response, 404);

const addUser = (request, response, params) => {

    // object including the message to send back
    const responseJSON = {
        message: 'Name and age are both required.',
    };

    // if either parameter is missing then it's an error
    if (!params.name || !params.age || params.name === '' || params.age === '') {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }

    // next default it to creating a new one
    let status = 201;

    // change code if it exists, if it doesn't then create it
    if (users[params.name]) {
        status = 204;
    } else {
        users[params.name] = {};
    }

    // either adds or updates
    users[params.name].name = params.name;
    users[params.name].age = params.age;

    // sends the response for if it was created
    if (status === 201) {
        responseJSON.message = 'Created Successfuly!';
        return respondJSON(request, response, status, responseJSON);
    }

    // not created, so it must be updated, sends no data just a head
    return respondJSONHead(request, response, status);
};

module.exports = {
    getUsers,
    getUsersHead,
    notReal,
    notRealHead,
    addUser,
};