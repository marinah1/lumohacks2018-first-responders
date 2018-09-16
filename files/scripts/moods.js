
/*---------
    This creates the questionaire for the form by
    making use of DOM
   made through onclick function in html

   Function need to have multiple question optimally produced
-----------*/
function formMoodQuestions(){
  var ArrQS = [
    "I have trouble sleeping:",
    "I have work-life balance:",
    "I feel loved:",
    "I often experience intrusive memories:",
    "I have difficulty concentrating:",
    "I often feel irritable or experience angry outbursts:",
    "Self-pity implies I need help:",
    "My reaction to distress is anger:"
  ];
  var count =0;
  ArrQS.forEach(function(item){
      count++;
      var question = document.createTextNode(item);

      var p = document.createElement("p");
      p.appendChild(question);
      p.appendChild(document.createElement("br"));

      var inputYes = document.createElement("input");
      inputYes.setAttribute("type", "radio");
      inputYes.setAttribute("name", "y-n-same"+count);
      inputYes.setAttribute("class", "optional-qs qs-yes");
      var textYes = document.createTextNode("yes");
      inputYes.required = true;
      var inputNo = document.createElement("input");
      inputNo.setAttribute("type", "radio");
      inputNo.setAttribute("name", "y-n-same"+count);
      inputNo.setAttribute("class", "optional-qs qs-no");
      var textNo = document.createTextNode("no");

      p.appendChild(inputYes);
      p.appendChild(textYes);
      p.appendChild(inputNo);
      p.appendChild(textNo);

      var field = document.createElement("fieldset");
      field.appendChild(p);

      var formAttach = document.getElementById("form2");
      formAttach.appendChild(field);
    console.log(item);
  });

   document.getElementById("mood-questions-btn").remove();
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
