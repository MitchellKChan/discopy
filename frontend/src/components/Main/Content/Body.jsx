import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchChannel } from '../../../utils/channelApiUtils';
import BodyItem from './BodyItem';
import { createMessage, receiveMessage } from '../../../utils/messageApiUtils';
import consumer from '../../../consumer';

import './Body.css';

const Body = ({ serverId = "@me", type }) => {
    const dispatch = useDispatch();
    const { channelId } = useParams();
    const currentUser = useSelector(state => state.entities.currentUser);
    const channels = useSelector(state => state.entities.channels);
    const messages = useSelector(state => state.entities.messages);
    const isValidChannelId = (channelId) => channels && Object.keys(channels).includes(channelId);
    const channel = (isValidChannelId(channelId)) ? channels[channelId] : null;
    const server = useSelector(state => serverId !== "@me" ? state.entities.servers[serverId] : null)
    const users = useSelector(state => state.entities.users ? state.entities.users : null);

    const messageDivRef = useRef(null);

    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        scrollToBottom();
    })

    useEffect(() => {
        if (isValidChannelId(channelId)) dispatch(fetchChannel(channelId));

        // create a subscription
        const subscription = consumer.subscriptions.create(
            { channel: "ChannelsChannel", id: channelId },
            {
                received: message => {
                    dispatch(receiveMessage(message))
                }
            }
        );

        // unsubscribe when leaving 
        return () => subscription?.unsubscribe();
    }, [channelId]);

    const scrollToBottom = () => {
        messageDivRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    let title = "@me";
    if (channel) title = channel.name;

    let channelsMessages = [];
    if (isValidChannelId(channelId) && messages) channelsMessages = Object.values(messages).filter(message => message.sendableId == channelId);

    let members = [];
    if (serverId !== "@me" && users) {
        let memberIds = [];
        if (server.memberIds) memberIds = Object.keys(server.memberIds);
        members = Object.values(users).filter(user => memberIds.includes(String(user.id)));
    }

    const handleChange = (e) => {
        e.preventDefault();
        setNewMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim().length > 0) {
            const message = {
                body: newMessage.trim(),
                authorId: currentUser.id,
                sendableType: type,
                sendableId: channelId
            };
            dispatch(createMessage(message));
            setNewMessage("");
        }
    }

    return (
        <div className="content-body-container">
            <div className="body-header-container">
                <span className="hashtag">#</span>
                {title}
            </div>
            <div className="body-content-container">
                <div className="body-content-items-container">
                    <div className="body-content-items-wrapper">
                        {channelsMessages.length > 0 && users ? channelsMessages.map(message => {
                            return (
                                <BodyItem
                                    key={message.id}
                                    message={message}
                                    author={users[message.authorId]}
                                />
                            );
                        }) : <></>}
                    <div ref={messageDivRef} />
                    </div>
                    {serverId !== "@me" ? <div className="body-content-form-wrapper">
                        <form onSubmit={handleSubmit}>
                            <label className="new-message-label">
                                <input
                                    type="text"
                                    className="new-message-input"
                                    onChange={(e => handleChange(e))}
                                    value={newMessage}
                                />
                            </label>
                        </form>
                    </div> : <></>}

                </div>
                <div className="body-content-sidebar-container">
                    {members.map(member => {
                        return (
                            <div
                                key={member.id}
                                className="body-sidebar-item-container"
                            >
                                <div className="body-sidebar-item-icon">
                                    {member.username.substring(0, 3)}
                                </div>
                                <div className="body-sidebar-item-username">
                                    {member.username}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Body;