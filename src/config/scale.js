export const options = (currencyChar = '$') => {
    return {
        responsive: true,
        maintainAspectRatio: true,

        scales: {
            lineWidth: 20,

            yAxes: [
                {
                    drawTicks: false,
                    drawBorder: false,
                    ticks: {
                        fontFamily: 'Montserrat',
                        fontWeight: '500',
                        beginAtZero: true,
                        lineHeight: 1,
                        callback: function(value, index, values) {
                            return `${currencyChar} ${value}`;
                        },
                    },
                },
            ],
            xAxes: [
                {
                    drawTicks: false,
                    drawBorder: false,
                    ticks: {
                        fontFamily: 'Montserrat',
                        fontWeight: '500',
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
};
