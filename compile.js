/*
  Source is written in ES6 which does not run on the browser. It needs to be compiled into browser compatible js.
*/

const browserify = require('browserify');
const fs = require('fs');

// Make sure output directory exists
if (!fs.existsSync('build')) {
    fs.mkdirSync('build');
}

// Browserify source files to output directory
const sources = fs.readdirSync('./src/');
for (var i = 0; i < sources.length; i++) {
    var file = sources[i];
    var b = browserify([file], {
	basedir: './src/',
	debug: true});
    b.bundle().pipe(fs.createWriteStream('build/' + file));
};

// Copy source directory to output directory
function copy(srcdir, targetdir) {
    var files = fs.readdirSync(srcdir);
    for (var i = 0; i < files.length; i++) {
	var src = files[i];
	fs.createReadStream(srcdir + src).pipe(fs.createWriteStream(targetdir + src));
    }
}

copy('resources/', 'build/');
