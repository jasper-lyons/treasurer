class CreateLinktreeItems < ActiveRecord::Migration[6.0]
  def change
    create_table :linktree_items do |t|
      t.string :title
      t.string :url
      t.references :linktree

      t.timestamps
    end
  end
end
