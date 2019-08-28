var casper = require('casper').create();
var fs = require("fs");

if(fs.exists('./input/config.json') && fs.exists('./input/data.json')){
    var data = require('./input/data.json');
    var config = require('./input/config.json');
}else{
    casper.exit();
}
var urls = data.urls;
var viewportSizes = config.viewportSizes;


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