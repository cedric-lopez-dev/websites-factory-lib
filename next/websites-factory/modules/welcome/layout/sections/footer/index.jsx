import Link from "next/link";


const Footer = () => {
    return (
        <div className="flex justify-center">
            <footer className="max-w-7xl p-6 lg:px-8 flex-1">
                <span className="text-gray-400">{"Built by "}
                    <span className="underline">
                        <Link target="_blank" href={'https://github.com/cedric-lopez-dev?tab=repositories'}>Cédric Lopez</Link>
                    </span>
                </span>
            </footer>
        </div>
    );
};

export default Footer;