class StatementsController < ApplicationController
  # GET /tweets
  # GET /tweets.json
  def show

    begin
      session[:NEXT_ID] = session[:NEXT_ID] + 1
      @statement = Statement.find(session[:NEXT_ID])
    rescue ActiveRecord::RecordNotFound
      @statement = Statement.last
      session[:NEXT_ID] = @statement.id
    end

    respond_to do |format|
      format.json { render json: @statement }
    end
  end
end