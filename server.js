var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'https://finance.yahoo.com/quote/FEYE/history?p=FEYE';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      //console.log($);
      var title, release, rating;
      var json = { title : "", release : "", rating : ""};

      $('table[data-test=historical-prices] tbody tr' ).filter(function(){
        var data = $(this);
        
         //title = data.children('td').text();
         var stock= [];
         title = data.children('td').each(function (i, elem) {
                stock[i]  = $(this).text();
                console.log(stock);
         });

       
         //console.log(title);
        // release = data.children().last().children().last().text().trim();

        // json.title = title;
        // json.release = release;
      })

      // $('.ratingValue').filter(function(){
      //   var data = $(this);
      //   rating = data.text().trim();

      //   json.rating = rating;
      //   console.log(json);
      //   console.log("ASDASDASDSA");
      // })
    }

    // fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
    //   console.log('File successfully written! - Check your project directory for the output.json file');
    //   res.send(JSON.stringify(json, null, 4));
    // })

    //res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
