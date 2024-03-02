import {Link} from "react-router-dom";
import {Film} from "../interfaces";
import React from "react";

const ListItem = ({movie} : {movie: Film}): React.JSX.Element => {
    return (
        <div className="w-40 p-4 d-flex flex-row border-t">
            <img src={movie.Poster} alt={movie.Title} className="w-24 rounded-2xl"/>
            <div className="ml-4 ">
                <Link to={`/details/${movie.imdbID}`} className="no-underline text-slate-50">
                    <h4>{movie.Title}</h4>
                </Link>
                <div>
                    <p className="text-slate-50">{movie.Year}</p>
                    <p className="text-slate-50">{movie.Type}</p>
                </div>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    <Link to={`/details/${movie.imdbID}`} className="no-underline text-slate-50">
                        Подробнее
                    </Link>
                </button>
            </div>
        </div>
    )
}
export default ListItem;
