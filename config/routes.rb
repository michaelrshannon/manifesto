Manifesto::Application.routes.draw do

  get 'ping' => 'home#ping'
  get 'statement/next' => 'statements#show', :constraints => {:format => /(json)/}, :position => :next, :as => :next_statement
  get 'statement/first' => 'statements#show', :constraints => {:format => /(json)/}, :position => :first, :as => :first_statement
  root :to => 'home#index'

end
