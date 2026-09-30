// CloudFront Function (runtime: cloudfront-js-2.0, event: viewer request)
// MAHER website on Amazon S3 + CloudFront.
//  - www.maherlearn.com → maherlearn.com
//  - old /ar/... links  → same page at the root (301)
//  - clean URLs: /teachers → /teachers/index.html
var DOMAIN = 'maherlearn.com';

function redirect(location) {
  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: { location: { value: location }, 'cache-control': { value: 'max-age=3600' } },
  };
}

function handler(event) {
  var request = event.request;
  var host = request.headers.host ? request.headers.host.value : '';
  var uri = request.uri;

  if (host.indexOf('www.') === 0) return redirect('https://' + DOMAIN + uri);

  if (uri === '/ar' || uri === '/ar/') return redirect('/');
  if (uri.indexOf('/ar/') === 0) {
    var rest = uri.slice(3).replace(/\/+$/, '');
    return redirect(rest || '/');
  }

  if (uri.charAt(uri.length - 1) === '/') {
    request.uri = uri + 'index.html';
  } else if (uri.split('/').pop().indexOf('.') === -1) {
    request.uri = uri + '/index.html';
  }
  return request;
}
