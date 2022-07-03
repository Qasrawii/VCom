import React, { useCallback, useState, useLayoutEffect, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

const ChatScreen = ({ navigation, route }) => {
    const [messages, setMessages] = useState([]);
    const userId = auth().currentUser._user.uid
    const resId = route.params?.resId
    const resEmail = route.params?.email
    useEffect(() => {
        database()
            .ref(`/chats${userId + resId}`)
            .orderByChild('createdAt', 'desc')
            .on("child_added", snap => {
                let data = snap.val();
                setMessages(prev => (GiftedChat.append(prev, data)));
            });


    }, [])


    useEffect(() => {
        console.log('route.params', route.params)
        start()
        handleStart()

    }, [])



    const start = () => {
        const subscriber = firestore()
            .collection('chatList').doc(userId)
            .onSnapshot(documentSnapshot => {
                handleStart(documentSnapshot.data());
            });

    }

    const handleStart = (arr) => {
        if (arr == undefined) {
            let tmp = {
                arr: [{
                    id: resId,
                    name: route.params?.name
                }]
            }
            firestore()
                .collection('chatList')
                .doc(userId)
                .set(tmp)
            
        return 
        }
        let tmp = arr.arr
        for (var key in tmp) {
            if (tmp[key].id == resId) {
               
                return
            }

        }



        let tmpArr = arr.arr
        tmpArr.push({
            id: resId,
            name: route.params?.name
        })
        let result = {
            arr: tmpArr
        }
        firestore()
            .collection('chatList')
            .doc(userId)
            .set(result)


    }


    const onSend = (messages = []) => {
        database()
            .ref(`/chats${userId + resId}`)
            .push(messages[0])
    }

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={false}
            onSend={messages => onSend(messages)}
            user={{
                _id: userId,
                name: auth().currentUser._user.email,
            }}
        />
    );
}

export default ChatScreen;