/* eslint-disable prefer-template, max-len */

const getScript = src => (src ? `<script src="${src}"></script>` : '');
const mainCss = require('../public/main.css');
const favicon = require('../public/timesLogo.png');

export default vo => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    <meta httpEquiv="Content-Language" content="en" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
    <link rel="stylesheet" type="text/css" href=${mainCss}>
    <link rel="shortcut icon" type="image/png" href=${favicon}/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
    ${
  vo.mainCSSBundle
    ? '<link rel="stylesheet" type="text/css" href="' + vo.mainCSSBundle + '">'
    : ''
}

    <title>Card Match Game</title>
  </head>

  <body>
    <div id="root"><div>${vo.html}</div></div>
    ${getScript(vo.manifestJSBundle)}
    ${getScript(vo.vendorJSBundle)}
    ${getScript(vo.mainJSBundle)}
  </body>
</html>`;
