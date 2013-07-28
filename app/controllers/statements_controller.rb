class StatementsController < ApplicationController
  # GET /tweets
  # GET /tweets.json
  def index
    @statements = Statement.all
    respond_to do |format|
      format.html
    end
  end

  def show
    TwitterUser.check_mentions
    if Statement.any?
      session[:NEXT_ID] = Statement.first.id - 1 if params[:position] == :first

      begin
        raise ActiveRecord::RecordNotFound unless session[:NEXT_ID]
        session[:NEXT_ID] = session[:NEXT_ID] + 1
        @statement = Statement.find(session[:NEXT_ID])
      rescue ActiveRecord::RecordNotFound
        @statement = Statement.last
        session[:NEXT_ID] = @statement.id
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