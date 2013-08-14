class HomeController < ApplicationController
  
  def index
    session[:NEXT_ID] = nil
    respond_to do |format|
      format.html # show.html.erb
      format.js
    end
  end

  def ping
    TwitterUser.check_mentions
    render :nothing => true, :status => 200, :content_type => 'text/html'
  end

end