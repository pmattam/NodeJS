var http = require('http');

var contacts = [{ "first": "Prathyusha", "last": "Mattam", "email": "xyz@yahoo.com", "phone": "1234321423", "id": 1 }, { "first": "Melissa", "last": "Mary", "email": "melissa@gmail.com", "phone": "3211424323", "id": 2 }];

var lastId = 0;

var findContactWithId = function(contactId) {
    var contactId = parseInt(contactId, 10);
    return contacts.find(function(element) {
        return element.id === contactId;
    });
};

var matches = function(request, method, path) {
    console.log(request.method === method && request.url.startsWith(path));
    return request.method === method && request.url.startsWith(path);
}

var getSuffix = function(fullUrl, prefix) {
    console.log("It came here");
    // console.log(prefix);
    console.log('prefix', fullUrl.slice(prefix.length));
    return fullUrl.slice(prefix.length);
}

var server = http.createServer(function(request, response) {
    var contactId = request.url.slice(1);
    // console.log(request.url);
    // var id = getSuffix(request.url, '/contacts')
    //     // if (request.method === 'GET' && requestl.url === '/contacts') {
    // console.log("ID----", id);
    if (matches(request, 'GET', '/contacts/')) {
        var id = getSuffix(request.url, '/contacts/');
        console.log("ID", id);
        console.log("It's coming here")
        response.end(JSON.stringify(findContactWithId(id)));

    } else if (request.method === 'DELETE') {
        if (contactId === '') {
            response.end("Invalid url");
        } else {
            contacts.pop(findContactWithId(contactId));
            response.end(`Deleted Contact ${findContactWithId(contactId).first}`);
        }
    } else if (request.method === 'PUT') {
        if (contactId === '') {
            response.end("Invalid url");
        } else {
            var body = '';
            request.on('data', function(chunk) {
                body += chunk.toString();
            });
            request.on('end', function() {
                var updatedContact = JSON.parse(body);
                var indexOfFoundContactWithId = contacts.indexOf(findContactWithId(contactId));
                if (indexOfFoundContactWithId !== -1) {
                    contacts[indexOfFoundContactWithId] = updatedContact;
                }
                response.end(`Updated Contact for ${updatedContact.first}`);
            });
        }
    } else if (request.method === 'GET' && request.url === '/contacts') {
        // if (id) { // === '') {
        //     console.log("It is here");
        //     response.end(JSON.stringify(contacts));
        // }
        console.log("....");
    } else if (request.method === 'POST') {
        var body = '';
        request.on('data', function(chunk) {
            body += chunk.toString();
        });
        request.on('end', function() {
            var contact = JSON.parse(body);
            contact.id = ++lastId;
            response.end("New Contact, got it!");
            contacts.push(contact);
        });
    } else {
        response.end("Something wrong");
    }
});

server.listen(3000);