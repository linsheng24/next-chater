import { selector } from 'recoil';
import { MatcherId, Matchers } from './atoms';

export const SelectedMatcher = selector({
	key: 'selectedMatcher',
	get: ({get}) => {
		const matchers = get(Matchers);
		const matcherId = get(MatcherId);
		const selectedMatcher = matchers.filter(matcher => {
			return matcherId === matcher.id;
		});
		return selectedMatcher.length === 0 ? null : selectedMatcher[0];
	},
});

