
function setSettings(settings) {
  if(localStorage.getItem('mathpractice')){
    localStorage.removeItem('mathpractice');
  }
  localStorage.setItem('mathpractice', JSON.stringify(settings));
  console.log('...saved');
}

function getSettings() {
  const settings = localStorage.getItem('mathpractice');
  console.log('...set');
  return settings ? JSON.parse(settings) : {};
}