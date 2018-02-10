import React from 'react'
import {render} from 'react-dom'
import App from './App.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

render(
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <App/>
    </MuiThemeProvider>,
    document.getElementById('app')
)
