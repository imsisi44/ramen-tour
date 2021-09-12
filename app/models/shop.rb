class Shop < ApplicationRecord
  geocoded_by :address
  after_validation :geocode, if: :address_changed?

  validates :name, presence: true
  validates :address, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :image1, presence: true

  belongs_to :area
  has_many :comments, dependent: :destroy
  has_many :favorites, dependent: :destroy

  mount_uploader :image1, ImageUploader
  mount_uploader :image2, ImageUploader
  mount_uploader :image3, ImageUploader
  mount_uploader :image4, ImageUploader
  mount_uploader :image5, ImageUploader

  def self.search(search)
    return Shop.all unless search
    Shop.where(['name LIKE ?', "%#{search}%"])
  end

end
