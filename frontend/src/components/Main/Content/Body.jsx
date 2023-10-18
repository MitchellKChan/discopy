import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchChannel } from '../../../utils/channelApiUtils';
import BodyItem from './BodyItem';

const Body = () => {
    const dispatch = useDispatch();
    const { channelId } = useParams();
    const channels = useSelector(state => state.entities.channels);
    const messages = useSelector(state => state.entities.messages);
    const isValidChannelId = (channelId) => channels && Object.keys(channels).includes(channelId);
    const channel = (isValidChannelId(channelId)) ? channels[channelId] : null;

    useEffect(() => {
        if (isValidChannelId(channelId)) dispatch(fetchChannel(channelId));
    }, [channelId]);

    let title = "@me";
    if (channel) title = channel.name;
    
    let channelsMessages = {};
    if (isValidChannelId(channelId)) channelsMessages = Object.values(messages).filter(message => message.sendableId == channelId);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="content-body-container">
            <div className="body-header-container">
                {title}
            </div>
            <div className="body-content-container">
                <div className="body-content-items-container">
                    <div>
                        {channelsMessages.length > 0 ? channelsMessages.map(message => {
                            return (
                                <BodyItem key={message.id} message={message} />
                            );
                        }) : <></>}
                    </div>
                    <div className="body-content-items-form">
                        <form onSubmit={handleSubmit}></form>
                    </div>
                </div>
                <div className="body-content-sidebar-container">
                    ActiveNowIndex / UserProfile / MemberListIndex Container Placeholder
                </div>
            </div>
        </div>
    );
}

export default Body;