export default function getVideoId(
	url: string
): {
	id: string | undefined;
	service: 'youtube' | 'vimeo' | 'vine' | 'videopress' | 'microsoftstream' | 'tiktok' | 'dailymotion' | 'loom' | undefined;
};
