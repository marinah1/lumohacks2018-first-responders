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




/*--------
      onclick funtion to save selected mood data
---------*/
function submitForms(){
  document.getElementById("form1").submit();
  document.getElementById("form2").submit();

 //grab id of selected mood item --
  var mood = document.getElementsByName('mood');
  var mood_id = "";
  mood.forEach(function(item){
    if(item.checked){
      //console.log(item);
      mood_id = item.id;
    }
  });
  var mood_data = 'mood_id=' + mood_id;


  var xhrParams = {
    mood_id : mood_id
  };

  ajaxPost(
    "/check",
    xhrParams,
    function() {
      // Go to next page automatically in browser
      alert("Successfully submitted mood :)")
    },
    function(error) {
      alert("Error in submitting form, please try again...");
    }
  );
}



