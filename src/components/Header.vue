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
                        <span class="input-group-text" id="addon-wrapping"><svg width="27" height="28"
                                viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M26.0729 24.6692L18.9412 17.4708C20.3369 15.7212 21.1782 13.5043 21.1782 11.0937C21.1782 5.4511 16.6041 0.876953 10.9548 0.876953C5.3056 0.876953 0.731445 5.45778 0.731445 11.1003C0.731445 16.7429 5.3056 21.3171 10.9548 21.3171C13.3988 21.3171 15.6358 20.4623 17.3987 19.0333L24.4836 26.185C24.6973 26.4121 24.9911 26.5256 25.2783 26.5256C25.5521 26.5256 25.8258 26.4254 26.0328 26.2251C26.4736 25.8044 26.4869 25.1099 26.0729 24.6692ZM10.9548 19.1201C8.81133 19.1201 6.7947 18.2854 5.27889 16.7696C3.76307 15.2538 2.92837 13.2372 2.92837 11.1003C2.92837 8.95684 3.76307 6.9402 5.27889 5.43107C6.7947 3.91526 8.81133 3.08056 10.9548 3.08056C13.0983 3.08056 15.115 3.91526 16.6308 5.43107C18.1466 6.94688 18.9813 8.96352 18.9813 11.1003C18.9813 13.2439 18.1466 15.2605 16.6308 16.7696C15.115 18.2854 13.0983 19.1201 10.9548 19.1201Z"
                                    fill="white" stroke="white" />
                            </svg></span>
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
.topbar {
    border-bottom: none !important;
    background-color: ;
}

.user-img {
    border: none !important;
}

.navbar {
    padding-top: 7px !important;
    padding-bottom: 7px !important;
    /* color: white !important; */
}

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