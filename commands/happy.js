const cheerio = require('cheerio');
const request = require('request');

module.exports = {
    name: 'happy',
    cmd: 'Happy',
    description: 'HAPPY!!!',
    execute(message, args){
        image(message);
        function image(message){
            var options = {
                url: "https://results.dogpile.com/serp?qc=images&q=" + "anime happy gif",
                method: "GET",
                headers: {
                    "Accept": "text/html",
                    "User-Agent": "Chrome"
                }
            };
            request(options, function(error, response, responseBody) {
                if(error) {
                    return;
                }
        
                $ = cheerio.load(responseBody);
        
                var links = $(".image a.link");
        
                var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        
                console.log(urls);
        
                if (!urls.length) {
                    return;
                }
        
                //send result
                message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
            });
        }
    }
}