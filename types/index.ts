export interface Product {
  id: number
  unique_id: string
  name: string
  short_desc: string
  image: string
  video: string | null
  category_id: number
  is_published: number
  price: number
  stock: number
  code: string
  pre_order: string | null
  stock_location: string | null
  buying_price: number
  has_variation: number
  is_discount: number
  discount_amount: string
  discount_date: string | null
  created_by: number
  stock_location_id: number
  created_at: string
  updated_at: string
  product_variation: any[]
  variation_combinations: any[]
  category: {
    id: number
    name: string
  }
  product_images: {
    id: number
    name: string
    pivot: {
      product_id: number
      image_id: number
    }
  }[]
}

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}
