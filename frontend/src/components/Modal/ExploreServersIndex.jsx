import { hideModal } from "../../store/modal";
import { useHistory } from "react-router-dom";

const ExploreServersIndex = () => {
    return (
        <div className="server-form-container">
            <div className="server-form-wrapper">
                <div className="server-form-header">
                    <div className="form-header-title">
                        {type === "new" ?
                            "Create a server" :
                            "Edit server"
                        }
                    </div>
                    <div className="form-header-message">
                        Your server is where you and your
                        friends hang out.
                        {type === "new" ?
                            "  Make yours and start talking." :
                            "  Edit yours how you like."
                        }
                    </div>
                    <button
                        className="form-header-close"
                        onClick={() => dispatch(hideModal())}
                    >
                        x
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExploreServersIndex;