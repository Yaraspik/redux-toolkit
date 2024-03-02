import {NavLink} from "react-router-dom";
import {Outlet} from "react-router-dom";

const Menu = () => {
    return (
        <div className="m-8 bg-gray-700 text-base">
            <nav className="py-4 px-4 sm:px-6 lg:px-4 xl:px-6 text-sm font-medium">
                <ul className="flex space-x-3">
                    <li>
                        <NavLink
                            className={({isActive}) => `block px-3 py-2 rounded-md ${isActive ? "bg-sky-500 text-white" : "bg-slate-50"}`}
                            to="/"
                        >
                            Поиск
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({isActive}) => `block px-3 py-2 rounded-md ${isActive ? "bg-sky-500 text-white" : "bg-slate-50"}`}
                            to="/favorites"
                        >
                            Избранное
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default Menu;