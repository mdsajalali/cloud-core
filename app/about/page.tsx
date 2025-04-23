import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-12 md:grid-cols-2 items-center mb-16">
        <div>
          <h1 className="text-4xl font-bold mb-4">About Cloud Core</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Cloud Core is a premium clothing brand dedicated to providing
            high-quality, stylish, and comfortable apparel for all seasons.
          </p>
          <p className="mb-6">
            Founded in 2020, we've quickly grown to become one of the most
            trusted names in fashion retail. Our mission is to make premium
            clothing accessible to everyone without compromising on quality or
            style.
          </p>
          <Link href="/products">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
              Explore Our Collection
            </button>
          </Link>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1564518160120-94178fcdf5d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About Cloud Core"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Our Mission & Vision
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-primary/5 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p>
              To provide high-quality, stylish clothing that enhances the
              everyday lives of our customers. We believe in creating products
              that are not only fashionable but also functional, comfortable,
              and built to last.
            </p>
          </div>
          <div className="bg-primary/5 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
            <p>
              To become the leading clothing brand known for quality,
              innovation, and customer satisfaction. We aim to set new standards
              in the fashion industry through sustainable practices and
              exceptional product design.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">
          Why Choose Cloud Core?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border p-6 rounded-lg text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
            <p className="text-muted-foreground">
              We use only the finest materials to ensure lasting quality.
            </p>
          </div>
          <div className="border p-6 rounded-lg text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Trusted Brand</h3>
            <p className="text-muted-foreground">
              Thousands of satisfied customers trust our products.
            </p>
          </div>
          <div className="border p-6 rounded-lg text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                <path d="M12 12v9"></path>
                <path d="m8 17 4 4 4-4"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
            <p className="text-muted-foreground">
              We ensure quick and reliable delivery across the country.
            </p>
          </div>
          <div className="border p-6 rounded-lg text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                <path d="M13 5v2"></path>
                <path d="M13 17v2"></path>
                <path d="M13 11v2"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
            <p className="text-muted-foreground">
              Our dedicated team is always ready to assist you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
