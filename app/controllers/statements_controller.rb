class StatementsController < ApplicationController
  # GET /tweets
  # GET /tweets.json
  def show
    id = params[:id] ? params[:id] : Statement.last.id
    @statement = Statement.find(id)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @statement }
    end
  end
end