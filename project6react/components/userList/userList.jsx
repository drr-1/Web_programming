import React from 'react';
import {
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
}
    from '@material-ui/core';
import './userList.css';
// import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
       
    }

    componentDidMount() {
        fetch('/user/list').then(response => response.json()).then(data => {
            this.setState({
                users: data
            })
        });
    }

    render() {
        return (
            <div>
                <Typography variant="body1">
                    User List:
                </Typography>
                <List component="nav">
                    {this.state.users.map((user, index) => (
                        <div key={user._id}>
                            <ListItem button component="a" href={'/photo-share.html#/photos/' + user._id}>
                                <ListItemText primary={ user.first_name + ' ' + user.last_name}/>
                            </ListItem>
                            <Divider/>
                        </div>
                    ))}
                </List>
            </div>

        );
    }
}

export default UserList;
