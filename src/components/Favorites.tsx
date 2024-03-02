import {
    movieSearchFavorites,
    movieSearchFavoritesData
} from "./movieSearchSlice.ts";
import {useAppDispatch, useAppSelector} from "../redux/store.ts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Film} from "../interfaces.ts";
import ListItem from "./ListItem.tsx";
import {getFavoritesFilmByIds} from "../thunks/getFilms.ts";
import {useEffect} from "react";

const Favorites = () => {
    const ids = useAppSelector(movieSearchFavorites);
    const list = useAppSelector(movieSearchFavoritesData);

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getFavoritesFilmByIds(ids))
    }, [])

    if (ids.length === 0) return;

    return (
        <>
            <Container>
                <Row>
                    {
                        list.map((film: Film) => <ListItem key={film.imdbID} movie={film}/>)
                    }
                </Row>
            </Container>
        </>
    );
}

export default Favorites;