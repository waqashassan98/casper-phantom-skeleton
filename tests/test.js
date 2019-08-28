var url = "https://duckduckgo.com/";

casper.test.begin("Testing the page status", function(test){
    casper.start(url, function(){
        test.assertHttpStatus(200, "Page is up and running");
    });

    casper.then(function(){
        test.assert(casper.getCurrentUrl() === url, 'URL is the one expected');
    });

    casper.run(function() {
        test.done();
    });
});
