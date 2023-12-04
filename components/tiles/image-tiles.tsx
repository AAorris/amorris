"use client";
import { useState } from "react";
import forest from "../../public/img/1.jpg";
import aaron from "../../public/img/2.jpg";
import Image from "next/image";

export function Aaron() {
  const [hover, setHover] = useState(false);
  const inner = (
    <p
      className="border w-full h-full grid place-items-center text-5xl tracking-tighter text-center"
      onMouseEnter={() => setHover(true)}
    >
      Aaron Morris
    </p>
  );
  if (!hover) return inner;
  return (
    <div
      onMouseLeave={() => setHover(false)}
      className="relative w-full h-full text-gray-500"
    >
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={aaron.src}
          alt="Aaron Morris"
          layout="fill"
          placeholder="blur"
          sizes="300px 600px"
          blurDataURL={aaron.blurDataURL}
          quality={50}
          style={{
            objectFit: "cover",
            objectPosition: "50% 15%",
          }}
        />
      </div>
      {inner}
    </div>
  );
}

export function HusbandFather() {
  const [hover, setHover] = useState(false);
  const inner = (
    <p
      className="border w-full h-full grid place-items-center text-4xl tracking-tighter text-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Husband, Father
    </p>
  );
  if (!hover) return inner;
  return (
    <div
      onMouseLeave={() => setHover(false)}
      className="relative w-full h-full text-gray-500"
    >
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={forest.src}
          alt="My little boy"
          layout="fill"
          placeholder="blur"
          sizes="300px 600px"
          blurDataURL={forest.blurDataURL}
          quality={50}
          style={{
            objectFit: "cover",
            objectPosition: "50% 55%",
          }}
        />
      </div>
      {inner}
    </div>
  );
}
