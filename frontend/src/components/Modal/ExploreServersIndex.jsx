import { useDispatch } from "react-redux";
import { hideModal } from "../../store/modal";
import { useHistory } from "react-router-dom";

import './ExploreServersIndex.css';

const ExploreServersIndex = () => {
    const dispatch = useDispatch();

    return (
        <div className="server-form-container explore-servers-container">
            <div className="server-form-wrapper">
                <div className="server-form-header">
                    <div className="form-header-title">
                        Find your community on Discopy
                    </div>
                    <div className="form-header-message explore-servers-message">
                        From gaming, to music, to learning, 
                        there's a place for you.
                    </div>
                    <button
                        className="form-header-close"
                        onClick={() => dispatch(hideModal())}
                    >
                        x
                    </button>
                </div>
                <div className="explore-servers-items-container">
                    {}
                </div>
            </div>
        </div>
    );
}

export default ExploreServersIndex;