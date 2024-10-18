
import Navbar from '../sections/navbar';
import Footer from '../sections/footer';



const Main = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col" >
            <Navbar />
            <div className='flex-1'>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Main;