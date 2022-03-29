<template>
  <b-row no-gutters>
    <b-col>
      <b-row no-gutters>
        <b-col>
          <div id="header-image">
            <b-img :src="require('@images/site-images/20190224_105621-EFFECTS.jpg').default" fluid></b-img>
          </div>
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col>
          <div id="site-title-wrapper">
            <h1>ПРАВОСЛАВЕН ХРАМ СВ.СВ. КИРИЛ И МЕТОДЙИ</h1>
            <h3>град Сливница</h3>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "HeaderComponent"
}
</script>

<style scoped>
#header-image {
  position: relative;
  top: 0;
}

h1, h3 {
  font-family: BukyVedeRegular, SFMono-Regular, Helvetica sans-serif !important;
  color: var(--bg-yellow-white);
}

#site-title-wrapper {
  padding: 1rem 2rem;
  background-color: rgba(83, 60, 52, 65%);
  position: absolute;
  bottom: 16rem;
  width: 100%;
  text-align: center;
}
</style>