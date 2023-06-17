
const textError = 'Упс...что-то пошло не так! Попейте вкусного чая, а потом попробуйте снова!\nС любовью, Екатерина и команда Яндекс практикум!'
const showError = (err) => {
  alert(textError);
  console.log(`Запрос не выполнен. ${err}.`);
};


/**
 * ЭКСПОРТ
 * */
export {showError};



