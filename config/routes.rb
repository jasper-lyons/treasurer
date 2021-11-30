Rails.application.routes.draw do
  get '/', controller: :guests, action: :landing_page
  get '/music', controller: :guests, action: :music
  get '/mint', controller: :guests, action: :mint
  post '/subscribe', controller: :subscribers, action: :subscribe

  resources :linktrees
end
