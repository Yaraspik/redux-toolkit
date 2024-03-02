import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Route,
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
} from "react-router-dom";

import Main from './components/Main';
import Details from './components/Details';
import Favorites from './components/Favorites.tsx';
import Menu from "./components/Menu.tsx";

const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Menu/>}>
                    <Route index element={<Main/>}/>
                    <Route path="/details/:id"
                           element={<Details/>}
                           loader={async ({ params: {id = ""} }) =>  id}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                </Route>
            </>,
        ),
    )
;

const App = () => {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
};

export default App;
