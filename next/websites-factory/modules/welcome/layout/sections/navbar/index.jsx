import Link from "next/link";
import { LogoStatic } from "../../../components/logo";

const Navbar = () => {
    return (
        <div className="bg-cyan-600 flex justify-center">
            <nav className="max-w-7xl p-6 lg:px-8 flex-1">
                <Link href="/">
                    <LogoStatic className="cursor-pointer" />
                </Link>

            </nav>
        </div>
    );
};

export default Navbar;