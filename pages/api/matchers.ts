const matchers = [
	{
		id: 1,
		name: '轟天旅人',
		avatar: '/static/images/avatar/1.jpg',
		lastMsg: '安安妳好…',
		active: false,
		locked: true
	},
	{
		id: 2,
		name: '轟天旅人',
		avatar: '/static/images/avatar/1.jpg',
		lastMsg: '安安妳好…',
		active: false,
		locked: true
	},
	{
		id: 3,
		name: '轟天旅人',
		avatar: '/static/images/avatar/1.jpg',
		lastMsg: '安安妳好…',
		active: false,
		locked: true
	},
];

export default function handler(req, res) {
	res.status(200).json(matchers)
}