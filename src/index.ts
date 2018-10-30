// tslint:disable:no-expression-statement
import { app } from './app'
import { render } from 'lit-html'

const root = document.getElementById('root')

render(app, root || document.body)
