var network_contacts = [];

function submitSetup() {
  console.log("clicked button");
  var supervisor_name = document.getElementById("supervisor-name").value;
  var supervisor_phone = document.getElementById("supervisor-phone").value;
  var supervisor_email = document.getElementById("supervisor-email").value;
  var therapist_name = document.getElementById("therapist-name").value;
  var therapist_phone = document.getElementById("therapist-phone").value;
  var therapist_email = document.getElementById("therapist-email").value;
  var friendfam_name = document.getElementById("friend-family-name").value;
  var friendfam_phone = document.getElementById("friend-family-phone").value;
  var friendfam_email = document.getElementById("friend=family-email").value;
  var xhrParams = {
    supervisor : {"supervisor-name" : supervisor_name, "supervisor-phone" : supervisor_phone, "supervisor-email" : supervisor_email},
    therapist : {"therapist-name" : therapist_name, "therapist-phone" : therapist_phone, "therapist-email" : therapist_email},
    friendfam : {"friend-fam-name" : friendfam_name, "friend-fam-phone" : friendfam_phone, "friend-fam-email" : supervisor_email}
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



