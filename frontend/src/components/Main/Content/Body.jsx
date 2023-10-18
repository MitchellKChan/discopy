import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Redirect, useRouteMatch, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';

const Body = () => {
    const { channelId } = useParams();
    const channels = useSelector(state => state.entities.channels);


    let channel = "@me channel";
    if (channelId) channel = Object.values(channels).find(channel => channel.id == channelId);

    return (
        <div className="content-body-container">
            <div className="body-header-container">
                {channelId ? channel.name : channel}
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