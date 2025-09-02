import { BiPlus, BiSearch } from "react-icons/bi";

const SearchBox = () => {
    return (
        <div className="flex items-center gap-4 px-3">
            <div className="search-bar flex items-center gap-2 px-2 rounded-md bg-[#03060981] flex-1">
                <BiSearch />
                <input type="text" className="border-none outline-none text-sm py-1" />
            </div>
            <button className="cursor-pointer bg-[#03060981] font-bold text-lg rounded-lg p-1 hover:bg-[#020203] transition duration-150"> <BiPlus /></button>
        </div>
    )
}

export default SearchBox;