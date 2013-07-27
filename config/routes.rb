Manifesto::Application.routes.draw do

get 'ping' => 'home#ping'


  root :to => 'home#index'

end
