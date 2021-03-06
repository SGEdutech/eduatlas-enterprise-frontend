let homePageData = {
    day1: 23,
    day2: 63,
    day3: 31,
    day4: 2,
    day5: 53,
    day6: 23,
    day7: 50,
    day8: 25,
}

function createChartFor(tabNumber, dataObj) {
    var ctx = document.getElementById(`myChart${tabNumber}`).getContext('2d');
    createChart(ctx, dataObj);
}

function createChart(ctx, dataObj) {
    return new Chart(ctx, {
        type: 'line',
        responsive: true,
        data: {
            labels: Object.keys(dataObj),
            datasets: [{
                label: '# of views',
                data: Object.values(dataObj),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1

            }]
        },

        options: {

            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}