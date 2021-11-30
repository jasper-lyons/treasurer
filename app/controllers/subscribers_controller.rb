class SubscribersController < ActionController::Base
	def subscribe 
		subscriber = Subscriber.new(email: params[:email])
		subscriber.save

		redirect_to '/', notice: '- thank you for your subscription -'
	end
end
