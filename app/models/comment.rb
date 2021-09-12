class Comment < ApplicationRecord

  validates :title, presence: true
  validates :rate, presence: true

  belongs_to :user
  belongs_to :shop

end
