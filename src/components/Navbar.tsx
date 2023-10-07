import { ReactNode } from "react";
import Logo from "./Logo";

interface Props {
    children: ReactNode
}

const Navbar = ({ children }: Props) => {
    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    )
}

export default Navbar