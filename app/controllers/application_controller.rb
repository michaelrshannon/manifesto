class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :debug_vars
  before_filter :override_session
  before_filter :update_session


  def override_session
    session[:visit] = nil if params[:new] == 'true'
  end

  def update_session
    if session[:visit] && session[:visit] > Time.now - 1.day
      @new_visit = false
    else
      @new_visit = true
      session[:visit] = Time.now
    end
  end

  def debug_vars
    ENV['LAST_UPDATE'] = nil if params[:reset_update] == 'true'
  end
end
