<template>
  <div>
    <h2>Hello</h2>
    <button @click="someFunc">click</button>
    <!-- <div>{{ title }}</div>
        <div>{{ authors }}</div>
        <div>{{ publisher }}</div>
        <div>{{ category }}</div>
        <div>{{ pages }}</div>
        <div>{{ datePublished }}</div>
        <div>{{ series }}</div>
        <div>{{ cycle }}</div>
        <div>{{ isbn }}</div>
        <div>{{ tags }}</div>
        <div>{{ note }}</div>
        <div>{{ description }}</div>
        <div>{{ cover }}</div>
        <div>{{ translators }}</div>
        <div>{{ originalTitle }}</div> -->

    <div>-----------------------------------------</div>
    <!-- <div>{{ data.toString() }}</div> -->
    <div>ŁĄŻĆ</div>
  </div>
</template>

<script setup lang="ts">
//const { data } = await useFetch('https://lubimyczytac.pl/ksiazka/213089/zywe-srebro');
//const { data } = await useFetch('https://lubimyczytac.pl/ksiazka/4959860/szkice-z-filozofii-glupoty');
//const { data } = await useFetch('https://lubimyczytac.pl/ksiazka/105143/wedrowiec');
//const { data } = await useFetch('https://lubimyczytac.pl/ksiazka/4935972/historia-naszej-swiadomosci-jak-po-czterech-miliardach-lat-ewolucji-powstal-swiadomy-mozg');

//const stringData = data.value;

let costtam = 123;

// const title = stringData.match(new RegExp('<h1 class="book__title"' + "(.*?)" + '</h1></div>'))[1].split('>')[1];
// const authors = stringData.match(new RegExp('books:author" content="' + "(.*?)" + '" /><meta property'))[1].split(',&nbsp;');
// const publisher = stringData.match(new RegExp('Wydawnictwo: ' + "(.*?)" + '</'))[1].split('>')[1];
// const category = stringData.match(new RegExp('class="book__category' + "(.*?)" + '</'))[1].split('>')[1];
// const pages = stringData.match(new RegExp('numberOfPages":"' + "(.*?)" + '"'))[1];
// const datePublished = stringData.match(new RegExp('datePublished":"' + "(.*?)" + '"'))[1];
// const series = stringData.match(new RegExp('Seria:' + "(.*?)" + '</'))?.[1]?.split('>')[1];
// const cycle = stringData.match(new RegExp('Cykl:' + "(.*?)" + '</'))?.[1]?.split('>')[1];
// const isbn = stringData.match(new RegExp('isbn":"' + "(.*?)" + '"'))[1];
// const tags = stringData.match(/(?<=class="btn btn-outline-primary tag mt-2 mb-0">)(.*?)(?=<\/a>)/g);
// const note = stringData.match(new RegExp('books:rating:value" content="' + "(.*?)" + '" />'))?.[1];
// const description = stringData.match(new RegExp('<div class="collapse-content"><p>' + "(.*?)" + '</p>'))[1];
// const cover = stringData.match(new RegExp('og:image" content="' + "(.*?)" + '" />'))[1];
// const translators = stringData.match(/(?<=Tłumacz:)(.*?)(?=<\/a><\/dd>)/g).map(e => e.replace(/<.*?>/g, ""));
// const originalTitle = stringData.match(new RegExp('Tytuł oryginału:' + "(.*?)" + '</dd'))?.[1]?.split('d>')[1];

function someFunc() {
  const rand = Math.floor(Math.random() * 12);
  costtam = rand;
  console.log(rand);
}
</script>
