<script setup lang="ts">
const { statisticsData, getStatisticsData } = await useStatisticsData();
await getStatisticsData();

const barAuthorsOptions = {
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
const barAuthorsSeries = [
  {
    name: 'Liczba książek',
    data: statisticsData.value.authors.data,
  },
];

const barPublishersOptions = {
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
const barPublishersSeries = [
  {
    name: 'Liczba książek',
    data: statisticsData.value.publishers.data,
  },
];

const barTagsOptions = {
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
const barTagsSeries = [
  {
    name: 'Liczba książek',
    data: statisticsData.value.tags.data,
  },
];

const booksCountByYearOptions = {
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
const booksCountByYearSeries = [
  {
    name: 'Liczba książek',
    data: statisticsData.value.booksByYear.data,
  },
];

const expensesByYearOptions = {
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
const expensesByYearSeries = [
  {
    name: 'Suma [zł]',
    data: statisticsData.value.expensesByYear.data,
  },
];

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
      <q-linear-progress
        size="40px"
        :value="statisticsData.booksRead / statisticsData.booksTotal"
        color="indigo-6"
        style="width: 80%"
        class="q-mt-sm"
      >
        <div class="absolute-full flex flex-center">
          <!-- <q-badge color="white" size="lg" text-color="indigo-10" :label="`${statisticsData.booksRead} / ${statisticsData.booksTotal}`" /> -->
          <div class="text-body1 text-white">
            {{ statisticsData.booksRead }} / {{ statisticsData.booksTotal }} ({{
              Math.round((statisticsData.booksRead / statisticsData.booksTotal) * 100)
            }}%)
          </div>
        </div>
      </q-linear-progress>
    </div>

    <div class="q-mt-lg text-h5 text-center">Liczba książek wg autorów</div>
    <div align="center">
      <apexchart width="80%" height="500" type="bar" :options="barAuthorsOptions" :series="barAuthorsSeries"></apexchart>
    </div>

    <div class="q-mt-lg text-h5 text-center">Liczba książek wg wydawnictw</div>
    <div align="center">
      <apexchart width="80%" height="500" type="bar" :options="barPublishersOptions" :series="barPublishersSeries"></apexchart>
    </div>

    <div class="q-mt-lg text-h5 text-center">Najczęstsze tagi</div>
    <div align="center">
      <apexchart width="80%" height="500" type="bar" :options="barTagsOptions" :series="barTagsSeries"></apexchart>
    </div>

    <div class="q-mt-lg text-h5 text-center">Liczba książek zakupionych w danym roku</div>
    <div align="center">
      <apexchart width="80%" height="400" type="bar" :options="booksCountByYearOptions" :series="booksCountByYearSeries"></apexchart>
    </div>

    <div class="q-mt-lg text-h5 text-center">Roczne wydatki [zł]</div>
    <div align="center">
      <apexchart width="80%" height="400" type="bar" :options="expensesByYearOptions" :series="expensesByYearSeries"></apexchart>
    </div>
  </q-page>
</template>

<style lang="scss">
.page {
  margin: auto;
  max-width: 1000px;
}
</style>
