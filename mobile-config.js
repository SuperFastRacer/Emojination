App.info({
    id: 'emojination_app_01',
    version: '0.0.1',
    name: 'com.emojination.Emojisocial',
    author: 'Måns Mattias Jenny Leo Jesper',
    description: 'Emojination app',
    email: 'x',
    website: 'https://emojination-social.herokuapp.com'
});

/*
App.configurePlugin('cordova-plugin-facebook4', {
    APP_ID: '124977904960859',
    APP_NAME: 'Emojination'
});
*/

App.accessRule("*");
App.setPreference('Orientation', 'portrait');

App.appendToConfig(`
  <universal-links>
    <host name="https://emojination-social.herokuapp.com/" />
  </universal-links>
`);
