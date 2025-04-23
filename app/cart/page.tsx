"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { removeFromCart, updateQuantity, clearCart } from "@/redux/features/cartSlice"
import { toast } from "sonner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ShoppingBagIcon, ArrowLeftIcon, TrashIcon, PlusIcon, MinusIcon } from "@/components/icons"

// Define the form schema
const formSchema = z.object({
  c_name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  c_phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(10, { message: "Address must be at least 10 characters" }),
  courier: z.string(),
})

// Define the form values type
type FormValues = z.infer<typeof formSchema>

export default function CartPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { cart } = useAppSelector((state) => state.cart)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Short timeout to ensure cart is loaded from localStorage
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Initialize the form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      c_name: "",
      c_phone: "",
      address: "",
      courier: "steadfast",
    },
  })

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id))
    toast.success("Item removed from cart")
  }

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return
    dispatch(updateQuantity({ id, quantity }))
  }

  const onSubmit = async (data: FormValues) => {
    if (cart.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    setIsSubmitting(true)

    const productIds = cart.map((item) => item.id).join(",")
    const quantities = cart.map((item) => item.quantity).join(",")
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    const deliveryCharge = 80

    const orderData = {
      product_ids: productIds,
      s_product_qty: quantities,
      c_name: data.c_name,
      c_phone: data.c_phone,
      address: data.address,
      courier: data.courier,
      cod_amount: (subtotal + deliveryCharge).toString(),
      delivery_charge: deliveryCharge.toString(),
      advance: null,
      discount_amount: null,
    }

    try {
      // For demo purposes, we'll simulate a successful order
      // In a real app, you would uncomment the line below
      // await dispatch(placeOrder(orderData)).unwrap()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success("Order placed successfully! Continue shopping for more products.")
      dispatch(clearCart())
      reset({
        c_name: "",
        c_phone: "",
        address: "",
        courier: "steadfast",
      })

      // Redirect to products page after successful order
      setTimeout(() => {
        router.push("/products")
      }, 1500)
    } catch (error) {
      toast.error("Failed to place order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show skeleton loader while checking localStorage
  if (!isClient || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="flex justify-center items-center py-16">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryCharge = 80
  const total = subtotal + deliveryCharge

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
            <ShoppingBagIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/products">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold">Cart Items ({cart.length})</h2>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {cart.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                    <div className="w-24 h-24 relative flex-shrink-0">
                      <Image
                        src={`https://admin.refabry.com/storage/product/${item.image}`}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">৳{item.price}</p>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                          <button
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <MinusIcon className="w-3 h-3" />
                          </button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <button
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <PlusIcon className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-md transition-colors"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                <Link href="/products">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium rounded-md transition-colors">
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  Complete your order by providing your details
                </p>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="c_name" className="block text-sm font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        id="c_name"
                        {...register("c_name")}
                        placeholder="Enter your full name"
                        className={`w-full px-3 py-2 border ${
                          errors.c_name ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                        } rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.c_name && <p className="mt-1 text-sm text-red-500">{errors.c_name.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="c_phone" className="block text-sm font-medium mb-1">
                        Phone Number *
                      </label>
                      <input
                        id="c_phone"
                        {...register("c_phone")}
                        placeholder="Enter your phone number"
                        className={`w-full px-3 py-2 border ${
                          errors.c_phone ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                        } rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.c_phone && <p className="mt-1 text-sm text-red-500">{errors.c_phone.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-1">
                        Delivery Address *
                      </label>
                      <textarea
                        id="address"
                        {...register("address")}
                        placeholder="Enter your full address"
                        rows={3}
                        className={`w-full px-3 py-2 border ${
                          errors.address ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                        } rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="courier" className="block text-sm font-medium mb-1">
                        Courier Service
                      </label>
                      <select
                        id="courier"
                        {...register("courier")}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="steadfast">Steadfast</option>
                        <option value="pathao">Pathao</option>
                        <option value="redx">RedX</option>
                        <option value="paperfly">Paperfly</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-gray-200 dark:border-gray-800 pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>৳{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Charge:</span>
                      <span>৳{deliveryCharge}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-800">
                      <span>Total:</span>
                      <span>৳{total}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
