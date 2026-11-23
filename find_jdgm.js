const fs = require('fs');

const html = fs.readFileSync('homepage.html', 'utf8');

const matches = [...html.matchAll(/(?:api_token|public_token|shop_domain|judge\.me)[^\n&"'<>]*/gi)].map(m => m[0]);
console.log('Matches:', matches.slice(0, 30));

const jdgmScript = html.match(/<script[^>]*jdgm[^>]*>([\s\S]*?)<\/script>/gi);
if (jdgmScript) {
  jdgmScript.forEach(s => console.log('JDGM script:', s.slice(0, 300)));
}

const shopifyChat = html.match(/var __st=\{[\s\S]*?\};/);
if (shopifyChat) console.log('__st:', shopifyChat[0]);
