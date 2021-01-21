export default function getVideoId(
	url: string
): {
	id: string | null;
	service: "youtube" | "vimeo" | "vine" | "videopress" | null;
};
