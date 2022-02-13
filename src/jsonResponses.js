const users = {};

const respondJSON = (request, response, status, object = null) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });

    // check if only Head is called
    if (object !== null) response.write(JSON.stringify(object));

    response.end();
};

const getUsers = (request, response) => {
    const responseJSON = {
        users
    };
    return respondJSON(request, response, 200, responseJSON);
};

const getUsersHead = (request, response) => respondJSON(request, response, 200);

const notReal = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };
    return respondJSON(request, response, 404, responseJSON);
};

const notRealHead = (request, response) => respondJSON(request, response, 404);

const addUser = (request, response, data) => {
    if (users[data.name]) {
        users[data.name] = data;
    } else {
        users[data.name] = data;
    }

    const responseJSON = {
        message: 'User has been added',
        id: 'addUser',
    };
    return respondJSON(request, response, 201, responseJSON);
};

module.exports = {
    getUsers,
    getUsersHead,
    notReal,
    notRealHead,
    addUser,
};