import Card from "./Card";
import User from "./User";

const UsersList = ({ users }) => {
    return (
        <Card>
            <div>
                {users.map((user) => (
                    <User key={user.id} user={user}></User>
                ))}
            </div>
        </Card>
    );
};

export default UsersList;
