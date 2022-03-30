<template>
  <b-container class="prayer-book">
    <b-row>
      <b-col col md="2"></b-col>
      <b-col col md="8">
        <div class="parchmentTop">
          <div class="parchment"></div>
          <div class="parchmentBody">
            Отче наш, Който си на небесата!<br>
            Да се свети Твоето име,<br>
            да дойде Твоето Царство,<br>
            да бъде Твоята воля,<br>
            както на небето, тъй и на земята;<br>
            насъщния ни хляб дай ни днес,<br>
            и прости нам дълговете ни,<br>
            както и ние прощаваме на нашите длъжници,<br>
            и не въведи нас в изкушение,<br>
            но избави ни от лукавия;<br>
            защото Твое е царството,<br>
            и силата, и славата вовеки.<br>
            Амин.<br>
          </div>
          <div class="parchmentBottom"></div>
        </div>
      </b-col>
      <b-col col md="2"></b-col>
    </b-row>
  </b-container>

</template>

<script>
export default {
  name: "PrayerBookView"
}
</script>

<style scoped>
.prayer-book{
  background-image: url("~@images/site-images/dark-old-wooden-background-texture_41471-12014.jpg");
}
.parchmentTop {
  position: relative;
  width: 100%;
  top: 25px;
  font-family: BukyVedeRegular, Helvetica,sans-serif;
  font-size: 1rem;
  line-height: normal;
  background-image: url("~@images/site-images/pergament/Parchment-Body.png");
}

.parchment {
  position: relative;
  top: -25px;
  width: 100%;
  height: 38px;
  background-image: url("~@images/site-images/pergament/Parchment-Top-Blend-trans.png");
}

.parchmentBottom {
  position: relative;
  bottom: -18px;
  right: -6px;
  width: 99%;
  height: 38px;
  background-image: url("~@images/site-images/pergament/Parchment-Bottom-Blend-trans.png");
  margin-bottom: 40px;
}

.parchmentBody {
  margin: 0 auto;
  width: 83.56%;
  padding: 1px 60px 2px 60px;
}
</style>