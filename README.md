# テーブル設計

## users テーブル

| Column          | Type   | Option      |
| --------------- | ------ | ----------- |
| nickname        | string | null: false |
| email           | string | null: false |
| password        | string | null: false |

### Association

  - has_many :comments
  - has_many :fovorites

## shops テーブル

| Column            | Type       | Option      |
| ----------------- | ---------- | ----------- |
| name              | string     | null: false |
| address           | string     | null: false |
| latitude          | float      | null: false |
| longitude         | float      | null: false |
| phone_number      | string     |             |
| area              | references | null: false |
| image1            | string     | null: false |
| image2            | string     |             |
| image3            | string     |             |
| image4            | string     |             |
| image5            | string     |             |

### Association

belongs_to :area
  - has_many :comments
  - has_many :favorites

  - mount_uploader :image1, ImageUploader
  - mount_uploader :image2, ImageUploader
  - mount_uploader :image3, ImageUploader
  - mount_uploader :image4, ImageUploader
  - mount_uploader :image5, ImageUploader

## areas テーブル

| Column | Type   | Option      |
| ------ | ------ | ----------- |
| name   | string | null: false |

### Association

- has_many :shops

## comments テーブル

| Column | Type       | Option      |
| ------ | ---------- | ----------- |

| user   | references | null: false |
| shop   | references | null: false |
| title  | string     | null: false |
| text   | text       |             |
| rate   | float      | null: false |

### Association

- belongs_to :users
- belongs_to :shops

## favorites テーブル

| Column | Type       | Option      |
| ------ | ---------- | ----------- |
| user   | references | null: false |
| shop   | references | null: false |

### Association

- belongs_to :users
- belongs_to :shops
