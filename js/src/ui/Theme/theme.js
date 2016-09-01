import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const lightTheme = getMuiTheme(lightBaseTheme);
const muiTheme = getMuiTheme(darkBaseTheme);

muiTheme.stepper.textColor = '#eee';
muiTheme.stepper.disabledTextColor = '#777';
muiTheme.inkBar.backgroundColor = 'rgba(255, 136, 0, 0.8)'; // 'rgba(255, 136, 0, 0.8)'; // 'rgb(0, 151, 167)';
muiTheme.snackbar.backgroundColor = 'rgba(255, 30, 30, 0.9)';
muiTheme.snackbar.textColor = 'rgba(255, 255, 255, 0.9)';
muiTheme.tabs = lightTheme.tabs;
muiTheme.tabs.backgroundColor = 'rgb(65, 65, 65)';
muiTheme.tabs.selectedTextColor = 'rgba(255, 136, 0, 0.8)'; // 'rgb(0, 151, 167)'; // 'rgba(255, 136, 0, 0.8)';
muiTheme.tabs.textColor = 'rgba(255, 255, 255, 1)'; // 'rgba(0, 151, 167, 1)';
muiTheme.textField.disabledTextColor = muiTheme.textField.textColor;
muiTheme.toolbar = lightTheme.toolbar;
muiTheme.toolbar.backgroundColor = 'rgba(255, 136, 0, 0.5)'; // 'rgb(80, 80, 80)';

console.log('inkBar', muiTheme.inkBar);
console.log('tabs', muiTheme.tabs);

export default muiTheme;