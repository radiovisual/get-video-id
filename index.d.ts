export default function getVideoId(
	url: string
):
	| {}
	| {
			id: string;
			service: "youtube" | "vimeo" | "vine" | "videopress";
	  };
