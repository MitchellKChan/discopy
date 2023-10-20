import './BodyItem.css';

const BodyItem = ({ message, author = {} }) => {
    const timestamp = new Date(message.createdAt);

    return (
        <div className="body-item-container">
            <div className="body-item-icon">
                {author.username.substring(0, 3)}
            </div>
            <div className="body-item-content-container">
                <div className="body-item-header">
                    <div className="body-item-author">
                        {author.username}
                    </div>
                    <div className="body-item-time">
                        {`${timestamp.toLocaleDateString()} 
                        ${timestamp.toLocaleTimeString()}`}
                    </div>
                </div>
                <div className="body-item-content">
                    {message.body}
                </div>
            </div>
        </div>
    );
}

export default BodyItem;