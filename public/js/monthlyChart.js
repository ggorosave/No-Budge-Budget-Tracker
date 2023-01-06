const getChartData = async () => {

    const response = await fetch('/api/transactions');

    if (response.ok) {

        const chartData = await response.json();
        await console.log('Data:');
        await console.log(chartData);

        const categories = await chartData.map((category) => category.category_name);
        await console.log('Categories:');
        await console.log(categories);

        const totals = await chartData.map((category) => category.total);
        await console.log('Totals:');
        await console.log(totals);

    } else {
        console.log('No data recieved')
    }

};

getChartData();