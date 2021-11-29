Rails.application.routes.draw do
  get '/', controller: :guests, action: :landing_page
  get '/mint', controller: :guests, action: :mint
end
