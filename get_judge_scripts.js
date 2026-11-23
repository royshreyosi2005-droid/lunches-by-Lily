const fs = require('fs');

const html = fs.readFileSync('homepage.html', 'utf8');
const scripts = [...html.matchAll(/src=["']([^"']*judge[^"']*)["']/gi)].map(m => m[1]);
console.log('Judge scripts:', scripts);
