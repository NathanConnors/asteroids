// Controller is used for all php communication
class Controller {
    constructor() {}

    // Test function
    grabData() {
        $.ajax({
            url: 'server/login.php',
            type: 'GET',
            success: function(data, status) {
                // DO WORK
                console.log(data);
                if (data) {
                    console.log("logged in!");
                } else {
                    console.log("try again buster");
                }
            },
            error: function(xhr, desc, err) {
                console.log("Details: " + desc);
                console.log("Error: " + err);
            }
        });
    }

    // Account Creation
    createAccount() {
        console.log('creating account...');
    }

    // Login
    login() {
        console.log('logging in...');
    }

    // API call for stock (Parameter:array)
    stockData(arr) {

    }
}