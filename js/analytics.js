document.addEventListener('DOMContentLoaded', function() {
    const ALLOWED_TYPES = new Set(['Hospital','Health Center','School','Police Station','University','Clinic']);

    if (typeof facilitiesData === 'undefined' || !Array.isArray(facilitiesData)) {
        console.warn('facilitiesData not found or empty in root js/data.js. Ensure dataset is present.');
        return;
    }

    const filteredData = facilitiesData.filter(f => ALLOWED_TYPES.has(f.type));

    // Update summary cards (filtered)
    document.querySelectorAll('.summary-card').forEach(card => {
        const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const num = card.querySelector('.card-number');
        if (!num) return;
        if (title.includes('total facilities')) num.textContent = filteredData.length.toLocaleString();
        if (title.includes('districts')) num.textContent = new Set(filteredData.map(f => f.district)).size.toLocaleString();
        if (title.includes('categories')) num.textContent = new Set(filteredData.map(f => f.type)).size.toLocaleString();
        if (title.includes('avg. rating')) {
            const ratings = filteredData.map(f => f.rating).filter(r => typeof r === 'number');
            const avg = ratings.length ? (ratings.reduce((a,b)=>a+b,0)/ratings.length) : 0;
            num.textContent = avg.toFixed(1);
        }
    });

    // Build charts & table from filtered data
    buildTypeChart(filteredData);
    buildDistrictChart(filteredData);
    buildComparisonChart(filteredData);
    populateFacilitiesTable(filteredData);
});

function buildTypeChart(data) {
    const ctx = document.getElementById('typeChart').getContext('2d');
    const order = ['Hospital','Health Center','Clinic','School','Police Station','University'];
    const colors = {
        'Hospital': '#e74c3c',
        'Health Center': '#3498db',
        'Clinic': '#2ecc71',
        'School': '#f39c12',
        'Police Station': '#34495e',
        'University': '#9b59b6'
    };
    const byType = data.reduce((acc, f) => { acc[f.type] = (acc[f.type] || 0) + 1; return acc; }, {});
    const labels = order.filter(t => byType[t]);
    const values = labels.map(l => byType[l]);
    new Chart(ctx, {
        type: 'doughnut',
        data: { labels, datasets: [{ label: 'Facilities by Type', data: values, backgroundColor: labels.map(l => colors[l] || '#667eea') }] },
        options: { responsive: true }
    });
}

function buildDistrictChart(data) {
    const ctx = document.getElementById('districtChart').getContext('2d');
    const byDistrict = data.reduce((acc, f) => { acc[f.district] = (acc[f.district] || 0) + 1; return acc; }, {});
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(byDistrict),
            datasets: [{
                label: 'Facilities per District',
                data: Object.values(byDistrict),
                backgroundColor: '#3498db'
            }]
        },
        options: { responsive: true }
    });
}

function buildComparisonChart(data) {
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    const types = Array.from(new Set(data.map(d => d.type)));
    const districts = Array.from(new Set(data.map(d => d.district)));
    const datasets = types.map((t, idx) => ({
        label: t,
        data: districts.map(d => data.filter(x => x.type === t && x.district === d).length),
        backgroundColor: `hsl(${idx*70 % 360} 70% 50% / 0.7)`
    }));

    new Chart(ctx, {
        type: 'bar',
        data: { labels: districts, datasets },
        options: { responsive: true, interaction: { mode: 'index' }, stacked: false }
    });
}

function populateFacilitiesTable(data) {
    const tbody = document.querySelector('#facilitiesTable tbody');
    tbody.innerHTML = data.map(createTableRow).join('');
}
