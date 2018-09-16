function ajaxPost(url, params, successCallback, errorCallback) {
  var xhr = new XMLHttpRequest();
  xhr.timeout = 2000;

  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.ontimeout = errorCallback;
  xhr.onerror = errorCallback;
  xhr.onload = function() {
    if (xhr.status === 200) {
      successCallback(xhr.responseText);
    } else {
      errorCallback();
    }
  };

  xhr.send(JSON.stringify(params));
}