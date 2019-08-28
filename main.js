var casper = require('casper').create(
    {
        pageSettings: {
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        }
    }
);
var fs = require('fs');
var data;


casper.start("https://www.google.com", function(){
    this.fill('form', {q:'hello world!'}, true);
});
//called immeditately
casper.then(function() {
    this.capture('./output/file1.png');
});
//to get results.. we might want to wait a bit..
casper.wait(1000, function(){
    //due to user agent strings you get different results
    data = this.evaluate(function() {
        var targetElements = document.querySelectorAll('.g .rc .r a');
        var data = [];
        for(var index =0; index< targetElements.length; index++){
            var currentEl = targetElements[index];
            var currentLink =currentEl.getAttribute('href');
            var currentTitle = currentEl.text;
            var currentItem = {
                'link': currentLink,
                'title': currentTitle,
            };
            data.push(currentItem);
        }
        return data;
    });
    // this.capture('./output/file2.png');
    console.log(JSON.stringify(data));
});

casper.run(function(){
    fs.write('./output/output.json', JSON.stringify(data, null, '\t'));
    this.exit();
});