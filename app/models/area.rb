class Area < ApplicationRecord

  validates :name, presence: true
  
  has_many :shops
  has_ancestry

  def set_shops
    if self.root?
      start_id = self.indirects.first.id
      end_id = self.indirects.last.id
      shops = Shop.where(area_id: start_id..end_id)
      return shops
  
    elsif self.has_children?
      start_id = self.children.first.id
      end_id = self.children.last.id
      shops = Shop.where(area_id: start_id..end_id)
      return shops
  
    else
      return self.shops
    end
  end
end
