import Navbar from "../ui/Navbar"

export default function LoggedInLayout( { children } ){
    return (
        <div className="lg:mx-[200px]">
            <Navbar />
            {children}
        </div>
    )
}