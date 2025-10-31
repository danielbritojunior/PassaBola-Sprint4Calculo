document.addEventListener('DOMContentLoaded', () => {
    // Global chart configuration
    const chartConfig = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: { 
                    display: true, 
                    color: '#9ca3af' 
                },
                ticks: { 
                    color: '#9ca3af' 
                },
                grid: { 
                    color: 'rgba(156, 163, 175, 0.2)' 
                }
            },
            y: {
                beginAtZero: true,
                title: { 
                    display: true, 
                    color: '#9ca3af' 
                },
                ticks: { 
                    color: '#9ca3af' 
                },
                grid: { 
                    color: 'rgba(156, 163, 175, 0.2)' 
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#d1d5db'
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    };

    // Helper functions
    const addEventListeners = (elements, event, handler) => {
        elements.forEach(el => el.addEventListener(event, handler));
    };

    function generateTable(containerEl, headers, data) {
        if (!data || data.length === 0) {
            containerEl.innerHTML = '';
            return;
        }
        
        let tableHTML = '<table><thead><tr>';
        headers.forEach(h => tableHTML += `<th>${h}</th>`);
        tableHTML += '</tr></thead><tbody>';
        
        data.forEach(row => {
            tableHTML += '<tr>';
            row.forEach(cell => tableHTML += `<td>${cell}</td>`);
            tableHTML += '</tr>';
        });
        
        tableHTML += '</tbody></table>';
        containerEl.innerHTML = tableHTML;
    }

    // 1. Functions: Follower Growth
    const followerCtx = document.getElementById('followerChart').getContext('2d');
    const followerInputs = [
        document.getElementById('initialFollowers'),
        document.getElementById('growthBase')
    ];
    const followerTableContainer = document.getElementById('followerTableContainer');

    const followerChart = new Chart(followerCtx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Seguidores',
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            ...chartConfig,
            scales: {
                ...chartConfig.scales,
                y: {
                    ...chartConfig.scales.y,
                    title: {
                        display: true,
                        text: 'Total de Seguidores',
                        color: '#9ca3af'
                    }
                },
                x: {
                    ...chartConfig.scales.x,
                    title: {
                        display: true,
                        text: 'Tempo (semanas)',
                        color: '#9ca3af'
                    }
                }
            }
        }
    });

    function updateFollowerChart() {
        const [s0, b] = followerInputs.map(el => parseFloat(el.value));
        const labels = Array.from({ length: 8 }, (_, i) => i);
        const data = labels.map(t => s0 * Math.pow(b, t));

        followerChart.data.labels = labels;
        followerChart.data.datasets[0].data = data;
        followerChart.update();

        const tableData = [0, 1, 2, 3, 4].map(t => [
            t,
            (s0 * Math.pow(b, t)).toLocaleString('pt-BR', { maximumFractionDigits: 0 })
        ]);
        generateTable(followerTableContainer, ['Semana (t)', 'Total de Seguidores'], tableData);
    }

    addEventListeners(followerInputs, 'input', updateFollowerChart);

    // 2. Limits: Engagement Saturation
    const engagementCtx = document.getElementById('engagementChart').getContext('2d');
    const engagementInputs = [
        document.getElementById('limitL'),
        document.getElementById('steepnessK')
    ];
    const engagementTableContainer = document.getElementById('engagementTableContainer');

    const engagementChart = new Chart(engagementCtx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Interações',
                borderColor: '#FFC185',
                backgroundColor: 'rgba(255, 193, 133, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            ...chartConfig,
            scales: {
                ...chartConfig.scales,
                y: {
                    ...chartConfig.scales.y,
                    title: {
                        display: true,
                        text: 'Total de Interações',
                        color: '#9ca3af'
                    }
                },
                x: {
                    ...chartConfig.scales.x,
                    title: {
                        display: true,
                        text: 'Tempo (horas)',
                        color: '#9ca3af'
                    }
                }
            }
        }
    });

    function updateEngagementChart() {
        const [L, k] = engagementInputs.map(el => parseFloat(el.value));
        const labels = Array.from({ length: 31 }, (_, i) => i);
        const data = labels.map(t => L * (1 - Math.exp(-k * t)));

        engagementChart.data.labels = labels;
        engagementChart.data.datasets[0].data = data;
        engagementChart.update();

        const tableData = [0, 4, 8, 12, 24].map(t => [
            t,
            (L * (1 - Math.exp(-k * t))).toLocaleString('pt-BR', { maximumFractionDigits: 0 })
        ]);
        generateTable(engagementTableContainer, ['Hora (t)', 'Total de Interações'], tableData);
    }

    addEventListeners(engagementInputs, 'input', updateEngagementChart);

    // 3. Derivatives: Rate of Change and Critical Points
    const derivativeCtx = document.getElementById('derivativeChart').getContext('2d');
    const derivativeInputs = [
        document.getElementById('coefficientA'),
        document.getElementById('coefficientB'),
        document.getElementById('coefficientC')
    ];
    const criticalPointResult = document.getElementById('criticalPointResult');

    const derivativeChart = new Chart(derivativeCtx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'f(t) = at² + bt + c',
                borderColor: '#B4413C',
                backgroundColor: 'rgba(180, 65, 60, 0.2)',
                fill: true,
                tension: 0.4
            }, {
                label: 'Ponto Crítico',
                borderColor: '#DB4545',
                backgroundColor: '#DB4545',
                pointRadius: 8,
                pointHoverRadius: 10,
                showLine: false,
                data: []
            }]
        },
        options: {
            ...chartConfig,
            scales: {
                ...chartConfig.scales,
                y: {
                    ...chartConfig.scales.y,
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'f(t)',
                        color: '#9ca3af'
                    }
                },
                x: {
                    ...chartConfig.scales.x,
                    title: {
                        display: true,
                        text: 'Tempo (segundos)',
                        color: '#9ca3af'
                    }
                }
            }
        }
    });

    function updateDerivativeChart() {
        const [a, b, c] = derivativeInputs.map(el => parseFloat(el.value));
        
        // Calculate critical point: t = -b/(2a)
        const criticalT = a !== 0 ? -b / (2 * a) : 0;
        const criticalValue = a * criticalT * criticalT + b * criticalT + c;
        
        // Determine if it's maximum or minimum
        const isMaximum = a < 0;
        const extremumType = isMaximum ? 'Máximo' : 'Mínimo';
        
        criticalPointResult.innerHTML = `${extremumType} em t=${criticalT.toFixed(2)}s, f(${criticalT.toFixed(2)}) = ${criticalValue.toFixed(2)}`;

        // Generate chart data
        const centerT = criticalT;
        const rangeT = Math.max(8, Math.abs(criticalT) + 4);
        const startT = centerT - rangeT / 2;
        const endT = centerT + rangeT / 2;
        
        const labels = [];
        const data = [];
        const steps = 50;
        
        for (let i = 0; i <= steps; i++) {
            const t = startT + (endT - startT) * i / steps;
            labels.push(parseFloat(t.toFixed(1)));
            data.push(a * t * t + b * t + c);
        }

        derivativeChart.data.labels = labels;
        derivativeChart.data.datasets[0].data = data;
        
        // Add critical point
        derivativeChart.data.datasets[1].data = [{
            x: criticalT,
            y: criticalValue
        }];
        
        derivativeChart.update();
    }

    addEventListeners(derivativeInputs, 'input', updateDerivativeChart);

    // 4. Integrals: Total Distance
    const distanceCtx = document.getElementById('distanceChart').getContext('2d');
    const integralInputs = [
        document.getElementById('integralInitialVelocity'),
        document.getElementById('integralAcceleration'),
        document.getElementById('integralStart'),
        document.getElementById('integralEnd')
    ];
    const distanceValue = document.getElementById('distanceValue');
    const distanceTableContainer = document.getElementById('distanceTableContainer');

    const distanceChart = new Chart(distanceCtx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Velocidade',
                borderColor: '#ECEBD5',
                tension: 0.1,
                fill: false,
                borderWidth: 3
            }, {
                label: 'Área da Integral',
                backgroundColor: 'rgba(236, 235, 213, 0.3)',
                fill: 'origin',
                borderWidth: 0,
                pointRadius: 0
            }]
        },
        options: {
            ...chartConfig,
            scales: {
                ...chartConfig.scales,
                y: {
                    ...chartConfig.scales.y,
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Velocidade (m/s)',
                        color: '#9ca3af'
                    }
                },
                x: {
                    ...chartConfig.scales.x,
                    title: {
                        display: true,
                        text: 'Tempo (segundos)',
                        color: '#9ca3af'
                    }
                }
            }
        }
    });

    function updateIntegralChart() {
        const [v0, a, t1, t2] = integralInputs.map(el => parseFloat(el.value));
        
        if (isNaN(v0) || isNaN(a) || isNaN(t1) || isNaN(t2)) return;

        const velocityFunc = t => v0 + a * t;
        const integral = t => v0 * t + 0.5 * a * t * t;
        const distance = integral(t2) - integral(t1);
        
        distanceValue.textContent = `${distance.toFixed(2)} m`;

        const chartMaxTime = Math.max(t2, 10);
        const labels = Array.from({ length: Math.ceil(chartMaxTime) + 1 }, (_, i) => i);
        const velocityData = labels.map(velocityFunc);
        const areaData = labels.map(t => (t >= t1 && t <= t2) ? velocityFunc(t) : null);

        distanceChart.data.labels = labels;
        distanceChart.data.datasets[0].data = velocityData;
        distanceChart.data.datasets[1].data = areaData;
        distanceChart.update();

        const tableData = [0, 1, 2, 3, 4].map(t => [
            t,
            velocityFunc(t).toFixed(1)
        ]);
        generateTable(distanceTableContainer, ['Segundo (t)', 'Velocidade (m/s)'], tableData);
    }

    addEventListeners(integralInputs, 'input', updateIntegralChart);

    // Initial updates
    updateFollowerChart();
    updateEngagementChart();
    updateDerivativeChart();
    updateIntegralChart();
});