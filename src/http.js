export async function fetchAvailablePlaces() {
  const respone = await fetch("http://localhost:3000/places");
  const resData = await respone.json();
  if (!respone.ok) {
    throw new Error("Failed to fetch places");
  }
  return resData.places;
}

export async function updateUserPlaces(places) {
  const respone = await fetch("http://localhost:3000/user-placess", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await respone.json();
  if (!respone.ok) {
    throw new Error("Failed  to update user data.");
  }
  return resData.message;
}
