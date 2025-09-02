import List from "./List";
import SearchBox from "./SearchBox";
import UserInfo from "./UserInfo";

const UsersList = () => {
    return (
        <div className="flex-1 flex flex-col gap-4 py-2">
            <UserInfo />
            <SearchBox />
            <List />
        </div>
    )
}

export default UsersList;