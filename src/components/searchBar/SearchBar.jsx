function SearchBar() {
    return (
        <form className="flex justify-center items-center gap-2">
            <input
                className="bg-mainBg px-2 py-1 md:px-4 md:py-1 text-mainColor h-8 rounded-md"
                type="text"
                placeholder="Search..." 
                onChange={(e) => e.target.value} 
            />
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 rounded-md bg-mainBg p-1">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </button>
        </form>
    )
}

export default SearchBar