'use strict';

function method(method){
    return function(url, data){
      var request = {
        method: method,
        url: url
      };

      if(data){
        request.contentType = 'application/json';
        request.data = JSON.stringify(data);
      }
      
      return  $.ajax(request);
    }
}

module.exports = {
  get: method('GET'),
  post: method('POST'),
  put: method('PUT'),
  delete: method('DELETE')
};
