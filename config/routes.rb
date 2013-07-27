Manifesto::Application.routes.draw do

  get 'ping' => 'home#ping'
  get 'statement/next' => 'statements#show', :constraints => {:format => /(json)/}, :as => :next_statement
  root :to => 'home#index'

end
