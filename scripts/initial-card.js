//МАССИВ 6 МЕСТ ЗАГРУЖЕННЫХ ПО УМОЛЧАНИЮ
const initialCard = [
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

//ОБХОД МАССИВА В ЦИКЛЕ ДЛЯ ДОБАВЛЕНИЯ НОВЫХ КАРТ
	initialCard.forEach(function (card) {
	const imgCard = card.link;
	const titleCard = card.name;
	createCard(imgCard, titleCard);
});