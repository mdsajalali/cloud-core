"use client"

import type React from "react"

import { useState } from "react"
import { useAppDispatch } from "@/redux/hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/types"
import { toast } from "sonner"

interface OrderFormProps {
  product: Product
}

export default function OrderForm({ product }: OrderFormProps) {
  const dispatch = useAppDispatch()

  const [quantity, setQuantity] = useState(1)
  const [formData, setFormData] = useState({
    c_name: "",
    c_phone: "",
    address: "",
    courier: "steadfast",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleQuantityChange = (value: string) => {
    const qty = Number.parseInt(value)
    if (qty > 0) {
      setQuantity(qty)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCourierChange = (value: string) => {
    setFormData((prev) => ({ ...prev, courier: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.c_name || !formData.c_phone || !formData.address) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    const orderData = {
      product_ids: product.id.toString(),
      s_product_qty: quantity.toString(),
      c_name: formData.c_name,
      c_phone: formData.c_phone,
      address: formData.address,
      courier: formData.courier,
      cod_amount: (product.price * quantity + 80).toString(),
      delivery_charge: "80",
      advance: null,
      discount_amount: null,
    }

    try {
      // For demo purposes, we'll simulate a successful order
      // In a real app, you would uncomment the line below
      // await dispatch(placeOrder(orderData)).unwrap()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success("Order placed successfully!")

      // Reset form
      setQuantity(1)
      setFormData({
        c_name: "",
        c_phone: "",
        address: "",
        courier: "steadfast",
      })
    } catch (error) {
      toast.error("There was an error placing your order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalPrice = product.price * quantity
  const deliveryCharge = 80
  const grandTotal = totalPrice + deliveryCharge

  return (
    <Card>
      <CardHeader>
        <CardTitle>Place Your Order</CardTitle>
        <CardDescription>Fill in your details to complete the order</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <div className="flex items-center mt-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => quantity > 1 && handleQuantityChange((quantity - 1).toString())}
                >
                  -
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  className="text-center mx-2"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange((quantity + 1).toString())}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="c_name">Full Name *</Label>
                <Input
                  id="c_name"
                  name="c_name"
                  value={formData.c_name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="c_phone">Phone Number *</Label>
                <Input
                  id="c_phone"
                  name="c_phone"
                  value={formData.c_phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Delivery Address *</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your full address"
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="courier">Courier Service</Label>
              <Select value={formData.courier} onValueChange={handleCourierChange}>
                <SelectTrigger id="courier">
                  <SelectValue placeholder="Select courier service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="steadfast">Steadfast</SelectItem>
                  <SelectItem value="pathao">Pathao</SelectItem>
                  <SelectItem value="redx">RedX</SelectItem>
                  <SelectItem value="paperfly">Paperfly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>৳{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge:</span>
              <span>৳{deliveryCharge}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total:</span>
              <span>৳{grandTotal}</span>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Place Order"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
