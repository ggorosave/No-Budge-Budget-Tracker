let myChart = document.getElementById('myChart').getContext('2d');

// Data fetches 
const getChart = async () => {

    // fetches data
    const response = await fetch('/api/transactions');

    if (response.ok) {

        // Creates arrays of data from fetch
        const chartData = await response.json();
        const filteredData = await chartData.filter((obj) => obj.category_name !== 'INCOME');
        const incomeData = await chartData.filter((obj) => obj.category_name == 'INCOME');
        const categories = await filteredData.map((category) => category.category_name);
        // Math >_<
        const income = await incomeData[0].total;
        const savings = await income - filteredData.map((category) => Number(category.total)).reduce((total, num) => total + num, 0);
        const savingsRatio = await savings / income;
        const ratios = await filteredData.map((category) => category.total / income * 100);

        // Chart Logic
        Chart.defaults.font.family = 'IBM Plex Sans';
        Chart.defaults.font.size = 18;

        let budgetChart = new Chart(myChart, {
            type: 'doughnut',
            data: {
                labels: [...categories, 'Savings'],
                datasets: [{
                    label: 'Amount',
                    data: [
                        ...ratios,
                        savingsRatio
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

        return budgetChart;

    } else {
        console.log('No data recieved')
    }

};

getChart();

// End data fetches

// Added our chosen google font
// Chart.defaults.font.family = 'IBM Plex Sans';
// Chart.defaults.font.size = 18;

// let budgetChart = new Chart(myChart, {
//     type: 'doughnut',
//     data: {
//         labels: ['Income', 'Groceries', 'Supplies', 'Rent', 'Misc.'],
//         datasets: [{
//             label: 'Amount',
//             data: [
//                 100,
//                 200,
//                 300,
//                 400,
//                 150,
//             ],
//             backgroundColor: [
//                 '#022B3A',
//                 '#92B9BD',
//                 '#B08EA2',
//                 '#ECA72C',
//                 '#EE5622'
//             ],
//             // Can add more customizations here
//         }]
//     },
//     options: {
//         title: {
//             display: true,
//             text: 'Your Monthly Budget',
//             fontSize: 25
//         }
//     },
// });