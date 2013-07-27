Manifesto::Application.routes.draw do

  get 'ping' => 'home#ping'

  get 'show' => 'twitter_users#show', :as => :twitter_user
  root :to => 'home#index'

end
