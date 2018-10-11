<template>
    <div>
        <div class="languages-chart p-4">
            <h1 class="mt-3 mb-0 ml-3 text-thin">
                In what languages does {{ username }} code
            </h1>
            <h3 class="mt-0 mb-4 ml-3 text-muted text-normal">
                Find out main languages of {{ username }}'s {{ repos.length }} repositories
            </h3>

            <canvas ref="languagesChart"></canvas>
        </div>
    </div>
</template>

<script>

    import Chart from 'chart.js';
    import RandomColors from 'randomcolor';

    export default {
        props: ['username'],
        data() {
            return {
                repos: [],
            };
        },
        watch: {
            username() {
                const $this = this;
                this.$api.getRepositories(this.username).then((repos) => {
                    repos.forEach(repo => $this.repos.push(repo));
                    $this.loadChart();
                });
            },
        },
        methods: {
            loadChart() {
                const ctx = this.$refs.languagesChart;
                const $this = this;

                /* eslint-disable no-new */
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            data: this.getValues(),
                            backgroundColor: this.getColors(),
                            borderColor: 'rgba(0,0,0,0)',
                        }],
                        labels: this.getLabels(),
                    },
                    options: {
                        legend: {
                            position: 'right',
                        },
                        tooltips: {
                            callbacks: {
                                label(n, data) {
                                    const amount =
                                        $this.getReposPerLanguage(data.labels[n.index]).length;

                                    const lang = data.labels[n.index];
                                    return amount > 1
                                        ? `${lang} : ${amount} repositories`
                                        : `${lang} : ${amount} repository`;
                                },
                            },
                        },
                    },
                });
            },
            getLabels() {
                const labels = [];
                this.repos.forEach((repo) => {
                    if (repo.language && !labels.includes(repo.language)) {
                        labels.push(repo.language);
                    } else if (!repo.language && !labels.includes('other')) {
                        labels.push('other');
                    }
                });

                return labels;
            },
            getValues() {
                const results = [];
                const $this = this;
                this.getLabels().forEach((label) => {
                    let amount = 0;
                    $this.repos.forEach((repo) => {
                        if (repo.language === label) amount += 1;
                    });

                    results.push(amount);
                });

                return results;
            },
            getColors() {
                return this.getLabels().map(() => RandomColors());
            },
            getReposPerLanguage(lang) {
                const repos = [];
                this.repos.forEach((repo) => {
                    if (repo.language === lang) repos.push(repo.full_name);
                });
                return repos;
            },
        },
    };
</script>

<style lang="scss" scoped>

    @import "./../scss/variables";

    .languages-chart {

        background: white;
        border:1px solid #eee;
        border-radius:10px;

        canvas {
            width:100%;
        }
    }
</style>
