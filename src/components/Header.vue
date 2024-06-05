<template>
    <header>
        <div class="topbar d-flex align-items-center">
            <nav class="navbar navbar-expand gap-3">
                <div class="mobile-toggle-menu"><i class='bx bx-menu'></i>
                </div>

                  <div class="search-bar d-lgsblock">
                    <div class="input-group">
                        <span class="input-group-text" id="addon-wrapping"><i class='bx bx-search'></i></span>
                        <input type="text" class="form-control" aria-label="Text input with 2 dropdown buttons" placeholder="Search For Projects...">
                        <button class="btn btn-outline-secondary w-20 maz-gradient-btn" >
                            Search</button>
                    </div>
                  </div>

                  <div class="top-menu ms-auto">

                    
                   
                </div>
                <div class="user-box dropdown px-3">
                    <a class="d-flex align-items-center nav-link gap-3 t" href="#" role="button">
                        <img src="/src/assets/images/fake.png" class="user-img" alt="user avatar">
                    </a>
                </div>
            </nav>
        </div>
    </header>
</template>
<style scoped>
.search-bar {
    width: 45%;
    cursor: pointer;
}

.user-img {
    width: 58px;
    height: 58px;
}

html.dark-theme .user-box {
    border-left: 0px solid rgb(255 255 255 / .15);
    border-right: 0px solid rgb(255 255 255 / .15);
}

 
</style>