import './BodyItem.css';

const BodyItem = ({ message, author = {} }) => {
    return (
        <div className="body-item-container">
            <div className="body-item-icon">
                {message.authorId}
            </div>
            <div className="body-item-content-container">
                <div className="body-item-author">
                    {author.username}
                </div>
                <div className="body-item-content">
                    {message.body}
                </div>
            </div>
        </div>
    );
}

export default BodyItem;