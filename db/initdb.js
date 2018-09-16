/**
 * Constants
 */
var DATABASE_NAME = "BLUU";
var THERAPISTS = [
  {
    name: "Dr. Carolyn Burns",
    location: { city : "Langley", address: "390 8029 199th Street Langley, BC V2Y 0E2", gps : "abc"},
    phone: "(604)614-0568",
    waitlist: "0 days",
    accepting_new_patents: true,
    availability: "3 days",
    speciality: "PTSD",
    qualification: "Registered Psychologist (#2211)",
    link: "https://www.carolynburns.ca/individuals.htm"
  }
]

// Initialize DB connection
var db = new Mongo().getDB(DATABASE_NAME);

// Insert documents into `products`, `orders` & `users` collection
try {
  db.therapists.insertMany(THERAPISTS);
} catch (e) {
  print(e);
}
