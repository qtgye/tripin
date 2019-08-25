import Component from './component.js';

class DashboardChart extends Component {
	constructor(element) {
		super(element);

		this.chartContainer = this.element.querySelector('.dashboard-chart__chart');
	}

	async init() {
		const data = await this.getData();

		this.initializeChart(data);
	}

	/**
	 * This should be updated to fetch the actual data from the API
	 */
	async getData() {
		return [
			{
				city: 'New York',
				trips: 1500,
				events: 1500,
				communities: 1500,
			},
			{
				city: 'Manila',
				trips: 1000,
				events: 1500,
				communities: 1500,
			},
			{
				city: 'Seoul',
				trips: 1200,
				events: 1500,
				communities: 1500,
			},
			{
				city: 'Tokyo',
				trips: 800,
				events: 1500,
				communities: 1500,
			},
			{
				city: 'Bangkok',
				trips: 1200,
				events: 1500,
				communities: 1500,
			},
		]
	}

	initializeChart(data) {
		const seriesData = data.map(city => {
			city.name = city.city;
			// city.x = city.city;
			city.y = city.trips
			return city;
		});

		this.chart = Highcharts.chart(this.chartContainer, {
			chart: {
					type: 'column',
					styledMode: true,
			},
			title: {
					text: null
			},
			legend: {
				enabled: false,
			},

			defs: {
				gradient0: {
					tagName: 'linearGradient',
					id: 'gradient-0',
					x1: 0,
					y1: 0,
					x2: 0,
					y2: 1,
					children: [{
							tagName: 'stop',
							offset: 0,
					}, {
							tagName: 'stop',
							offset: 1,
					}]
				}
			},
			plotOptions: {
				series: {
					borderRadius: 5,
				},
			},
			tooltip: {
				useHTML: true,
				positioner(labelWidth, labelHeight, point) {
					return {
						x: point.plotX + 20,
						y: point.plotY - 30,
					}
				},
				formatter() {
					const {point: {city, trips, events, communities}} = this;
					return `
						<div class="dashboard-chart__tooltip">
							<span class="dashboard-chart__tooltip-city">${city}</span>
							<div class="dashboard-chart__tooltip-details">
								<div class="dashboard-chart__tooltip-trips"><strong>${trips}</strong> - <span>Trips</span></div>
								<div class="dashboard-chart__tooltip-events"><strong>${events}</strong> - <span>Events</span></div>
								<div class="dashboard-chart__tooltip-communities"><strong>${communities}</strong> - <span>Communities</span></div>
							</div>
						</div>
					`
				}
			},
			xAxis: {
				labels: {
					useHTML: true,
					align: 'right',
					formatter({ value }) {
						return `City ${value + 1}`;
					}
				}
			},
			yAxis: {
				title: null,
			},
			series: [{
				data: seriesData,
			}],
		});
	}
}

DashboardChart.selector = '.dashboard-chart';

export default DashboardChart;