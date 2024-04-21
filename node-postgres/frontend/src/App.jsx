import {useState, useEffect} from 'react';

function App() {
    const [users, setUser] = useState(false);

    function getUser() {
        fetch('http://localhost:3001')
            .then(response => {
                return response.text();
            })
            .then(data => {
                setUser(data);
            });
    }

    function createUser() {
        let name = prompt('Enter user name');
        let password = prompt('Enter user password');
        let email = prompt('Enter user email');
        let role = prompt('Enter user role');
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, password, email, role}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getUser();
            });
    }

    function deleteUser() {
        let iduser = prompt('Enter user id');
        fetch(`http://localhost:3001/users/${iduser}`, {
            method: 'DELETE',
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getUser();
            });
    }

    function updateUser() {
        let iduser = prompt('Enter user id');
        let name = prompt('Enter user name');
        let password = prompt('Enter user password');
        let email = prompt('Enter user email');
        let role = prompt('Enter user role');
        fetch(`http://localhost:3001/users/${iduser}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, password, email, role}),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getUser();
            });
    }

    useEffect(() => {
        getUser();
    }, []);
    return (
        <div>
            {users ? users : 'There is no users data available'}
            <br />
            <button onClick={createUser}>Add user</button>
            <br />
            <button onClick={deleteUser}>Delete user</button>
            <br />
            <button onClick={updateUser}>Update user</button>
        </div>
    );
}
export default App;