import {useAppSelector, useAppDispatch} from '../redux/store';
import {
    movieSearchQuery,
    setQuery,
    movieSearchData,
    movieSearchStatus,
    movieSearchError,
    setStatus
} from "./movieSearchSlice.ts";
import {getFilms} from "../thunks/getFilms";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListItem from './ListItem';
import {Film} from '../interfaces';
import Form from 'react-bootstrap/Form';

const Main = () => {
    const value = useAppSelector(movieSearchQuery);
    const list = useAppSelector(movieSearchData);
    const status = useAppSelector(movieSearchStatus);
    const error = useAppSelector(movieSearchError);
    const dispatch = useAppDispatch();
    // debugger

    const changeHandler = ({target: {value}}: { target: { value: string } }) => {
        dispatch(setQuery(value));
        if (value === "") {
        dispatch(setStatus("idle"));
        return;
        }
        dispatch(getFilms(value));
    }

    return (
        <>
            <div className="divide-y divide-slate-100">
                <Form.Control
                    type="text"
                    id="search"
                    name="search"
                    value={value}
                    onChange={changeHandler}
                />
                <Container fluid={"xxl"}>
                    {status === "idle" ? <Row>Введите название</Row> : status === "pending" ?
                        <Row>Loading...</Row> : error ? <Row>{error}</Row> :
                            <Row>
                                {list.map((movie: Film) => <ListItem key={movie.imdbID} movie={movie}/>)}
                            </Row>
                    }
                </Container>
            </div>
        </>
    );
}

export default Main;
