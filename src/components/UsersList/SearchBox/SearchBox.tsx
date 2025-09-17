import { BiMinus, BiPlus, BiSearch } from "react-icons/bi";
import { useState } from "react";
import AddUser from "../../AddUser";

const SearchBox = ({ handleSearch }: { handleSearch: (e: string) => void }) => {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className="flex items-center gap-4 px-3">
                <div className="search-bar flex items-center gap-2 px-2 rounded-md bg-[#03060981] flex-1">
                    <BiSearch />
                    <input onChange={(e) => handleSearch(e.target.value)} type="text" placeholder="Enter a name." className="border-none outline-none text-sm py-1.5" />
                </div>
                <button onClick={() => setOpen(prev => !prev)} className="relative cursor-pointer bg-[#03060981] font-bold text-lg rounded-lg p-1.5 hover:bg-[#020203] transition duration-150">
                    <BiPlus className={`transition-transform duration-300 ${open ? "opacity-0 rotate-180" : "opacity-100 rotate-0"}`} />
                    <BiMinus className={`transition-transform duration-300 absolute top-1.5 ${open ? "opacity-100 rotate-180" : "opacity-0 rotate-0"}`} />
                </button>
            </div>
            {open && <AddUser close={() => setOpen(false)} />}
        </>
    )
}

export default SearchBox;