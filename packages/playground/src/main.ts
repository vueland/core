import { createApp } from 'vue'
import App from './App.vue'
import { coreUi } from './plugin'
import './styles/index.scss'
import './.generated/utils-jit.css'

const app = createApp(App)

app.use(coreUi)
app.mount('body')
