class AddSlugToLinktree < ActiveRecord::Migration[6.0]
  def change
    add_column :linktrees, :slug, :string
  end
end
