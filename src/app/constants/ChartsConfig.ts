export const LINE_CHART_OPTIONS = {
    stacked: false,
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2.5,
    plugins: {
        legend: {
            labels: {
                usePointStyle: true,
                color: "#111111"
            },
            position: 'bottom',
        }
    },
    scales: {
        x: {
            ticks: {
                color: "#111111",
            },
            grid: {
                color: "#22c55e",
                display: false,
            }
        },
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
                color: "#dfe7ef"
            },
            grid: {
                color: "#22c55e",
                display: false,
            }
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            ticks: {
                color: "#22c55e"
            },
            grid: {
                drawOnChartArea: false,
                color: "#dfe7ef",
                display: false,
            }
        }
    }
    
};

export const PIE_OPTIONS = {
    responsive: true,
    resizeDelay: 100,
    maintainAspectRatio: false,
    aspectRatio: .7,
    plugins: {
        legend: {
            labels: {
                usePointStyle: true,
                enabled: true,
                content: 'Labels',
                position: 'bottom'
            },
            position: 'bottom',
        }
    },
    title: {
        display: true,
        text: 'Chart.js Pie Chart'
    }
};
