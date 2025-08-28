export async function getObjectsFromJson() {
  const response = await fetch("data.json");
  if(!response) {
    throw new Error("Failed to load json");
  }
  return await response.json();
}