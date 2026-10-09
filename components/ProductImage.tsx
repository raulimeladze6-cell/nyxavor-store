import Image from "next/image";

type Props = {
  image?: string;
  emoji: string;
  name: string;
  emojiSize?: string;
};

export default function ProductImage({
  image,
  emoji,
  name,
  emojiSize = "text-6xl",
}: Props) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-2"
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center ${emojiSize}`}
        >
          {emoji}
        </div>
      )}
    </div>
  );
}
