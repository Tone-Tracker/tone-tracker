<template>
    <header>
        <div class="topbar d-flex align-items-center">
            <nav class="navbar navbar-expand flex justify-content-between flex-direction-row">
                <div class="mobile-toggle-menu"><i class='bx bx-menu'></i>
                </div>
                <div>
                    <img style="width: 180px;" src="/src/assets/images/logo/white-logo.png" alt="">
                </div>

                <div class="search-bar d-lgsblock w-100  d-flex justify-content-center">
                    <div class="input-group d-lgsblock custom-width-70">
                        <span class="input-group-text" id="addon-wrapping"><i class='bx bx-search'></i></span>
                        <input type="text" class="form-control" aria-label="Text input with 2 dropdown buttons"
                            placeholder="Search For Projects...">
                        <button class="btn btn-outline-secondary w-20 maz-gradient-btn">
                            Search</button>
                    </div>
                </div>


                <div class="user-box dropdown px-3">
                    <a class="d-flex align-items-center nav-link gap-3 t" href="#" role="button">
                        <img src="/src/assets/images/logo/Ellipse.png" class="user-img" alt="user avatar">
                    </a>
                </div>
            </nav>
        </div>
    </header>
</template>
<style scoped>
.form-control {
    background-color: #1C1C1C !important;
    border-left: 0 !important;
    border-top-left-radius: 0;
    border: 1px solid #000000 !important;
    border-left: 0 !important;
    text-align: center;
    /* color: white !important; */
}

.form-control::placeholder {
    text-align: center;
    color: white !important;
}

.form-control:focus {
    border-left: 0;
    outline: 0;
}

.search-bar {
    width: 100%;
    cursor: pointer;
    /* height: 4px !important; */
    /* padding: 100px 100px !important; */
}

.custom-width-70 {
    width: 70%;
}

.user-img {
    width: 58px;
    height: 58px;
}

html.dark-theme .user-box {
    border-left: 0px solid rgb(255 255 255 / .15);
    border-right: 0px solid rgb(255 255 255 / .15);
}

html.dark-theme .input-group-text {
    color: #d1d7de;
    background-color: #1C1C1C !important;
    border: 1px solid #000000;
    border-radius: 0;

}

.btn {
    border-radius: 0;
}
</style>