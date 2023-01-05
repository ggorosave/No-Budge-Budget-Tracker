let myChart = document.getElementById('myChart').getContext('2d');

// Added our chosen google font
Chart.defaults.font.family = 'IBM Plex Sans';
Chart.defaults.font.size = 18;

let budgetChart = new Chart(myChart, {
    type: 'doughnut',
    data: {
        labels: ['Income', 'Groceries', 'Supplies', 'Rent', 'Misc.'],
        datasets: [{
            label: 'Amount',
            data: [
                100,
                200,
                300,
                400,
                150,
            ],
            backgroundColor: [
                '#022B3A',
                '#92B9BD',
                '#B08EA2',
                '#ECA72C',
                '#EE5622'
            ],
            // Can add more customizations here
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Your Monthly Budget',
            fontSize: 25
        }
    },
});