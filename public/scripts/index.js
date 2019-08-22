import CustomSelect from './custom-select.js';
import DashboardChart from './dashboard-chart.js';

// Determine touch support
if ( 'ontouchstart' in document ) {
	document.body.classList.add('touch');
}

CustomSelect.init();
DashboardChart.init();