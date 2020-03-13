import './css/App.css'
import naaWidget from './../lib'
naaWidget.init({
  env: 'dev',
  authId: 'xxxxxxx',
  apiKey: 'xxxxxxx',
  type: 'depart',
})
console.log('ftWidget Loaded!', naaWidget)
const App = () => {
  return null
}

export default App
