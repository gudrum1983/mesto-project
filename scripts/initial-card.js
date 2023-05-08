const INITIAL_CARDS = [
	{
		name: 'Хабаровск',
		link: './images/хабаровск.jpg'
	},
	{
		name: 'Свободный',
		link: './images/свободный.jpg'
	},
	{
		name: 'Владивосток',
		link: './images/владивосток.png'
	},
	{
		name: 'Благовещенск',
		link: './images/благовещенск.jpg'
	},
	{
		name: 'Москва',
		link: './images/москва.png'
	},
	{
		name: 'Казань',
		link: './images/казань.jpg'
	}
];

//CYCLE ARRAY FOR ADD CARD
INITIAL_CARDS.forEach(function (item) {
	const imgCard = item.link;
	const title = item.name;
	createCard(imgCard, title);
});