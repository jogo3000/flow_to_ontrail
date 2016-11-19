var browserify = require('browserify');
const fs = require('fs');

var files = fs.readdirSync('./src/');
for (var i = 0; i < files.length; i++) {
	var file = files[i];
	var b = browserify([file], {
			basedir: './src/',
			debug: true});
	b.bundle().pipe(fs.createWriteStream('build/' + file));
};

function copy(srcdir, targetdir) {
	var files = fs.readdirSync(srcdir);
	for (var i = 0; i < files.length; i++) {
		var src = files[i];
		fs.createReadStream(srcdir + src).pipe(fs.createWriteStream(targetdir + src));
	}
}

copy('resources/', 'build/');