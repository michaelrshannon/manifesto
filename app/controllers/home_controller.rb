class HomeController < ApplicationController
  def index
    Tweet.update_tweets

      @tweets = Tweet.all


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