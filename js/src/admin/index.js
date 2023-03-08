import {extend, override} from 'flarum/extend';
import SettingsPage from './components/SettingsPage';

app.initializers.add('ziven-fireworks', () => {
  app.extensionData
    .for('ziiven-fireworks').registerPage(SettingsPage);
});
