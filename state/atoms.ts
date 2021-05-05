import { atom } from 'recoil';

export const InterestMap = atom({
	key: 'interestMap',
	default: []
});

export const MessageList = atom({
	key: 'messageList',
	default: [
		{
			timestamp: 111111111,
			type: 'text',
			action: 'receive',
			content: '妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好'
		},
		{
			timestamp: 111111112,
			type: 'text',
			action: 'send',
			content: '妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好'
		},
		{
			timestamp: 111111113,
			type: 'text',
			action: 'send',
			content: '妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好'
		},
		{
			timestamp: 111111114,
			type: 'text',
			action: 'receive',
			content: '妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好妳好'
		}
	]
});
