var casper = require('casper').create();

var urls = ["http://www.google.ca", "http:///www.bing.ca"];
var viewportSizes = [400, 720, 1200];


casper.start();
var counter = 0;
casper.repeat(viewportSizes.length, function(){

    var viewportSize = viewportSizes[counter];

    casper.viewport(viewportSize, 1000).each(urls, function(self, item, index){
        // console.log(self, item, index);
        self.thenOpen(item, function() {
            var title = this.getTitle();
            console.log(title);
            this.wait(2000, function(){
                this.capture('./output/screenshot-'+index+'_'+viewportSize+'.png');
            });
        });
    });
    counter++;
});



casper.run();
