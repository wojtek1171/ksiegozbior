<script setup lang="ts">
const { statisticsData, getStatisticsData } = useStatisticsData();
getStatisticsData();

let barAuthorsOptions: any;
let barAuthorsSeries: any;
let barPublishersOptions: any;
let barPublishersSeries: any;
let barTagsOptions: any;
let barTagsSeries: any;
let booksCountByYearOptions: any;
let booksCountByYearSeries: any;
let expensesByYearOptions: any;
let expensesByYearSeries: any;

watch(statisticsData, () => {
  barAuthorsOptions = {
    chart: {
      background: '#BBCED4',
      width: '100%',
    },
    colors: ['#3F51B5'],
    plotOptions: {
      bar: { horizontal: true },
    },
    xaxis: {
      categories: statisticsData.value.authors.categories,
    },
  };

  barAuthorsSeries = [
    {
      name: 'Liczba książek',
      data: statisticsData.value.authors.data,
    },
  ];

  barPublishersOptions = {
    chart: {
      background: '#BBCED4',
      width: '100%',
      height: 50,
    },
    colors: ['#3F51B5'],
    plotOptions: {
      bar: { horizontal: true },
    },
    xaxis: {
      categories: statisticsData.value.publishers.categories,
    },
  };

  barPublishersSeries = [
    {
      name: 'Liczba książek',
      data: statisticsData.value.publishers.data,
    },
  ];

  barTagsOptions = {
    chart: {
      background: '#BBCED4',
      width: '100%',
      height: 50,
    },
    colors: ['#3F51B5'],
    plotOptions: {
      bar: { horizontal: true },
    },
    xaxis: {
      categories: statisticsData.value.tags.categories,
    },
  };

  barTagsSeries = [
    {
      name: 'Liczba książek',
      data: statisticsData.value.tags.data,
    },
  ];

  booksCountByYearOptions = {
    chart: {
      background: '#BBCED4',
      width: '100%',
      height: 50,
    },
    colors: ['#3F51B5'],
    xaxis: {
      categories: statisticsData.value.booksByYear.categories,
    },
  };

  booksCountByYearSeries = [
    {
      name: 'Liczba książek',
      data: statisticsData.value.booksByYear.data,
    },
  ];

  expensesByYearOptions = {
    chart: {
      background: '#BBCED4',
      width: '100%',
      height: 50,
    },
    colors: ['#3F51B5'],
    xaxis: {
      categories: statisticsData.value.expensesByYear.categories,
    },
  };

  expensesByYearSeries = [
    {
      name: 'Suma [zł]',
      data: statisticsData.value.expensesByYear.data,
    },
  ];
});

onMounted(() => {
  useMeta({
    title: 'Statystyki',
  });
});
</script>

<template>
  <q-page class="page">
    <div class="q-my-md text-h3 text-center">Statystyki</div>

    <div class="q-my-md text-h5 text-center">Przeczytane książki</div>
    <div align="center">
      <div v-if="statisticsData.booksRead">
        <q-linear-progress
          size="40px"
          :value="statisticsData.booksRead / statisticsData.booksTotal"
          color="indigo-6"
          style="width: 80%"
          class="q-mt-sm"
        >
          <div class="absolute-full flex flex-center">
            <div class="text-body1 text-white">
              {{ statisticsData.booksRead }} / {{ statisticsData.booksTotal }} ({{
                Math.round((statisticsData.booksRead / statisticsData.booksTotal) * 100)
              }}%)
            </div>
          </div>
        </q-linear-progress>
      </div>
      <q-spinner v-else color="primary" size="5em" :thickness="10" />
    </div>

    <div class="q-mt-lg text-h5 text-center">Liczba książek wg autorów</div>
    <div align="center">
      <apexchart
        v-if="barAuthorsOptions"
        width="95%"
        height="500"
        type="bar"
        :options="barAuthorsOptions"
        :series="barAuthorsSeries"
      ></apexchart>
      <q-spinner v-else color="primary" size="5em" :thickness="10" />
    </div>

    <div class="q-mt-lg text-h5 text-center">Liczba książek wg wydawnictw</div>
    <div align="center">
      <apexchart
        v-if="barPublishersOptions"
        width="95%"
        height="500"
        type="bar"
        :options="barPublishersOptions"
        :series="barPublishersSeries"
      ></apexchart>
      <q-spinner v-else color="primary" size="5em" :thickness="10" />
    </div>

    <div class="q-mt-lg text-h5 text-center">Najczęstsze tagi</div>
    <div align="center">
      <apexchart v-if="barTagsOptions" width="95%" height="500" type="bar" :options="barTagsOptions" :series="barTagsSeries"></apexchart>
      <q-spinner v-else color="primary" size="5em" :thickness="10" />
    </div>

    <div class="q-mt-lg text-h5 text-center">Liczba książek zakupionych w danym roku</div>
    <div align="center">
      <apexchart
        v-if="booksCountByYearOptions"
        width="95%"
        height="400"
        type="bar"
        :options="booksCountByYearOptions"
        :series="booksCountByYearSeries"
      ></apexchart>
      <q-spinner v-else color="primary" size="5em" :thickness="10" />
    </div>

    <div class="q-mt-lg text-h5 text-center">Roczne wydatki [zł]</div>
    <div align="center">
      <apexchart
        v-if="expensesByYearOptions"
        width="95%"
        height="400"
        type="bar"
        :options="expensesByYearOptions"
        :series="expensesByYearSeries"
      ></apexchart>
      <q-spinner v-else color="primary" size="5em" :thickness="10" />
    </div>
  </q-page>
</template>

<style lang="scss">
.page {
  margin: auto;
  max-width: 900px;
}
</style>
