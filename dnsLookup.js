// WRITE A PROGRAM THAT PROMPTS THE USER FOR A DOMAIN NAME, LOOKS UP THE IP ADDRESS FOR THE DOMAIN AND PRINTS IT OUT.
// TRIGGER AN ERROR CONDITION BY PROVIDING AN INVALID DOMAIN.

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Domain name: ', function(domainName) {
    var dns = require('dns');
    dns.lookup(domainName, function(err, address) {
        if (err) {
            console.error(err.toString());
        } else {
            console.log('IP Address: ', address);
        }
    });
    rl.close();
});