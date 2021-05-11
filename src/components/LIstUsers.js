import React from "react";
import UserService from "../service/UserService";

class LIstUsers  extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.addUser=this.addUser.bind(this);
    }


    editUser(id){
        this.props.history.push(`/add-user/${id}`);
    }
    deleteUser(id){
        UserService.deleteUser(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });
    }

    componentDidMount(){
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data});
        });
    }

    addUser(){
        this.props.history.push('/add-user/_add');
    }

    render() {
        return(
            <div>
                <h2 className="text-center">Users List</h2>
                <div className = "row">
                    <button className="btn btn-primary" onClick={this.addUser}> Add Employee</button>
                </div>
                <br></br>
                <div className = "row">
                    <table className = "table table-striped table-bordered">

                        <thead>
                        <tr>
                            <th>   Name</th>
                            <th> Dob</th>
                            <th> Username</th>
                            <th> Email</th>

                            <th> Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map(
                                user =>
                                    <tr key = {user.id}>
                                        <td> { user.firstname}  {user.lastname} </td>
                                        <td> {user.dob}</td>
                                        <td>{user.username}  </td>
                                        <td> {user.email}</td>
                                        <td>
                                            <button onClick={ () => this.editUser(user.id)} className="btn btn-info">Edit </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(user.id)} className="btn btn-danger">Delete </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}
export default LIstUsers;
