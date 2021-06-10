import {Switch, Route} from 'react-router-dom'
import Auth from './components/Auth'
import Build from './components/Build'
import Create from './components/Create'
import Dash from './components/Dash'

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/create' component={Create} />
        <Route path='/home' component={Dash} />
        <Route path='/build/:id' component={Build} />
    </Switch>
)