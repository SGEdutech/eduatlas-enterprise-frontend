var ctx = document.getElementById("myChart").getContext('2d');
var ctx2 = document.getElementById("myChart2").getContext('2d');
createChart(ctx);
createChart(ctx2)

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






function createChart(ctx) {
    new Chart(ctx, {
        type: 'line',
        responsive: true,
        data: {
            labels: ["day 1", "day 2", "day 3", "day 4", "day 5", "day 6"],
            datasets: [{
                label: '# of views',
                data: [12, 53, 3, 5, 2, 3],
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