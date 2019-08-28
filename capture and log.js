var casper = require('casper').create();
// casper.echo("hello world", "WARN");
// casper.exit();
casper.start('https://www.google.com/', function(){
    ///Screenshot
    // this.capture('./output/test.png');

    //execute scripts in page context
    ///Script Context: when you construct the logic of your casperjs script
    ///Page Context: Where you script as if you are on the web page (using the browser console)
    // casper.evaluate(function(){
    //     //so something inside a page    
    // });

    //script context
    var message = "the current page title is: ";
    var title = this.evaluate(function(message) {
        //page context
        var title = document.title; // or this.getTitle();
        return message + title;//only simple objects can be transferred. serialized js. no->nodes
    }, message);

    console.log(title);

});




casper.run();//this calls exit method automatically


