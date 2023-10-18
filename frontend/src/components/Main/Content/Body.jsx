import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect, useRouteMatch, Switch } from 'react-router-dom';
import { fetchChannel } from '../../../utils/channelApiUtils';

const Body = () => {
    const dispatch = useDispatch();
    const { channelId } = useParams();
    const channels = useSelector(state => state.entities.channels);
    const channel = channels ? channels[channelId] : null;

    useEffect(() => {
        if (isValidChannelId(channelId)) dispatch(fetchChannel(channelId));
    }, [channelId]);

    const isValidChannelId = (channelId) => channels && Object.keys(channels).includes(channelId);


    let title = "@me";
    if (channel) title = channel.name;

    return (
        <div className="content-body-container">
            <div className="body-header-container">
                {title}
            </div>
            <div className="body-content-container">
                <div className="body-content-items-container">
                    LinkItem / DirectMessageItem / ChannelMessageItem Container Placeholder
                </div>
                <div className="body-content-sidebar-container">
                    ActiveNowIndex / UserProfile / MemberListIndex Container Placeholder
                </div>
            </div>
        </div>
    );
}

export default Body;