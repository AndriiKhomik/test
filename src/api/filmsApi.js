export const getFilms = async () => {
  const res = await fetch('/imdb.json');
  if (!res.ok) {
    throw new Error('Server error');
  }
  return await res.json()
};