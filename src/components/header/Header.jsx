import SearchBar from "../searchBar/SearchBar"

function Header(){
    return (
        <div
            className="bg-neutral-700 w-full h-fit flex justify-between items-center p-1 md:p-2 md:my-4 rounded-md"
        >
            <div className="flex justify-center items-center gap-2">
                <div className="w-8 h-8">
                    <img className="w-full h-full" src="/reddit.png" alt="Main Logo" />
                </div>
                <h1 className="text-md">Small Reddit</h1>
            </div>
            <SearchBar />
        </div>
    )
}

export default Header