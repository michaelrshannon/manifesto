Manifesto::Application.routes.draw do

  get 'ping' => 'home#ping'
  get 'statements/:id' => 'statements#show', :constraints => {:format => /(json)/}, :as => :statement
  root :to => 'home#index'

end
