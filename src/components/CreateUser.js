import React from "react";
import UserService from "../service/UserService";

class CreateUser extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstname: '',
            dob: '',
            email: '',
            username:'',
            lastname: '',
            password:'',
            fields: {},
            errors: {}
        }
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
        this.changeFirstNameHandler=this.changeFirstNameHandler.bind(this);
        this.changeDobHandler=this.changeDobHandler.bind(this);
        this.changeEmailHandler=this.changeEmailHandler.bind(this);
        this.changeLastNameHandler=this.changeLastNameHandler.bind(this);
        this.changePasswordHandler=this.changePasswordHandler.bind(this);
        this.changeUserNameHandler=this.changeUserNameHandler.bind(this);

    }

    componentDidMount() {

        // step 4
        if(this.state.id === '_add'){

        }else{
            UserService.getStudentById(this.state.id).then( (res) =>{
                let user = res.data;
                this.setState(
                    {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        dob:user.dob,
                        email:user.email,
                        username:user.username,
                        password:user.password,
                    });
            });
        }
     }

    changeFirstNameHandler(event){
        this.setState({firstname: event.target.value});
    }
    changeDobHandler(event){
        this.setState({dob: event.target.value});
    }
    changeLastNameHandler(event){
        this.setState({lastname: event.target.value});
    }
    changeEmailHandler(event){
        this.setState({email: event.target.value});
    }
    changeUserNameHandler(event){
        this.setState({username: event.target.value});
    }
    changePasswordHandler(event){
        this.setState({password: event.target.value});
    }

    cancel(){
        this.props.history.push('/');
    }
    saveOrUpdateUser=(e)=>{
        e.preventDefault();

        let user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            password: this.state.password,
            email:this.state.email,
            dob:this.state.dob
        };
        console.log('Student => ' + JSON.stringify(user));
        if(this.state.id === '_add'){
            UserService.createUser(user).then(res =>{
                this.props.history.push('/');
            });
        }else{
            UserService.updateUser(user, this.state.id).then( res => {
                this.props.history.push('/');
            });
        }

    }
    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add User</h3>
        }else{
            return <h3 className="text-center">Edit User</h3>
        }}

    render() {
        return(

            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Enter  FirstName: </label>
                                        <input placeholder="First Name" name="name" className="form-control"
                                               value={this.state.firstname}  onChange={this.changeFirstNameHandler} required/>
                                    </div>
                                    <div className = "form-group">
                                        <label>Enter Dob : </label>
                                        <input  placeholder="yyyy-mm-dd" type="date"  className="form-control"
                                                value={this.state.dob} onChange={this.changeDobHandler} required/>
                                    </div>



                                    <div className = "form-group">
                                        <label>Enter Lastname </label>
                                        <input placeholder="Enter Lastname" name="mobile" className="form-control"
                                               value={this.state.lastname} onChange={this.changeLastNameHandler} required/>
                                    </div>
                                    <div className = "form-group">
                                        <label>Enter Email </label>
                                        <input placeholder="Entry Email" type="email" name="mobile" className="form-control"
                                               value={this.state.email} onChange={this.changeEmailHandler} required/>
                                    </div>
                                    <div className = "form-group">
                                        <label>Enter Username </label>
                                        <input placeholder="Entry Username" name="mobile" className="form-control"
                                               value={this.state.username} onChange={this.changeUserNameHandler} required/>
                                    </div>
                                    <div className = "form-group">
                                        <label>Enter Password </label>
                                        <input placeholder="Entry Password" name="mobile" className="form-control"
                                            type="password" value={this.state.password} onChange={this.changePasswordHandler} required/>
                                    </div>


                                    <button className="btn btn-success" onClick={this.saveOrUpdateUser}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default CreateUser;
