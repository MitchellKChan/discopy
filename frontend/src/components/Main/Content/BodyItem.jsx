import './BodyItem.css';

const BodyItem = ({ message }) => {
    return (
        <div className="body-item-container">
            <div className="body-item-icon">
                {message.authorId}
            </div>
            <div className="body-item-content">
                <div className="body-item-author">
                    author placeholder
                </div>
                <div className="body-item-content">
                    {message.body}
                </div>
            </div>
        </div>
    );
}

export default BodyItem;