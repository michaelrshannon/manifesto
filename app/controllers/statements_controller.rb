class StatementsController < ApplicationController
  # GET /tweets
  # GET /tweets.json
  def index
    @statements = Statement.includes([:first_tweet_model, :second_tweet_model]).all
    respond_to do |format|
      format.json { render json: @statements }
    end
  end

  def last
    respond_to do |format|
      format.json { render json: Statement.last }
    end
  end

  def show
    TwitterUser.check_mentions
    if Statement.any?
      if params[:id]
        #begin
        @statement = Statement.find(params[:id])
      end

      if @statement.nil?
        begin
          raise ActiveRecord::RecordNotFound unless session[:LATEST_ID]
          if session[:LATEST_ID] == Statement.last.id
            @statement = Statement.first(:order => "RANDOM()")
            # We don't touch LATEST_ID in this case
          else
            session[:LATEST_ID] = session[:LATEST_ID] + 1
            @statement = Statement.find(session[:LATEST_ID])
          end
        rescue ActiveRecord::RecordNotFound
          @statement = Statement.last
          session[:LATEST_ID] = @statement.id
        end
      end

      respond_to do |format|
        format.json { render json: @statement }
      end
    else
      respond_to do |format|
        format.json { render nothing: true }
      end
    end
  end
end