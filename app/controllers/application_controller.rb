class ApplicationController < ActionController::API
    include ActionController::RequestForgeryProtection

    rescue_from StandardError, with: :unhandled_error
    rescue_from ActionController::InvalidAuthenticityToken,
        with: :invalid_authenticity_token
  
    protect_from_forgery with: :exception

    before_action :snake_case_params, :attach_authenticity_token

    def current_user
        return nil unless session[:session_token]
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def require_logged_in
        unless current_user
            render json: {errors: ["Must be logged in"]}, status: 422
        end
    end

    def require_logged_out
        unless !current_user
            render json: {errors: ["Must be logged out"]}, status: 422
        end
    end

    def logged_in?
        !!current_user
    end
      
    def login!(user)
        session[:session_token] = user.reset_session_token!
        user.update_attribute(:status, "Online")
        @current_user = user
    end
      
    def logout!
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user.update_attribute(:status, "Offline")
        @current_user = nil
    end

    # action cable setup helper method
    def from_template(template, locals = {})
        JSON.parse(self.class.render(:json, template: template, locals: locals))
    end
      
    private
    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end

    def attach_authenticity_token
        headers['X-CSRF-Token'] = masked_authenticity_token(session)
    end
      
    def invalid_authenticity_token
        render json: { message: 'Invalid authenticity token' }, 
        status: :unprocessable_entity
    end
    
    def unhandled_error(error)
    if request.accepts.first.html?
        raise error
    else
        @message = "#{error.class} - #{error.message}"
        @stack = Rails::BacktraceCleaner.new.clean(error.backtrace)
        render 'api/errors/internal_server_error', status: :internal_server_error
        
        logger.error "\n#{@message}:\n\t#{@stack.join("\n\t")}\n"
    end
    end
end
