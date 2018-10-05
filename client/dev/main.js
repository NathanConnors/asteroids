// Main is used to establish all objects and cookies
class Main {
    constructor() {
        // Create new instance of controller class (DB Connection)
        this.controller = new Controller();
        this.canvas = new Canvas();
        // Create new instance of API calls
        // this.api = new Api();
    }
}