import {useLoaderData} from "react-router-dom";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {getFilmById} from "../thunks/getFilms.ts";
import {useAppDispatch, useAppSelector} from "../redux/store.ts";
import {movieSearchFavorites, movieSearchMovie, movieSearchStatus} from "./movieSearchSlice.ts";
import {useEffect, useState} from "react";
import {addFavorites, removeFavorites} from "./movieSearchSlice.ts";

const Details = () => {
    //TODO Я не понимаю как правильно определить в данном случае тип
    const id: any = useLoaderData();
    const dispatch = useAppDispatch();
    const film = useAppSelector(movieSearchMovie);
    const status = useAppSelector(movieSearchStatus);
    const favorites = useAppSelector(movieSearchFavorites);
    const [checked, setChecked] = useState(favorites.includes(id));

    const handleChange = () => {
        if (checked) {
            setChecked(false);
            if (film !== null) {
                dispatch(removeFavorites(film.imdbID));
            }
            return;
        }
        setChecked(true);
        if (film !== null) {
            dispatch(addFavorites(film.imdbID));
        }
    };

    useEffect(() => {
        if (typeof id === "string") {
            setChecked(favorites.includes(id));
            dispatch(getFilmById(id));
        }
    }, [])

    if (film === null) return <></>;

    return (
        <>
            <Card style={{width: '18rem'}} className="mx-auto">
                {status === "pending" ? "Loading..." :
                    <Container>
                        <Row>
                            <Card.Img className="h-25 d-inline-block" variant="top" src={film.Poster}/>
                            <Card.Body>
                                <Card.Title>{film.Title}</Card.Title>
                            </Card.Body>
                            <ListGroup>
                                <ListGroup.Item>{film.Year}</ListGroup.Item>
                                <ListGroup.Item>{film.Genre}</ListGroup.Item>
                                <ListGroup.Item>{film.Runtime}</ListGroup.Item>
                                <ListGroup.Item>{film.Director}</ListGroup.Item>
                                <ListGroup.Item>{film.Actors}</ListGroup.Item>
                                <ListGroup.Item>{film.imdbRating}</ListGroup.Item>
                                <label htmlFor="check">
                                    <input id="check" type="checkbox" checked={checked} onChange={handleChange}/>
                                    <span>Favorites</span>
                                </label>
                            </ListGroup>
                        </Row>
                    </Container>
                }
            </Card>
        </>
    );
}

export default Details;
