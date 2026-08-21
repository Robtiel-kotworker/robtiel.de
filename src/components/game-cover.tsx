const COVERS = {
  "cube-timer": "/brand/cover-cube.jpg",
  brettanien: "/brand/cover-brettanien.jpg",
  hardtekkmon: "/brand/cover-hardtekkmon.jpg",
} as const;

export function GameCover({
  slug,
  title,
}: {
  slug: keyof typeof COVERS;
  title: string;
}) {
  const src = COVERS[slug];

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-md bg-[#0a0a0c]"
      style={{
        backgroundImage: `url("${src}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src={src}
        alt={title}
        width={900}
        height={900}
        decoding="async"
        className="h-full w-full object-cover"
        onError={(event) => {
          event.currentTarget.style.opacity = "0";
        }}
      />
    </div>
  );
}
