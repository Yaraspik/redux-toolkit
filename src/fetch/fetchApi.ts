const url = "https://www.omdbapi.com/?apikey=64405bd2&";

export const getFilms = async (title: string) => {
    const encodeTitle = encodeURIComponent(title);
    const res = await fetch(`${url}s=${encodeTitle}`);
    return await res.json();
}

export const getFilmById = async (id: string) => {
    const encodeId = encodeURIComponent(id);
    const res = await fetch(`${url}i=${encodeId}`);
    return await res.json();
}
