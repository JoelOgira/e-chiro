"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ProductImages({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="product image"
        width={800}
        height={800}
        className="min-h-[300px] object-cover object-center"
      />
      <div className="flex gap-4">
        {images.map((image, index) => (
          <div
            className={cn(
              "cursor-pointer border hover:border-orange-200",
              current === index && "border-orange-600"
            )}
            key={image}
            onClick={() => setCurrent(index)}
          >
            <Image src={image} alt="Image" width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
}
