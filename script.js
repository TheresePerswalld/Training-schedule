// Hitta elementen i HTML
const workoutForm = document.querySelector('.workout-form'); // Formuläret
const workoutList = document.querySelector('.workout-list'); // Listan för träningspass

// När sidan laddas, visa sparade träningspass
document.addEventListener('DOMContentLoaded', function () {
  const workouts = JSON.parse(localStorage.getItem('workouts')) || []; // Hämta från localStorage eller tom lista
  workouts.forEach(function (workout) {
    addWorkoutToDOM(workout); // Lägg till varje pass i listan
  });
});

// När formuläret skickas
workoutForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Hindra att sidan laddas om

  // Hämta värden från formuläret
  const name = document.querySelector('.workout-name').value;
  const date = document.querySelector('.workout-date').value;

  // Skapa ett träningspass-objekt
  const workout = { name: name, date: date };

  // Lägg till träningspass i listan och spara
  addWorkoutToDOM(workout);
  saveWorkoutToLocalStorage(workout);

  // Rensa formuläret
  workoutForm.reset();
});

// Funktion för att lägga till träningspass i listan (DOM)
function addWorkoutToDOM(workout) {
  // Skapa en ny listpunkt
  const li = document.createElement('li');
  li.textContent = `${workout.name} - ${workout.date}`; // Visa träningspassets namn och datum

  // Skapa en "Ta bort"-knapp
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Ta bort';
  removeButton.addEventListener('click', function () {
    removeWorkout(li, workout); // Ta bort passet när man klickar
  });

  // Lägg till knappen till listpunkten
  li.appendChild(removeButton);

  // Lägg till listpunkten i listan
  workoutList.appendChild(li);
}

// Funktion för att spara träningspass till localStorage
function saveWorkoutToLocalStorage(workout) {
  const workouts = JSON.parse(localStorage.getItem('workouts')) || []; // Hämta lista eller börja med tom
  workouts.push(workout); // Lägg till nytt pass
  localStorage.setItem('workouts', JSON.stringify(workouts)); // Spara tillbaka till localStorage
}

// Funktion för att ta bort träningspass
function removeWorkout(li, workout) {
  // Ta bort från listan i DOM
  workoutList.removeChild(li);

  // Ta bort från localStorage
  const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
  const updatedWorkouts = workouts.filter(function (item) {
    return item.name !== workout.name || item.date !== workout.date; // Matcha både namn och datum
  });
  localStorage.setItem('workouts', JSON.stringify(updatedWorkouts)); // Spara uppdaterad lista
}
