App.info({
    id: 'com.emojination.app',
    version: '0.0.1',
    name: 'Emojination',
    author: 'x',
    description: 'Emojination app',
    email: 'x',
    website: ''
});

App.configurePlugin('cordova-plugin-facebook4', {
    APP_ID: '124977904960859',
    APP_NAME: 'Emojination'
});

App.accessRule("*");