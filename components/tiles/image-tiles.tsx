"use client";
import { CSSProperties, useState } from "react";
import { useHover } from "react-aria";
import forest from "../../public/img/1.jpg";
import aaron from "../../public/img/2.jpg";
import Image from "next/image";

export function RevealTile(props: {
  children: JSX.Element;
  Reavealed: (props: {
    style: CSSProperties;
    onLoadingComplete: () => void;
  }) => JSX.Element;
  blurDataURL?: string;
}) {
  const [click, setClick] = useState(false);
  const [imageLoaded, setLoaded] = useState(false);
  const { hoverProps, isHovered } = useHover({});
  const inner = (
    <div
      className="absolute inset-0 w-full h-full grid place-items-center text-5xl font-bold tracking-tighter text-center"
      style={{
        transition: "opacity 0.2s ease-out",
        opacity: isHovered ? 0 : 1,
      }}
    >
      {props.children}
    </div>
  );
  return (
    <button
      onClick={() => setClick(!click)}
      className="relative w-full h-full overflow-clip"
      {...hoverProps}
    >
      <div
        className="relative w-full h-full"
        style={{
          overflow: "clip",
          opacity: isHovered && !click ? 0.8 : 0,
          transition: "opacity 0.5s ease-out",
        }}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${props.blurDataURL})`,
            backgroundSize: "cover",
            filter: "blur(10px)",
            overflow: "clip",
          }}
        >
          {" "}
        </div>
      </div>
      <div className="absolute inset-0 w-full h-full">
        {isHovered || click ? (
          <props.Reavealed
            style={{
              objectFit: "cover",
              opacity: imageLoaded || click ? 1 : 0,
            }}
            onLoadingComplete={() => setLoaded(true)}
          />
        ) : null}
      </div>
      {click ? null : inner}
    </button>
  );
}

const AaronImage = (props: {
  style: CSSProperties;
  onLoadingComplete: () => void;
}) => (
  <Image
    src={aaron.src}
    alt="Aaron Morris"
    layout="fill"
    placeholder="blur"
    sizes="300px 600px"
    blurDataURL={aaron.blurDataURL}
    quality={50}
    style={{
      ...props.style,
      objectPosition: "50% 15%",
    }}
    onLoadingComplete={props.onLoadingComplete}
  />
);

export function Aaron() {
  return (
    <RevealTile blurDataURL={aaron.blurDataURL} Reavealed={AaronImage}>
      <p>Aaron Morris</p>
    </RevealTile>
  );
}

const ForestImage = (props: {
  style: CSSProperties;
  onLoadingComplete: () => void;
}) => (
  <Image
    src={forest.src}
    alt="My son"
    layout="fill"
    placeholder="blur"
    sizes="300px 600px"
    blurDataURL={forest.blurDataURL}
    quality={50}
    style={{
      ...props.style,
      objectPosition: "50% 55%",
    }}
    onLoadingComplete={props.onLoadingComplete}
  />
);
export function HusbandFather() {
  return (
    <RevealTile blurDataURL={forest.blurDataURL} Reavealed={ForestImage}>
      <p>Husband &amp; Father</p>
    </RevealTile>
  );
}
