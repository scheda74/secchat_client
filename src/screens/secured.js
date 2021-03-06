import React, { Component } from 'react';
import {
	ScrollView,
	Text,
	View,
    Button,
    FlatList,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { ListItem, List, SearchBar } from 'react-native-elements';
import Chat from './chat';

export default class Secured extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { loading: false, user: '', availableUsers: [], msg_enc: '', msg_dec: '', sender: '', receiver: '', token: '' };
    }


    _getAvailableUsers = (token) => {
        fetch(Environment.CLIENT_API+"/chats/users", {
            method: "GET",
            headers: {
                'x-access-token': token
            }
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({ loading: true })
            if (response.success==true) {
                proceed = true;
                this.setState({ loading: false, availableUsers: response.available });
            }
            else this.setState({ loading: false, msg_enc: response.msg_enc });
        })
        .catch(err => {
            this.setState({ loading: false, msg_enc: err.message });
        });    
    }

    _sendMsg = (token) => {
        var params = {
            sender: ''
        };
        var formBody = [];
        fetch(Environment.CLIENT_API+"/chats", {
            method: "POST",
            headers: {
                'x-access-token': token
            }
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.success==true) {
                proceed = true;
                this.setState({ msg_enc: response.msg_enc });
            }
            else this.setState({ msg_enc: response.msg_enc });
        })
        .catch(err => {
            this.setState({ msg_enc: err.message });
        });
    }

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
    };

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
      };

    componentDidMount() {
        // after components are loaded following variables are being initialized
        const { navigation } = this.props;
        const token = navigation.getParam('token', 'NO-TOKEN');
        const user = navigation.getParam('user', 'NO-USER');
        this.setState({user: user, token: token});
        this._getAvailableUsers(token);
    }
    
	render() { 
		return (
			<ScrollView style={{padding: 20}}>
				<Text 
					style={{fontSize: 27}}>
					Welcome {this.state.user.name}
				</Text>
				<View style={{margin:20}} />
                <View>
                    <FlatList
                        ListEmptyComponent={() => this.state.loading ? <ActivityIndicator /> : null}
                        data={this.state.availableUsers}
                        renderItem={({ item }) => (
                            item._id !== this.state.user._id ?
                                <ListItem
                                roundAvatar
                                title={item.name}
                                onPress={() => this.props.navigation.navigate('Chat', {
                                    user: this.state.user, token: this.state.token, receiver: item.email
                                })} /> : <View />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={this.renderHeader}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
				<Button
		            onPress={() => {
                        this.setState({isLoggedIn: false});
                        this.props.navigation.navigate('Login');
                    }}
		            title="Logout"
		        />
		    </ScrollView>
        )
	}
}
const Row = (user) => (
    <View style={styles.container}>
      {/* <Image source={{ uri: props.picture.large}} style={styles.photo} /> */}
      <Text style={styles.text}>
        {`${user.name}`}
      </Text>
    </View>
  );

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      height: 40, 
      width: 80, 
      borderColor: 'gray', 
      borderWidth: 1
    },
    btn: {
      height: 40, 
      width: 80,  
      borderWidth: 1,
      backgroundColor: 'skyblue'
    }
  });