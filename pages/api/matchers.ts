const matchers = [
	{
		id: 1,
		name: '轟天旅人',
		avatar: '/images/144003672_227000429131184_7589601220940381298_n.jpg',
		lastMsg: '安安妳好…',
		locked: true
	},
	{
		id: 2,
		name: '轟天旅人',
		avatar: '/images/144003672_227000429131184_7589601220940381298_n.jpg',
		lastMsg: '安安妳好…',
		locked: true
	},
	{
		id: 3,
		name: '轟天旅人',
		avatar: '/images/144003672_227000429131184_7589601220940381298_n.jpg',
		lastMsg: '安安妳好…',
		locked: true
	},
];

export default function handler(req, res) {
	res.status(200).json(matchers)
}