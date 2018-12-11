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
import { GiftedChat } from 'react-native-gifted-chat';

const crypt = require('../crypt');
import Environment from '../config/environment';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loading: false, user: '', receiver: '', token: '', chat: [], send_msg: '', log: ''};
        // this.setState({ currUser: props.user, token: props.token})

        this.onSend = this.onSend.bind(this);
        this._getMsg = this._getMsg.bind(this);
    }

    

    _getMsg(token, receiver) {
        fetch(Environment.CLIENT_API+"/chats", {
            method: "GET",
            headers: {
                'x-access-token': token,
                'receiver': receiver
            }
        })
        .then((response) => response.json())
        .then((response) => {
            //console.log('I dont get a response ' + response.success)
            this.setState({ loading: true })
            if (response.success) {
                var chat = response.chat;
                // console.log(chat);
                Object.keys(chat).map((key) => {
                    chat[key]['user'] = chat[key]['user'][0];
                    // console.log(chat[key]['data']);
                    //console.log(crypt.decryptMsg(chat[key]['data'][0]));
                    chat[key]['text'] = crypt.decryptMsg(chat[key]['data'][0]);
                    // console.log(chat[key]['text']);
               });
                //console.log(chat);
                //this.setState({ loading: false, chat: chat, log: response.log });
                this.setState(previousState => ({
                    chat: GiftedChat.append([], chat),
                }));
            }
            else this.setState({ log: response.log, loading: false });
            // console.log('did it work? ' + response.log);
        })
        .catch(err => {
            this.setState({ loading: false, log: err });
        });
    }

    onSend(messages = []) {
        var data = crypt.encryptMsg(messages[0].text);
        //console.log(data);
        // console.log(messages[0].text)
        console.log('receiver: ' + this.state.receiver);
        var params = {
            user: this.state.user,
            sender: this.state.user.email,
            receiver: this.state.receiver,
            iv: data.iv,
            keys: data.keys,
            cipher: data.cipher,
            tag: data.tag
        };
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(Environment.CLIENT_API+"/chats", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': this.state.token
                },
                body: formBody
            })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    //this.setState({ chats: chat.push(send_msg) })
                    this.setState(previousState => ({
                        chat: GiftedChat.append(previousState.chat, messages),
                    }))
                    // console.log('encrypted message sent! ' + data);
                }
                else this.setState({ log: response.log });
                // console.log('somethings wrong? ' + response.log);
            })
            .catch(err => {
				this.setState({ loading: false, log: err.message });
			});
    }

    componentDidMount() {
        const { navigation } = this.props;
        const token = navigation.getParam('token', 'NO-TOKEN');
        const user = navigation.getParam('user', 'NO-USER');
        const receiver = navigation.getParam('receiver', 'NO-RECEIVER');
        //console.log(receiver);
        this.setState({user: user, receiver: receiver, token: token});
        this._getMsg(token, receiver);
    }


    // componentDidUpdate() {
    //     this._getMsg();
    // }

    render() {
        return(
            <GiftedChat
                inverted={true}
                messages={this.state.chat}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: this.state.user._id
                }}
            />
        )
    }
}