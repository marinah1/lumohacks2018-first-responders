function submitSetup(attempts = 0) {
  if (Object.keys(cart).length === 0) {
    return;
  }

  // Show loading status + disable checkout button
  var checkoutButton = document.getElementById("checkoutButton");
  checkoutButton.disabled = true;
  checkoutButton.classList.add("loading");

  var xhrParams = {
    user: "defaultuser"
    contacts: JSON.stringify(network_contacts)
  };

  ajaxPost(
    setupUrl,
    xhrParams,
    function() {
      // Go to next page automatically in browser
    },
    function(error) {
      alert("Error in submitting form, please try again...");
    }
  );
}


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