class HomeController < ApplicationController
  def index
    #Tweet.update_tweets('3_Beards')

    session[:LAST_ID] = nil

    respond_to do |format|
      format.html # show.html.erb
      format.js
      format.json { render json: @tweets }
    end

  end

  def ping
    render :nothing => true, :status => 200, :content_type => 'text/html'
  end

end