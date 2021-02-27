<template>
    <div>
        <div class="row">
            <router-link :to="{ name:'admin_article_new' }" class="col-md-4 mb-3" tag="div">
                <a href="#" class="btn bg-add-btn bg-sub-caption btn-lg btn-block btn-huge">
                    <span class="mr-3"><b-icon-plus-square></b-icon-plus-square></span>Създай статия
                </a>
            </router-link>
            <div class="col-md-4">
                <a href="#" class="btn bg-add-btn bg-sub-caption btn-lg btn-block btn-huge ">
                    <span class="mr-3"><b-icon-plus-square></b-icon-plus-square></span>Създай новина
                </a>
            </div>
            <div class="col-md-4">
                <a href="#" class="btn bg-add-btn bg-sub-caption btn-lg btn-block btn-huge">
                    <span class="mr-3"><b-icon-plus-square></b-icon-plus-square></span>Създай духовен бисер
                </a>
            </div>
    </div>
        <div class="row">
        <div class="col-md-4">
            <div class="card">
                <div class="card-header bg-sub-caption sub-title">
                    Последни статии
                </div>
                <div class="card-body border-bottom">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content....</p>
                </div>
                <div class="card-body border-bottom">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content....</p>
                </div>
                <div class="card-body border-bottom">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content....</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-header bg-sub-caption sub-title">
                    Последни новини
                </div>
                <div class="card-body border-bottom">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content....</p>
                </div>
                <div class="card-body border-bottom">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content....</p>
                </div>
                <div class="card-body border-bottom">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content....</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-header bg-sub-caption sub-title">
                    Последни духовни бисери
                </div>
                <div class="card-body border-bottom">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content....</p>
                </div>
                <div class="card-body border-bottom">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content....</p>
                </div>
                <div class="card-body border-bottom">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content....</p>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "Admin-home"
    }
</script>

<style scoped>

</style>