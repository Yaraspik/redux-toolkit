import {getFilms as getFilmsApi, getFilmById as getFilmByIdApi} from "../fetch/fetchApi";
import {setFavoritesData, setRequestFilmById, setRequestFilms, setStatus} from "../components/movieSearchSlice.ts";
import {AppDispatch} from "../redux/store";

export const getFilms = (title: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setStatus("pending"));
        const res = await getFilmsApi(title);

        if (res.Response === "True") {
            dispatch(setRequestFilms(res));
            dispatch(setStatus("success"));
            return;
        }

        if (res.Response === "False") {
            dispatch(setRequestFilms(res));
            dispatch(setStatus("error"));
            return;
        }
    };
}
export const getFilmById = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setStatus("pending"));
    const res = await getFilmByIdApi(id);

    if (res.Response === "True") {
        dispatch(setRequestFilmById(res));
        dispatch(setStatus("success"));
        return;
    }

    if (res.Response === "False") {
        console.log(res)
        dispatch(setRequestFilmById(res));
        dispatch(setStatus("error"));
        return;
    }
}
export const getFavoritesFilmByIds = (ids: Array<string>) => async (dispatch: AppDispatch) => {
    dispatch(setStatus("pending"));
    const data = [];
    for (const id of ids) {
        const res = await getFilmByIdApi(id);
        data.push(res);
    }

    dispatch(setFavoritesData(data));
    dispatch(setStatus("success"));
}
