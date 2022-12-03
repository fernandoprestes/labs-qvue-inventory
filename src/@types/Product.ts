export interface Product {
  id: number,
  created_at: Date,
  name: string,
  description: string,
  amount: number,
  price: number,
  imgUrl: string,
  category: number,
  user_id: string
}
