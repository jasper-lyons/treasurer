class AddEmailToSubscriber < ActiveRecord::Migration[6.0]
  def change
    add_column :subscribers, :email, :string
  end
end
