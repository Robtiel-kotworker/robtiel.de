import { create } from "zustand";
import type { Track } from "./catalog";

type PlayerState = {
  current: Track | null;
  play: (track: Track) => void;
  stop: () => void;
};

export const usePlayer = create<PlayerState>((set) => ({
  current: null,
  play: (track) => set({ current: track }),
  stop: () => set({ current: null }),
}));

export function soundcloudEmbed(url: string, autoPlay: boolean) {
  const params = new URLSearchParams({
    url,
    color: "e85d04",
    auto_play: autoPlay ? "true" : "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "true",
    show_reposts: "false",
    show_teaser: "false",
    visual: "false",
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}
