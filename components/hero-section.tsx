import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Premium Quality{" "}
              <span className="text-blue-600 dark:text-blue-400">Clothing</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
              Discover our collection of high-quality clothing for all seasons.
              Comfortable, stylish, and affordable.
            </p>
            <div className="flex gap-3  sm:gap-4 justify-center md:justify-start">
              <Link href="/products">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
                  Shop Now
                </button>
              </Link>
              <Link href="/about">
                <button className="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 font-medium rounded-md transition-colors dark:text-blue-400 dark:border-blue-400">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Cloudcore fashion collection showcase"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
