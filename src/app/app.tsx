import { Outlet } from "react-router";
import Navbar, { type NavItem } from "../components/layouts/Navbar";

function App() {
    let links: Array<NavItem> = [];
    links.push({label: "Login", to: "/login"});
    links.push({label: "Register", to: "/register"});

    return (
        <>
            <Navbar links={links} />
            <div className="mx-auto max-w-7xl">
                <Outlet />
            </div>
        </>
    )
}

export default App;
