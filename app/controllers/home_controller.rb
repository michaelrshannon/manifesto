class HomeController < ApplicationController
  
  def index
    session[:LATEST_ID] = Statement.last.id

    if params[:id]
      @statement = Statement.find(params[:id])
    end

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