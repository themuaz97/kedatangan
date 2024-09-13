
export function generateRandomUserId(length: number = 8): string {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * 10).toString()
  ).join("");
}