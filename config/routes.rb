Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  get '/video-page', to: 'pages#videocall'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
 resources :categories, only: [:index, :show] do
    resources :tickets
  end
  resources :chats, only: [:show, :index] do
    resources :messages, only: [:create]
  end
  resources :users, only: [] do
    resources :chats, only: [:create] do
    end
  end
end
