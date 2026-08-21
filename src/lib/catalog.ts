export const SOCIALS = {
  soundcloud: "https://soundcloud.com/robtiel",
  twitch: "https://www.twitch.tv/robtiel",
  youtube: "https://www.youtube.com/@robtielofficial7392",
  email: "mailto:robtiel@mail.de",
} as const;

export const APPS = [
  {
    slug: "cube-timer",
    title: "Cube Timer Online",
    kicker: "Hardtekk Training",
    description:
      "Online Cube Timer für Hardtekk Training. Präzise. Hart. Unkompliziert.",
    href: "https://cube-timer-online.robtiel-kotworker.workers.dev",
    image: "/g/v4/cube-timer.jpg",
    tone: "orange" as const,
  },
  {
    slug: "brettanien",
    title: "Way to Brettanien",
    kicker: "Überleben",
    description: "Finde deinen Weg. Überlebe die Strecke. Brettanien wartet.",
    href: "https://tamagotchi.robtiel-kotworker.workers.dev",
    image: "/g/v4/brettanien.jpg",
    tone: "lime" as const,
  },
  {
    slug: "hardtekkmon",
    title: "Hardtekkmon — Rote Chupa Chups",
    kicker: "Sammeln & Kämpfen",
    description: "Sammle. Kämpfe. Hardtekkmon. Rote Chupa Chups Edition.",
    href: "https://hardtekkmon---rote-chupa-chups.robtiel-kotworker.workers.dev",
    image: "/g/v4/hardtekkmon.jpg",
    tone: "red" as const,
  },
] as const;

export type AppTone = (typeof APPS)[number]["tone"];

export type Track = {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  genre: string;
  ago: string;
  duration?: string;
  likes?: string;
  plays?: string;
};

export const LATEST_TRACKS: Track[] = [
  {
    id: "partikular",
    title: "Ep0ChaLEs paRtIKuLar gEWeBe",
    subtitle: "Lost & Found",
    url: "https://soundcloud.com/robtiel/ep0chales-partikular-gewebe",
    genre: "Hardtekk",
    ago: "10 Monate",
    likes: "6",
    plays: "150",
  },
  {
    id: "wat-gehtn",
    title: "Wat GeHtn Da Jetz GenaU",
    subtitle: "K.I.Z Hardtekk · 180er",
    url: "https://soundcloud.com/robtiel/wat-gehtn-da-jetz-genau-180er-freedownload",
    genre: "Hardtekk",
    ago: "2 Jahre",
    likes: "42",
    plays: "1.061",
  },
  {
    id: "anarchy",
    title: "PuTe VS RobTiel",
    subtitle: "AnARchY · 168er",
    url: "https://soundcloud.com/robtiel/pute-vs-robtiel-anarchy-168er-hardtekk",
    genre: "Hardtekk",
    ago: "2 Jahre",
    likes: "38",
    plays: "1.250",
  },
  {
    id: "herz",
    title: "MeIN HeRZ GehT AB",
    subtitle: "190er · Free Download",
    url: "https://soundcloud.com/robtiel/mein-herz-geht-ab-hardtekk-190er-freedownload",
    genre: "Hardtekk",
    ago: "2 Jahre",
    likes: "33",
    plays: "971",
  },
  {
    id: "usa-shirt",
    title: "LaSS MEin UsA SHIrt In RUHe",
    subtitle: "175er · Free Download",
    url: "https://soundcloud.com/robtiel/lass-mein-usa-shirt-in-ruhe-175er-hardtekk-freedownload",
    genre: "Hardtekk",
    ago: "2 Jahre",
    likes: "37",
    plays: "976",
  },
];

export const TOP_TRACKS: Track[] = [
  {
    id: "tiog-5",
    title: "Techno Ist Mit Ohne Gesang 5.0",
    subtitle: "Free Download",
    url: "https://soundcloud.com/robtiel/techno-ist-mit-ohne-gesang-50-free-download",
    genre: "Hardtekk",
    ago: "5 Jahre",
    likes: "5.390",
    plays: "—",
    duration: "2:11:13",
  },
  {
    id: "tiog-2",
    title: "Techno Ist Mit Ohne Gesang 2.0",
    subtitle: "Free Download",
    url: "https://soundcloud.com/robtiel/techno-ist-mit-ohne-gesang-20-free-download",
    genre: "Hardtekk",
    ago: "5 Jahre",
    likes: "4.516",
  },
  {
    id: "tiog-3",
    title: "Techno Ist Mit Ohne Gesang 3.0",
    subtitle: "Free Download",
    url: "https://soundcloud.com/robtiel/robtiel-techno-ist-mit-ohne-gesang-30-free-download",
    genre: "Hardtekk",
    ago: "5 Jahre",
    likes: "2.779",
  },
  {
    id: "tiog-1",
    title: "Techno ist mit ohne Gesang",
    subtitle: "Free Download",
    url: "https://soundcloud.com/robtiel/techno-ist-mit-ohne-gesang-free-download",
    genre: "Hardtekk",
    ago: "5 Jahre",
    likes: "112K",
  },
  {
    id: "affe-pferd",
    title: "EiN AFFe & EIN PFerD",
    subtitle: "K.I.Z Hardtekk Edit · 160er",
    url: "https://soundcloud.com/robtiel/ein-affe-ein-pferd-hardtekk-edit-160er-freedownload",
    genre: "Hardtekk",
    ago: "2 Jahre",
    likes: "52",
    plays: "1.567",
  },
];

export const IMPRESSUM = {
  name: "Robert Thiele",
  street: "Saarlandstraße 369a",
  zipCity: "55411 Bingen am Rhein",
  country: "Deutschland",
  email: "robtiel@mail.de",
} as const;
