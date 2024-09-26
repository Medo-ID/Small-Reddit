import SearchBar from "../searchBar/SearchBar"

function Header(){
    return (
        <div
            className="fixed z-20 md:static bg-neutral-700 w-full h-fit flex justify-between items-center p-1 md:p-2 md:my-4 md:rounded-md"
        >
            <div className="flex justify-center items-center gap-2">
                <div className="w-8 h-8">
                    <img className="w-full h-full" src="/reddit.png" alt="Main Logo" />
                </div>
                <h1 className="text-sm md:text-base font-semibold">Small Reddit</h1>
            </div>
            <SearchBar />
        </div>
    )
}

export default Header