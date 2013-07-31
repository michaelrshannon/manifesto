require 'resque/server'
Manifesto::Application.routes.draw do
  resources :mentions


  ### Resque server interface
  unless %w(development staging).include?(Rails.env)
    resque_constraint = lambda do |request|
      user = request.env['warden'].user
      request.env['warden'].authenticate? and user.is_a?(AdminUser) and user.email == 'admin@pixelcab.in'
    end
  end
  constraints resque_constraint do
    mount Resque::Server, :at => '/admin/debug/resque'
  end
  ###

  get 'ping' => 'home#ping'
  get 'statements' => 'statements#index', :as => :statements
  get 'statement/next' => 'statements#show', :constraints => {:format => /(json)/}, :position => :next, :as => :next_statement
  get 'statement/first' => 'statements#show', :constraints => {:format => /(json)/}, :position => :first, :as => :first_statement
  get 'statement/:id' => 'statements#show', :constraints => {:format => /(json)/}, :position => :static, :as => :static_statement
  get ':id/:name' => 'home#index', :as => :show_statement
  root :to => 'home#index'

end
