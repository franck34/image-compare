var fs = require('fs'),
    PNG = require('pngjs').PNG,
    pixelmatch = require('../index.js');

//var files = ['lesecho/shot7.png','lesecho/shot8.png'];  // same
//var files = ['lesecho/shot7.png','hacked.png'];         // same size
var files = ['lesecho/shot7.png','hacked2.png'];        // not the same size

var img1 = fs.createReadStream(files[0]).pipe(new PNG()).on('parsed', doneReading);
var img2 = fs.createReadStream(files[1]).pipe(new PNG()).on('parsed', doneReading);
var filesRead = 0;

function doneReading() {
    if (++filesRead < 2) return;
    var diff = new PNG({width: img1.width, height: img1.height});
    var diffData = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1,includeAA:false,ignoreColors:['255,255,255']});
    console.log(diffData);
    diff.pack().pipe(fs.createWriteStream('diff.png'));
}

