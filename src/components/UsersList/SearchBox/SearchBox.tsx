import { BiMinus, BiPlus, BiSearch } from "react-icons/bi";
import { useState } from "react";
import AddUser from "../../AddUser";

const SearchBox = () => {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className="flex items-center gap-4 px-3">
                <div className="search-bar flex items-center gap-2 px-2 rounded-md bg-[#03060981] flex-1">
                    <BiSearch />
                    <input type="text" placeholder="Enter a name." className="border-none outline-none text-sm py-1.5" />
                </div>
                <button onClick={() => setOpen(prev => !prev)} className="cursor-pointer bg-[#03060981] font-bold text-lg rounded-lg p-1.5 hover:bg-[#020203] transition duration-150">
                    {open ? <BiMinus /> : <BiPlus />}
                </button>
            </div>
            {open && <AddUser close={()=> setOpen(false)}/>}
        </>
    )
}

export default SearchBox;