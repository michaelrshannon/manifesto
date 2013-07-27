Manifesto::Application.routes.draw do

  get 'ping' => 'home#ping'
  get 'show/:id' => 'statements#show', :as => :statement
  root :to => 'home#index'

end
