var network_contacts = [];

function submitSetup() {
  console.log("clicked button");
  var superviser = document.getElementById("supervisor-name").value;
  console.log(superviser);
  // network_contacts.push({"support-type" : "superviser", "name": superviser.text} )
 //  var therapist = document.getElementById("superviser-input");
 //  var friend = document.getElementById("friend-family-input");

  var xhrParams = {
    user: "defaultuser"
  };

  ajaxPost(
    "localhost:8080/hello",
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

