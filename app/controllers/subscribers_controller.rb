class SubscribersController < ActionController::Base
	def subscribe 
		subscriber = Subscriber.new(email: params[:email])
		subscriber.save

		redirect_to '/', notice: 'thank you?'
	end
end
