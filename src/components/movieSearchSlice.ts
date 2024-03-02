import {createSlice, createAction} from '@reduxjs/toolkit';
import {Details, Film, Response} from "../interfaces.ts";

type movieSearchState = {
    query: string;
    data: Array<Film>;
    status: "idle" | "pending" | "success" | "error";
    error: string;
    movie: Details | null
    favorites: Array<string>;
    favoritesData: Array<Film>;
}

const initialState: movieSearchState = {
    query: "",
    data: [],
    status: "idle",
    error: "",
    favorites: [],
    movie: null,
    favoritesData: [],
}

const movieSearchSlice = createSlice({
    name: 'movieSearch',
    initialState: initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
            if (action.payload === initialState.query) state.status = "idle";
        },
        addFavorites: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFavorites: (state, action) => {
            state.favorites = state.favorites.filter((imdbID) => imdbID !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setRequestFilms, (state, action) => {
                state.error = action.payload.Error || initialState.error;
                state.data = action.payload.Search || initialState.data;
            })
            .addCase(setRequestFilmById, (state, action) => {
                state.error = action.payload.Error || initialState.error;
                state.movie = action.payload || initialState.movie;
            })
            .addCase(setFavoritesData, (state, action) => {
                state.favoritesData = action.payload || initialState.favoritesData;
            })
            .addCase(setStatus, (state, action) => {
                state.status = action.payload;
            })
    },
});

export const {setQuery, addFavorites, removeFavorites} = movieSearchSlice.actions
export const setRequestFilms = createAction<Response>('setRequest');
export const setRequestFilmById = createAction<Details>('setRequestFilmById');
export const setFavoritesData = createAction<Film[]>('setFavoritesData ');
export const setStatus = createAction<movieSearchState["status"]>('setStatus ');
export const movieSearchQuery = ({movieSearch}: { movieSearch: movieSearchState }) => {
    return movieSearch.query;
};
export const movieSearchData = ({movieSearch}: { movieSearch: movieSearchState }): Array<Film> => movieSearch.data;
export const movieSearchStatus = ({movieSearch}: { movieSearch: movieSearchState }) => {
    return movieSearch.status;
};
export const movieSearchError = ({movieSearch}: { movieSearch: movieSearchState }) => {
    return movieSearch.error;
};
export const movieSearchMovie = ({movieSearch}: { movieSearch: movieSearchState }) => {
    return movieSearch.movie;
};
export const movieSearchFavorites = ({movieSearch}: {
    movieSearch: movieSearchState
}): string[] => movieSearch.favorites;
export const movieSearchFavoritesData = ({movieSearch}: {
    movieSearch: movieSearchState
}) => movieSearch.favoritesData;
export default movieSearchSlice.reducer;
