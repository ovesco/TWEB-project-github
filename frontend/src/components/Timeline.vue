<template>
    <div>
        <div class="timeline p-4">

            <h1 class="mt-3 mb-0 ml-3 text-white text-thin">
                When does {{ username }} commits his work?
            </h1>
            <h3 class="mt-0 mb-4 ml-3 text-white text-normal">
                Find out at what time of the day does he commit his code based on
                his last {{ commits.length }} commits
            </h3>
            <canvas ref="chart" class="mainchart"></canvas>
            <div class="timeline-shadow"></div>
        </div>
    </div>
</template>

<script>

    import Chart from 'chart.js';

    export default {
        props: ['username'],
        data() {
            return {
                commits: [],
            };
        },
        watch: {
            username() {
                const $this = this;
                this.$api.getCommits(this.username).then((result) => {
                    result.forEach((commit) => {
                        /* eslint-disable */
                        commit.commit.committer.date = new Date(commit.commit.committer.date);
                        commit.commit.committer.hour = commit.commit.committer.date.getHours() + 1;
                        $this.commits.push(commit.commit);
                    });
                    $this.loadChart();
                });
            },
        },
        methods: {
            loadChart() {
                const ctx = this.$refs.chart;

                /* eslint-disable no-new */
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: this.getLabels(),

                        datasets: [{
                            label: 'swag',
                            data: this.formatChartPoints(),
                            borderColor: 'white',
                            fill: true,
                            backgroundColor: 'rgba(255,255,255,0.3)'
                        }]
                    },
                    options: {
                        responsive: true,
                        tooltips: {
                            callbacks: {
                                title(x) {
                                    return `Commits at ${x[0].xLabel}`;
                                },
                                label(x) {
                                    return `${x.yLabel} commits`
                                }
                            }
                        },
                        scales: {
                            xAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: "Time of the day (in hour)",
                                    fontColor: 'white',
                                    fontSize: 15
                                },
                                gridLines: {
                                    color: 'rgba(255,255,255,0.2)',
                                    drawBorder: false
                                },
                                ticks: {
                                    fontColor: 'white',
                                    fontSize: 15,
                                    fontStyle: 'bold',
                                    callback: (n) => {
                                        return n + (n < 12 ? 'am' : 'pm');
                                    }
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: "Amount of commits",
                                    fontColor: 'white',
                                    fontSize: 15
                                },
                                gridLines: {
                                    color: 'rgba(255,255,255,0.2)',
                                    border: false
                                },
                                ticks: {
                                    fontColor: 'white',
                                    stepSize: 1,
                                    min: 0,
                                    max: this.getMaxCommits() + 1,
                                    fontSize: 15,
                                    fontStyle: 'bold'
                                }
                            }]
                        },
                        legend: {
                            display: false
                        }
                    }
                });
            },

            getMaxCommits() {
                return this.formatChartPoints().reduce((max, point) => max < point ? point : max);
            },

            formatChartPoints() {
                let result = [];
                const $this = this;

                $this.getLabels().forEach((label) => {

                    let amount = 0;

                    this.commits.forEach((commit) => {
                        const key = commit.committer.hour;

                        if(label === key) amount += 1;
                    });

                    result.push(amount);
                });

                return result;
            },

            getLabels() {


                let labels = [];

                for(let i = 1; i < 25; i++)
                    labels.push(i);

                return labels;
            }
        },
    };

</script>

<style lang="scss">

    @import "./../scss/variables";

    .timeline {

        width:100%;
        position:relative;
        background:linear-gradient(90deg, $turquoise, $bleu);
        border-radius:10px;
        box-shadow:0 5px 20px rgba(0,0,0,0.1);

        .mainchart {

            width:100%;
        }

        .timeline-shadow {

            width:calc(100% - 2em);
            position:absolute;
            bottom:0;
            z-index:-1;
            height:4em;
            box-shadow:0 30px 40px rgba(0,0,0,0.1);
            background:black;
            border-radius:100px;
        }
    }
</style>
