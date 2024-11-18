// Hämtar elementen från DOM
const workoutForm = document.querySelector('.workout-form');
const workoutList = document.querySelector('.workout-list');

// Laddar träningspassen från localStorage vid sidladdning
document.addEventListener('DOMContentLoaded', loadWorkouts);

// Event för att lägga till träningspass
workoutForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // Hämtar värden från formuläret
  const workoutName = document.querySelector('.workout-name').value;
  const workoutDate = document.querySelector('.workout-date').value;
  const workoutWeight = document.querySelector('.workout-weight').value;
  const workoutSets = document.querySelector('.workout-sets').value;
  const workoutDistance = document.querySelector('.workout-distance').value;

  // Skapar objekt för träningspass
  const workout = {
    name: workoutName,
    date: workoutDate,
    weight: workoutWeight,
    sets: workoutSets,
    distance: workoutDistance,
  };

  // Lägg till träningspass till DOM och localStorage
  addWorkoutToDOM(workout);
  saveWorkoutToLocalStorage(workout);

  // Tömmer formuläret
  workoutForm.reset();
});

// Funktion för att lägga till träningspass till DOM
function addWorkoutToDOM(workout) {
  let workoutDetails = `${workout.name} - ${workout.date}`;
  if (workout.weight) workoutDetails += ` | Vikt: ${workout.weight} kg`;
  if (workout.sets) workoutDetails += ` | Set: ${workout.sets}`;
  if (workout.distance) workoutDetails += ` | Distans: ${workout.distance} km`;

  // Skapar listobjekt för träningspasset
  const li = document.createElement('li');
  li.innerHTML = `
    ${workoutDetails}
    <button onclick="removeWorkout(this)">Ta bort</button>
  `;

  // Lägg till nytt pass till listan
  workoutList.appendChild(li);
}

// Sparar träningspass till localStorage
function saveWorkoutToLocalStorage(workout) {
  let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
  workouts.push(workout);
  localStorage.setItem('workouts', JSON.stringify(workouts));
}

// Laddar träningspassen från localStorage
function loadWorkouts() {
  const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
  workouts.forEach(addWorkoutToDOM);
}

// Funktion för att ta bort träningspass från DOM och localStorage
function removeWorkout(button) {
  const li = button.parentElement;
  const workoutText = li.innerText.replace(" Ta bort", ""); // Ta bort "Ta bort" från texten

  // Tar bort från DOM
  workoutList.removeChild(li);

  // Tar bort från localStorage
  let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
  workouts = workouts.filter(workout => {
    let workoutDetails = `${workout.name} - ${workout.date}`;
    if (workout.weight) workoutDetails += ` | Vikt: ${workout.weight} kg`;
    if (workout.sets) workoutDetails += ` | Set: ${workout.sets}`;
    if (workout.distance) workoutDetails += ` | Distans: ${workout.distance} km`;
    return workoutDetails !== workoutText;
  });
  localStorage.setItem('workouts', JSON.stringify(workouts));
}
