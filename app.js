const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const port = 3000;
const app = express();

//STEP 1: Setting up the boilerplate and routing
app.get('/wikipedia', function(req, res) {

  var url = 'https://en.wikipedia.org/wiki/Greek_mythology';

  request(url, function(error, response, html) {
    if (!error) {

      var $ = cheerio.load(html);
      var data = {
        articleTitle: '',
        articleImg: '',
        articleParagraph: ''

      }
      $('#content').filter(function() {
        data.articleTitle = $(this).find('#firstHeading').text();
        data.articleImg = $(this).find('img').first().attr('src');
        data.articleParagraph = $(this).find('p').first().text();

      });

      //All the web scraping magic will happen here
      res.send(data);

      fs.writeFile('wiki-output.js', JSON.stringify(data, null, 4), function(error) {
        console.log('file written on hard drive!');

      })
    }
  });

});

app.get('/UFO1', function(req, res) {

  var url = 'https://www.ufocasebook.com/bestufopictures.html';

  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      var data = []

      $('tbody').filter(function() {
        $('tr').filter(function() {
          $('td').filter(function() {
            $('center').filter(function() {
              $(this).find('center').each(function(i, elem) {
                data[i] = "'" + $(this).find('a').find('img').attr('src') + "'";
              })
            })
          })
        })
      });

      //All the web scraping magic will happen here
      res.send(data);

      fs.writeFile('ufo-output1.js', 'var ufo_list1 = [' + data + ']', function(error) {
        console.log('file written on hard drive!');

      })
    }
  });

});


app.get('/UFO2', function(req, res) {

  var url = 'https://www.ufocasebook.com/bestufopictures2.html';

  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      var data = []

      $('tbody').filter(function() {
        $('tr').filter(function() {
          $('td').filter(function() {
            $('center').filter(function() {
              $(this).find('center').each(function(i, elem) {
                data[i] = "'" + $(this).find('a').find('img').attr('src') + "'";
              })
            })
          })
        })
      });

      //All the web scraping magic will happen here
      res.send(data);

      fs.writeFile('ufo-output2.js', 'var ufo_list2 = [' + data + ']', function(error) {
        console.log('file written on hard drive!');

      })
    }
  });

});

app.get('/UFO3', function(req, res) {

  var url = 'https://www.ufocasebook.com/bestufopictures3.html';

  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      var data = []

      $('tbody').filter(function() {
        $('tr').filter(function() {
          $('td').filter(function() {
            $('center').filter(function() {
              $(this).find('center').each(function(i, elem) {
                data[i] = "'" + $(this).find('a').find('img').attr('src') + "'";
              })
            })
          })
        })
      });

      //All the web scraping magic will happen here
      res.send(data);

      fs.writeFile('ufo-output3.js', 'var ufo_list3 = [' + data + ']', function(error) {
        console.log('file written on hard drive!');

      })
    }
  });

});

app.listen(port);
console.log('Magic happens on port ' + port);

exports = module.exports = app;
